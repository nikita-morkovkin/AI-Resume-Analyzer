import { RESUMES } from "~/consts";
import ResumeCard from "./ResumeCard";

const ResumeList = () => {
  return (
    <div className="resumes-section py-14">
      <ul className="flex flex-wrap gap-10 justify-center">
        {RESUMES.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </ul>
    </div>
  );
};

export default ResumeList;
