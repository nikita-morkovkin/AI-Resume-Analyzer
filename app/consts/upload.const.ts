export const UPLOAD_STATUS_TEXT = {
  UPLOADING_FILE: "Uploading the file...",
  CONVERTING_IMAGE: "Converting to image...",
  UPLOADING_IMAGE: "Uploading image file...",
  PREPARING_DATA: "Preparing data...",
  ANALYZING_AI: "Analyzing by AI...",
  COMPLETE: "Analysis complete, redirecting...",
  ERRORS: {
    FILE_REQUIRED: "Error: Please select a resume file",
    UPLOAD_FAILED: "Error: Failed to upload file",
    CONVERT_FAILED: "Error: Failed to convert PDF to image",
    IMAGE_UPLOAD_FAILED: "Error: Failed to upload image",
    AI_FAILED: "Error: Failed to analyze resume",
    GENERIC: "Error: Something went wrong during analysis",
  },
} as const;

export const UPLOAD_ASSETS = {
  BG_MAIN: "/images/bg-main.svg",
  SCAN_GIF: "/images/resume-scan.gif",
} as const;

export const UPLOAD_KEYS = {
  RESUME_PREFIX: "resume:",
} as const;

export const PDF_CONVERT_CONFIG = {
  SCALE: 2.0,
  DEFAULT_IMAGE_NAME: "resume.png",
  IMAGE_MIME_TYPE: "image/png",
  WORKER_SRC_URL: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/",
} as const;
