import { Link } from "react-router";
import type { Resume } from "~/types";
import ScoreCircle from "./ScoreCircle";

interface ResumeCardProps {
  resume: Resume;
}

const ResumeCard = ({ resume }: ResumeCardProps) => {
  const {
    id,
    companyName = "Untitled Company",
    jobTitle = "Untitled Position",
    feedback,
    imagePath,
  } = resume;

  return (
    <li>
      <Link
        className="resume-card animate-in fade-in duration-1000"
        to={`/resume/${id}`}
      >
        <header className="resume-card-header">
          <div className="flex flex-col gap-2">
            <h3 className="text-black font-bold wrap-break-word">
              {companyName}
            </h3>

            <h4 className="text-lg wrap-break-word text-gray-500">
              {jobTitle}
            </h4>
          </div>

          <div className="shrink-0">
            <ScoreCircle score={feedback.overallScore} />
          </div>
        </header>

        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={imagePath}
              alt={`Resume thumbnail for ${companyName} - ${jobTitle}`}
              className="w-full h-87.5 max-sm:h-50 object-cover object-top"
            />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ResumeCard;
