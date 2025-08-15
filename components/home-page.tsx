"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SpeachRecognitionComponent from "@/components/Speech-recognition/page";
import { FaVolumeUp } from "react-icons/fa";
import {
  AIInput,
  AIInputButton,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@/components/ui/shadcn-io/ai/input";
import useTranslate from "@/hooks/useTranslate";
import { Check, Copy, LanguagesIcon } from "lucide-react";

const HomePage = () => {
  const [sourceText, setSourceText] = useState<string>("");
  const [selectedLanguage, setSelectLanguage] = useState<string>("Spanish");
  const [copied, setCopied] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const { targetText, isLoading, error } = useTranslate(
    sourceText.length <= 2000 ? sourceText : "",
    selectedLanguage
  );

  const [languages] = useState<string[]>([
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Korean",
  ]);

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
  };

  const handleCopyToClipboard = () => {
    if (targetText) {
      navigator.clipboard.writeText(targetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAudioPlayback = () => {
    stopSpeech();
    if (!sourceText.trim()) return;
    const utterance = new SpeechSynthesisUtterance(sourceText);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleTargetAudioPlayback = () => {
    stopSpeech();
    if (!targetText?.trim()) return;
    const utterance = new SpeechSynthesisUtterance(targetText);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!sourceText.trim() && !targetText?.trim()) {
      stopSpeech();
    }
  }, [sourceText, targetText]);

  return (
    <div className="min-h-screen mt-[4rem] md:p-4 p-8">
      <div className="flex items-center justify-center flex-col space-y-4">
        <h1 className="text-6xl font-black">
          Lumen
          <span className="text-orange-600/90 tracking-tighter">Lingua</span>
        </h1>
        <h4 className="text-xl font-normal -tracking-wider">
          Shining a light on every language.
        </h4>
      </div>

      <div className="mt-[4rem] grid md:grid-cols-2 grid-cols-1 gap-4 max-w-5xl mx-auto">

        <div className="relative z-10 flex flex-col h-[300px]" style={{ scrollbarWidth: "thin" }}>
          <AIInput className="h-full flex flex-col">
            <AIInputTextarea
              value={sourceText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSourceText(e.target.value)}
              placeholder="Enter text to translate..."
              className="flex-1 resize-none border-0 focus:ring-0"
            />
            <AIInputToolbar className="border-t p-1">
              <AIInputTools className="px-4">
                <SpeachRecognitionComponent setSourceText={setSourceText} />
                <AIInputButton type="button" onClick={handleAudioPlayback}>
                  <FaVolumeUp size={16} />
                </AIInputButton>
              </AIInputTools>
              <div
                className="text-sm mr-4"
                style={{
                  color: sourceText.length > 2000 ? "rgb(239 68 68)" : "rgb(107 114 128)",
                }}
              >
                {sourceText.length} / 2000
              </div>
            </AIInputToolbar>
          </AIInput>
        </div>

        <div className="relative z-10 flex flex-col h-[300px]" style={{ scrollbarWidth: "thin" }}>
          <AIInput onSubmit={(e) => e.preventDefault()} className="h-full flex flex-col">
            <AIInputTextarea
              value={targetText}
              onChange={() => {}}
              placeholder={
                isLoading
                  ? "Translating..."
                  : error
                  ? "Translation failed"
                  : "Translation will appear here..."
              }
              className="flex-1 resize-none border-0 focus:ring-0"
              readOnly
            />
            {isLoading && (
              <div className="absolute top-2 right-2 text-sm text-blue-500 z-20">
                Translating...
              </div>
            )}
            {error && (
              <div className="absolute top-2 right-2 text-sm text-red-500 z-20">
                Error: {error}
              </div>
            )}
            <AIInputToolbar className="border-t p-1">
              <AIInputTools>
                <span className="flex items-center justify-between bg-slate-950/80 h-full text-white rounded-full p-0.5 cursor-pointer">
                  <LanguagesIcon size={16} className="ml-4" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectLanguage(e.target.value)}
                    className="focus:outline-none focus:ring-0 bg-transparent text-sm pr-2"
                  >
                    {languages.map((language, index) => (
                      <option key={index} value={language} className="bg-slate-950/80">
                        {language}
                      </option>
                    ))}
                  </select>
                </span>
                <AIInputButton type="button" onClick={handleTargetAudioPlayback}>
                  <FaVolumeUp size={16} />
                </AIInputButton>
              </AIInputTools>
              {copied ? (
                <span className="text-xs flex items-center text-green-600">
                  <Check size={16} className="mr-1" /> Copied!
                </span>
              ) : (
                <AIInputButton type="button" onClick={handleCopyToClipboard}>
                  <Copy size={16} />
                </AIInputButton>
              )}
            </AIInputToolbar>
          </AIInput>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
