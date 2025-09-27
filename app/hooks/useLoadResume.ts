import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";

const useLoadResume = () => {
  const { fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const loadResume = async () => {
    const resume = await kv.get(`resume:${id}`);

    if (!resume) return;

    const data = JSON.parse(resume);

    const resumeBlob = await fs.read(data.resumePath);
    if (!resumeBlob) return;

    const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
    const resumeUrl = URL.createObjectURL(pdfBlob);
    setResumeUrl(resumeUrl);

    const imageBlob = await fs.read(data.imagePath);
    if (!imageBlob) return;
    const imageUrl = URL.createObjectURL(imageBlob);
    setImageUrl(imageUrl);

    setFeedback(data.feedback);
  };
  useEffect(() => {
    loadResume();
  }, [id]);
  return { imageUrl, resumeUrl, feedback };
};

export default useLoadResume;
