import type { SubmitEvent } from "react";
import FileUploader from "./FileUploader";

interface UploadFormProps {
  handleSubmit: (e: SubmitEvent) => void;
  handleFileSelect: (file: File | null) => void;
}

const UploadForm = ({ handleSubmit, handleFileSelect }: UploadFormProps) => {
  return (
    <form
      id="upload-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-8"
    >
      <div className="form-div">
        <label htmlFor="company-name">Company Name</label>
        <input
          type="text"
          name="Company Name"
          placeholder="Apple"
          id="company-name"
        />
      </div>

      <div className="form-div">
        <label htmlFor="job-title">Job Title</label>
        <input
          type="text"
          name="Job Title"
          placeholder="Frontend developer"
          id="job-title"
        />
      </div>

      <div className="form-div">
        <label htmlFor="job-description">Job Description</label>
        <textarea
          rows={5}
          name="Job Description"
          placeholder="Write about your responsibilities as a frontend developer..."
          id="job-description"
        />
      </div>

      <div className="form-div">
        <label htmlFor="uploader">Upload Resume</label>
        <FileUploader onFileSelect={handleFileSelect} />
      </div>

      <button className="primary-button" type="submit">
        Analyze resume
      </button>
    </form>
  );
};

export default UploadForm;
