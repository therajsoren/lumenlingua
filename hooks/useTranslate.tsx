"use client";
import { useState, useEffect } from "react";

const useTranslate = (sourceText: string, selectedLanguage: string) => {
  const [targetText, setTargetText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sourceText.trim()) {
      setTargetText("");
      setError(null);
      setIsLoading(false);
      return;
    }
    const handleTranslate = async (text: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sourceText: text, selectedLanguage }),
        });
        const responseData = await response.json();
        if (responseData.data) {
          setTargetText(responseData.data);
        }
      } catch (error: any) {
        setError(error.message);
        setTargetText("Translation failed.");
      } finally {
        setIsLoading(false);
      }
    };
    const timeoutId = setTimeout(() => {
      handleTranslate(sourceText);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [sourceText, selectedLanguage]);

  return { targetText, isLoading, error };
};

export default useTranslate;
