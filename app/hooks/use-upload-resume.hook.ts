import { useState } from "react";
import { useNavigate } from "react-router";
import { UPLOAD_KEYS, UPLOAD_STATUS_TEXT } from "~/consts";
import { usePuterStore } from "~/store/usePuterStore";
import type { UploadFormData } from "~/types";
import { convertPdfToImage } from "~/utils/convert-pdf-to-image.util";
import { formatAiAnalysisPrompt } from "~/utils/format-ai-instructions.util";

export interface ReturnProps {
  isProcessing: boolean;
  statusText: string;
  selectedFile: File | null;
  handleFileSelect: (file: File | null) => void;
  handleAnalyzeResume: (formData: UploadFormData) => Promise<void>;
}

export const useUploadResume = (): ReturnProps => {
  const { fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleAnalyzeResume = async (formData: UploadFormData) => {
    if (!selectedFile) {
      setStatusText(UPLOAD_STATUS_TEXT.ERRORS.FILE_REQUIRED);
      return;
    }

    setIsProcessing(true);

    try {
      setStatusText(UPLOAD_STATUS_TEXT.UPLOADING_FILE);
      const uploadedFile = await fs.upload([selectedFile]);

      if (!uploadedFile || !uploadedFile.path) {
        setStatusText(UPLOAD_STATUS_TEXT.ERRORS.UPLOAD_FAILED);
        setIsProcessing(false);
        return;
      }

      setStatusText(UPLOAD_STATUS_TEXT.CONVERTING_IMAGE);
      const imageResult = await convertPdfToImage(selectedFile);

      if (!imageResult) {
        setStatusText(UPLOAD_STATUS_TEXT.ERRORS.CONVERT_FAILED);
        setIsProcessing(false);
        return;
      }

      setStatusText(UPLOAD_STATUS_TEXT.UPLOADING_IMAGE);
      const uploadedImage = await fs.upload([imageResult.file]);

      if (!uploadedImage || !uploadedImage.path) {
        setStatusText(UPLOAD_STATUS_TEXT.ERRORS.IMAGE_UPLOAD_FAILED);
        setIsProcessing(false);
        return;
      }

      setStatusText(UPLOAD_STATUS_TEXT.PREPARING_DATA);
      const uuid = crypto.randomUUID();

      const resumeRecord = {
        id: uuid,
        resumePath: uploadedFile.path,
        imagePath: uploadedImage.path,
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        jobDescription: formData.jobDescription,
        feedback: "",
      };

      await kv.set(
        `${UPLOAD_KEYS.RESUME_PREFIX}${uuid}`,
        JSON.stringify(resumeRecord),
      );

      setStatusText(UPLOAD_STATUS_TEXT.ANALYZING_AI);
      const feedbackResponse = await ai.feedback(
        uploadedFile.path,
        formatAiAnalysisPrompt({
          jobTitle: formData.jobTitle,
          jobDescription: formData.jobDescription,
        }),
      );

      if (!feedbackResponse) {
        setStatusText(UPLOAD_STATUS_TEXT.ERRORS.AI_FAILED);
        setIsProcessing(false);
        return;
      }

      const content = feedbackResponse?.message?.content;
      const rawFeedbackText =
        typeof content === "string" ? content : content?.[0]?.text || "";

      if (!rawFeedbackText) {
        setStatusText(UPLOAD_STATUS_TEXT.ERRORS.AI_FAILED);
        setIsProcessing(false);
        return;
      }

      resumeRecord.feedback = JSON.parse(rawFeedbackText);
      await kv.set(
        `${UPLOAD_KEYS.RESUME_PREFIX}${uuid}`,
        JSON.stringify(resumeRecord),
      );

      setStatusText(UPLOAD_STATUS_TEXT.COMPLETE);
      navigate(`/resume/${uuid}`);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setStatusText(UPLOAD_STATUS_TEXT.ERRORS.GENERIC);
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    statusText,
    selectedFile,
    handleFileSelect,
    handleAnalyzeResume,
  };
};
