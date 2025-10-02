import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { prepareInstructions } from "~/constants";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

const useUploadResume = () => {
  const { fs, ai, kv } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleFileSelect = (file: File | null) => {
    if (file) setFile(file);
    else setFile(null);
  };

  /*
Steps:

1. Upload PDF file  
   - If upload fails, return error  
   - If success, set status text to "Converting to image..."

2. Convert PDF to image  
   - If conversion fails, return error  
   - If success, set status text to "Uploading image..."

3. Upload converted image  
   - If upload fails, return error  

4. Prepare data object  
   {
     id: uuid,
     resumePath: uploadedFile.path,
     imagePath: uploadedImage.path,
     companyName,
     jobTitle,
     jobDescription,
     feedBack: ""
   }

5. Save initial data to KV store  

6. Request feedback from AI  
   - ai.feedback(prepareInstructions(jobTitle, jobDescription))  

7. Parse feedback  
   - If string, use directly  
   - If array, extract text  
   - Save parsed feedback back to KV store  

8. Finish process  
   - Update status text to "Analysis complete"
*/
  const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string; jobTitle: string; jobDescription: string; file: File }) => {
    setIsProcessing(true);

    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText("Error: Failed to convert PDF to image");

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image");

    setStatusText("Preparing data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing...");

    setTimeout(() => {
      setStatusText(" This might take a bit. If it feels stuck, try refreshing or signing in with another account.");
    }, 4000);
    const feedback = await ai.feedback(uploadedFile.path, prepareInstructions({ jobTitle, jobDescription } as any));

    if (!feedback) return setStatusText("Error: Failed to analyze resume");

    const feedbackText = typeof feedback.message.content === "string" ? feedback.message.content : feedback.message.content[0].text;

    try {
      data.feedback = JSON.parse(feedbackText);
    } catch (error) {
      console.error("Failed to parse feedback JSON:", error);
      data.feedback = feedbackText;
    }
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");

    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };
  return { handleFileSelect, handleSubmit, isProcessing, statusText, setFile };
};

export default useUploadResume;
