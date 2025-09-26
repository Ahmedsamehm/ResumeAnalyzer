import React, { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const useGetResumes = () => {
  const { kv } = usePuterStore();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const handleDelete = async (id: string) => {
    await kv.del(`resume:${id}`);
    setResumes((prev) => prev.filter((resume) => resume.id !== id));
  };

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
  return { resumes, loadingResumes, handleDelete };
};

export default useGetResumes;
