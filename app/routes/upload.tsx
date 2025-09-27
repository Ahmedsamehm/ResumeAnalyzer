import NavBarResume from "~/components/resume/NavBarResume";
import FileUploader from "~/components/upload/FileUploader";

import useUploadResume from "~/hooks/useUploadResume";

export const meta = () => [
  { title: "Upload" },
  {
    description: "Upload Pdf to Analysis ",
  },
];
const upload = () => {
  const { handleFileSelect, handleSubmit, isProcessing, statusText } = useUploadResume();

  return (
    <div className="container mx-auto w-full">
      <NavBarResume />
      <div className="flex flex-col gap-3 lg:flex-row items-center justify-center mx-auto py-16 px-5 ">
        <div className=" space-y-3 lg:text-start    ">
          <h1 className={`!text-4xl lg:!text-6xl  font-bold ${isProcessing ? "text-center" : "text-start"} `}>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <div className="flex items-center justify-center mx-auto w-full">
              <div className=" mx-auto flex flex-col justify-center items-center gap-3  ">
                <h1 className="!text-4xl  font-bold">{statusText}</h1>
                <img src="/images/resume-scan.gif" className="w-1/2 bg-cover" alt="LoadingScanResume" />
              </div>
            </div>
          ) : (
            <h2 className="!text-xl text-start ">Drop your resume for an ATS score and improvement tips</h2>
          )}
        </div>

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
    </div>
  );
};

export default upload;
