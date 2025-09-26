import React, { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const useGetResumes = () => {
  const { kv } = usePuterStore();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value) as Resume);

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, [kv]);
  return { resumes, loadingResumes };
};

export default useGetResumes;
