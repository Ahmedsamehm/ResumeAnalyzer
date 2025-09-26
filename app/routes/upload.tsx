import { useState, type FormEvent } from "react";
import LayoutWarper from "~/components/LayoutWarper";
import FileUploader from "~/components/upload/FileUploader";
import { prepareInstructions } from "~/constants";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

export const meta = () => [
  { title: "Upload" },
  {
    description: "Upload Pdf to Analysis ",
  },
];
const upload = () => {
  const { fs, ai, kv } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setFile(file);
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

    setStatusText("Uploading file ...");

    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText("Error: Failed to convert PDF to image");

    setStatusText("Uploading imageFile ...");
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
      feedBack: "",
    };

    await kv.set(`resume${uuid}`, JSON.stringify(data));
    const feedBack = await ai.feedback(uploadedFile.path, prepareInstructions({ jobDescription, jobTitle } as any));
    if (!feedBack) return setStatusText("Error: Failed to analyze resume");
    const feedBackText = typeof feedBack?.message.content === "string" ? feedBack.message.content : feedBack.message.content[0].text;

    data.feedBack = JSON.parse(feedBackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");
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

  return (
    <LayoutWarper>
      <div className="page-heading py-16">
        <h1>Smart feedback for your dream job</h1>
        {isProcessing ? (
          <div className="w-1/2">
            <h1>{statusText}</h1>
            <img src="/images/resume-scan.gif" className="w-full bg-cover  " alt="LoadingScanResume" />
          </div>
        ) : (
          <h2>Drop your resume for an ATS score and improvement tips</h2>
        )}
        {!isProcessing && (
          <form id="upload-form" onSubmit={handleSubmit}>
            <div className="form-div">
              <label htmlFor="company-name">Company Name</label>
              <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
            </div>
            <div className="form-div">
              <label htmlFor="job-title">Job Title</label>
              <input type="text" name="job-title" placeholder="Company Name" id="job-title" />
            </div>
            <div className="form-div">
              <label htmlFor="job-description">Job Description</label>
              <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
            </div>
            <div className="form-div">
              <label htmlFor="uploader">Upload Resume</label>
              <FileUploader onFileSelect={handleFileSelect} />
            </div>
            <button className="primary-button" type="submit">
              Analyze Resume
            </button>
          </form>
        )}
      </div>
    </LayoutWarper>
  );
};

export default upload;
