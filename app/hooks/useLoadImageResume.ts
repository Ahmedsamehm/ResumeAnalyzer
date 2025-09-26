import React, { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const useLoadImageResume = (imagePath: string) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [imagePath]);
  return { resumeUrl };
};

export default useLoadImageResume;
