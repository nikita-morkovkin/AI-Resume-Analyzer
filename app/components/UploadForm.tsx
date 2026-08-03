import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import type { UploadFormData } from "~/types";
import FileUploader from "./FileUploader";
import FormInput from "./FormInput";

interface UploadFormProps {
  onSubmit: (data: UploadFormData) => void;
  onFileSelect: (file: File | null) => void;
}

const UploadForm = ({ onSubmit, onFileSelect }: UploadFormProps) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleJobTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  const handleJobDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  const isFormValid =
    companyName.trim() !== "" &&
    jobTitle.trim() !== "" &&
    jobDescription.trim() !== "" &&
    file !== null;

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    onSubmit({
      companyName: companyName.trim(),
      jobTitle: jobTitle.trim(),
      jobDescription: jobDescription.trim(),
    });
  };

  return (
    <form
      id="upload-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-8"
    >
      <FormInput
        id="companyName"
        label="Company Name"
        placeholder="Apple"
        value={companyName}
        onChange={handleCompanyChange}
      />

      <FormInput
        id="jobTitle"
        label="Job Title"
        placeholder="Frontend developer"
        value={jobTitle}
        onChange={handleJobTitleChange}
      />

      <div className="form-div">
        <label htmlFor="jobDescription">Job Description</label>
        <textarea
          rows={5}
          name="jobDescription"
          placeholder="Write about your responsibilities as a frontend developer..."
          id="jobDescription"
          value={jobDescription}
          onChange={handleJobDescriptionChange}
        />
      </div>

      <div className="form-div">
        <label>Upload Resume</label>
        <FileUploader onFileSelect={handleFileSelect} />
      </div>

      <button
        className="primary-button disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={!isFormValid}
      >
        Analyze resume
      </button>
    </form>
  );
};

export default UploadForm;
