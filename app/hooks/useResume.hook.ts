import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePuterStore } from "~/store/usePuterStore";
import type { Feedback } from "~/types";

interface UseResumeReturn {
  imageUrl: string;
  resumeUrl: string;
  feedback: Feedback | null;
  isLoading: boolean;
}

export const useResume = (): UseResumeReturn => {
  const { fs, kv } = usePuterStore();
  const { id } = useParams();

  const [imageUrl, setImageUrl] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadResume = async () => {
      if (!id) return;
      setIsLoading(true);

      try {
        const resume = await kv.get(`resume:${id}`);

        if (!resume || !isMounted) return;

        const data = JSON.parse(resume);

        if (data?.resumePath) {
          const resumeBlob = await fs.read(data.resumePath);
          if (resumeBlob && isMounted) {
            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
            const url = URL.createObjectURL(pdfBlob);
            setResumeUrl(url);
          }
        }

        if (data?.imagePath) {
          const imageBlob = await fs.read(data.imagePath);
          if (imageBlob && isMounted) {
            const url = URL.createObjectURL(imageBlob);
            setImageUrl(url);
          }
        }

        if (isMounted && data?.feedback) {
          setFeedback(data.feedback);
        }
      } catch (error) {
        console.error("Failed to load resume:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadResume();

    return () => {
      isMounted = false;
    };
  }, [id, kv, fs]);

  return {
    imageUrl,
    resumeUrl,
    feedback,
    isLoading,
  };
};
