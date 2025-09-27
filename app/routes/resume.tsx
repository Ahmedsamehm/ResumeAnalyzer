import { Link } from "react-router";

import Summary from "~/components/resume/Summary";
import ATS from "~/components/resume/Ats";
import Details from "~/components/resume/Details";
import useLoadResume from "~/hooks/useLoadResume";
import NavBarResume from "~/components/resume/NavBarResume";

export const meta = () => [{ title: "Resume | Review " }, { name: "description", content: "Detailed overview of your resume" }];

const Resume = () => {
  const { feedback, imageUrl, resumeUrl } = useLoadResume();

  return (
    <main className="!pt-0">
      <NavBarResume />
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} className="w-full h-full object-contain rounded-2xl" title="resume" />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" />
          )}
        </section>
      </div>
    </main>
  );
};
export default Resume;
