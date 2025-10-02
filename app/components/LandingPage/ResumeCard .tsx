import { Link } from "react-router";
import ScoreCircle from "../ScoreCircle";

import useLoadImageResume from "~/hooks/useLoadImageResume";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath }, handleDelete }: { resume: Resume; handleDelete: () => void }) => {
  const { resumeUrl } = useLoadImageResume(imagePath);
  return (
    <div className="flex flex-col items-end">
      <button onClick={handleDelete} className="primary-button w-fit">
        Delete
      </button>
      <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
        <div className="resume-card-header">
          <div className="flex flex-col gap-2">
            {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
            {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
            {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
          </div>
          <div className="flex-shrink-0">
            <ScoreCircle score={feedback?.ATS?.score} />
          </div>
        </div>
        {resumeUrl && (
          <div className="gradient-border animate-in fade-in duration-1000">
            <div className="w-full h-full">
              <img src={resumeUrl} alt="resume" className="w-full h-[350px] max-sm:h-[200px] object-cover object-top" />
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ResumeCard;
