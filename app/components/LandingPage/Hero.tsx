const Hero = ({ loadingResumes, resumes }: { loadingResumes: boolean; resumes: Resume[] }) => {
  return (
    <div className="page-heading py-16">
      <h1 className="!text-3xl lg:!text-7xl !font-bold text-center">Track Your Applications & Resume Ratings</h1>
      {!loadingResumes && resumes?.length === 0 ? <h2>No resumes found. Upload your first resume to get feedback.</h2> : <h2>Review your submissions and check AI-powered feedback.</h2>}
    </div>
  );
};

export default Hero;
