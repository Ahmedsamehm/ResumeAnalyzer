import LayoutWarper from "~/components/LayoutWarper";
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
    <div>
      <NavBarResume />
      <div className="page-heading py-16 mx-auto w-full">
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
    </div>
  );
};

export default upload;
