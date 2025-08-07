"use client";
import { useState, useEffect } from "react";

const useTranslate = (sourceText: string, selectedLanguage: string) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async (text: string) => {
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sourceText: text, selectedLanguage }),
        });


        if (!response.ok) {
          throw new Error("Translation request failed");
        }

        const responseData = await response.json();
        setTargetText(responseData.data);
      } catch (error) {
        console.error("Error fetching translation:", error);
        setTargetText("Translation failed.");
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 200);

      return () => clearTimeout(timeoutId);
    } else {
      setTargetText("");
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
