import ResumeCard from "~/components/LandingPage/ResumeCard ";
import type { Route } from "./+types/home";

import Hero from "~/components/LandingPage/Hero";
import { resumes } from "~/constants";

import LayoutWarper from "~/components/LayoutWarper";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Home | Resume Analyzer" }, { name: "description", content: "Smart FeedBack for your Dream Job!" }];
}

export default function Home() {
  return (
    <LayoutWarper>
      <Hero />
      {resumes.length > 0 ? (
        <div className="resumes-section">
          {resumes.map((resume: Resume) => {
            return <ResumeCard key={resume.id} resume={resume} />;
          })}
        </div>
      ) : (
        <h1>create now </h1>
      )}
    </LayoutWarper>
  );
}
