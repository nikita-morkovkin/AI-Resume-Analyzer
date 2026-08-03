import type { MetaFunction } from "react-router";
import Header from "~/components/Header";
import UploadForm from "~/components/UploadForm";
import { UPLOAD_ASSETS } from "~/consts";
import { useUploadResume } from "~/hooks/useUploadResume.hook";

export const meta: MetaFunction = () => {
  return [
    { title: "AI Resume Analyzer & ATS Optimization | Smart Feedback" },
    {
      name: "description",
      content:
        "Upload your resume to get instant AI-powered ATS scoring, customized improvement tips, and actionable feedback tailored for tech and data jobs.",
    },
    {
      name: "keywords",
      content:
        "AI resume analyzer, ATS score checker, resume reviewer, data science resume, tech resume feedback, ATS optimization",
    },
    {
      property: "og:title",
      content: "AI Resume Analyzer & ATS Optimization | Smart Feedback",
    },
    {
      property: "og:description",
      content:
        "Upload your resume to get instant AI-powered ATS scoring, customized improvement tips, and actionable feedback tailored for tech and data jobs.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "AI Resume Analyzer & ATS Optimization | Smart Feedback",
    },
    {
      name: "twitter:description",
      content:
        "Upload your resume to get instant AI-powered ATS scoring, customized improvement tips, and actionable feedback tailored for tech and data jobs.",
    },
  ];
};


const Upload = () => {
  const {
    isProcessing,
    statusText,
    handleFileSelect,
    handleAnalyzeResume,
  } = useUploadResume();

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Header />

      <section className="main-section">
        <div className="page-heading">
          <h1>Smart feedback for your data job</h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src={UPLOAD_ASSETS.SCAN_GIF}
                alt="Resume scan animation"
                className="w-full"
              />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}

          {!isProcessing && (
            <UploadForm
              onSubmit={handleAnalyzeResume}
              onFileSelect={handleFileSelect}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
