import { useState, type SubmitEvent } from "react";
import Header from "~/components/Header";
import UploadForm from "~/components/UploadForm";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  // FIXME: Replace console.log to a server request
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");

    if (!form) return;

    const formData = new FormData(form);

    const companyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-description");

    console.log(
      "🚀 ~ Upload ~ handleSubmit ~ jobTitle:",
      jobDescription,
      jobTitle,
      companyName,
    );
  };

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
                src="/images/resume-scan.gif"
                alt="Resume scan icon"
                className="w-full"
              />
            </>
          ) : (
            <>
              <h2>Drop your resume for an ATS score and improvement tips</h2>
            </>
          )}
          {!isProcessing && (
            <UploadForm
              handleSubmit={handleSubmit}
              handleFileSelect={handleFileSelect}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
