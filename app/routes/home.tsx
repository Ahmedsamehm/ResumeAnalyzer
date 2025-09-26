import ResumeCard from "~/components/LandingPage/ResumeCard ";
import type { Route } from "./+types/home";

import Hero from "~/components/LandingPage/Hero";

import LayoutWarper from "~/components/LayoutWarper";

import { Link } from "react-router";
import useGetResumes from "~/hooks/useGetResumes";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Home | Resume Analyzer" }, { name: "description", content: "Smart FeedBack for your Dream Job!" }];
}

export default function Home() {
  const { loadingResumes, resumes, handleDelete } = useGetResumes();
  return (
    <LayoutWarper>
      <Hero loadingResumes={loadingResumes} resumes={resumes} />
      {loadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" className="w-[200px]" />
        </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} handleDelete={() => handleDelete(resume.id)} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
            Upload Resume
          </Link>
        </div>
      )}
    </LayoutWarper>
  );
}
