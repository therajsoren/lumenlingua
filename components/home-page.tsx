"use client";
import { ChangeEvent, useState } from "react";
import TextArea from "@/components/Inputs/text-area";
import SpeachRecognitionComponent from "@/components/Speech-recognition/page";
import { FaVolumeUp } from "react-icons/fa";

import useTranslate from "@/hooks/useTranslate";
import {
  Check,
  Copy,
  LanguagesIcon,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

const HomePage = () => {
  const [sourceText, setSourceText] = useState<string>("");
  const [selectedLanguage, setSelectLanguage] = useState<string>("Spanish");
  const [copied, setCopied] = useState(false);

  const { targetText, isLoading, error } = useTranslate(
    sourceText as string,
    selectedLanguage as string
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


  const handleCopyToClipboard = () => {
    if (targetText) {
      navigator.clipboard.writeText(targetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const rtfToText = (rtfContent: string) => {
    rtfContent = rtfContent.replace(
      /\{\\*?[^{}]+}|[{}]|\\\\\\n?[A-Za-z]+\\n?(?:-?\d+)??/g,
      ""
    );
    rtfContent = rtfContent.replace(/\\par[d]?/g, "\n");
    return rtfContent.trim();
  };
  const handleAudioPlayback = () => {
    const utterance = new SpeechSynthesisUtterance(sourceText);
    window.speechSynthesis.speak(utterance);
  };
  const handleTargetAudioPlayback = () => {
    if (targetText) {
      const utterance = new SpeechSynthesisUtterance(targetText);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen mt-[4rem] md:p-4 p-8">
      <div className="flex items-center justify-center flex-col space-y-4">
        <h1 className="text-6xl font-black">
          Lumen
          <span className="text-orange-600/90 tracking-tighter">Lingua</span>
        </h1>
        <h4 className="text-xl font-normal -tracking-wider">Shining a light on every language.</h4>
      </div>

      <div className="mt-[4rem] grid md:grid-cols-2 grid-cols-1 gap-4 max-w-5xl mx-auto">
        <div className="relative z-10 flex flex-col"
        style={{scrollbarWidth: "thin"}}
        >
          <TextArea
            id="source-language"
            value={sourceText}
            placeholder="source language"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setSourceText(e.target.value)
            }
          />
          <div className="flex flex-row justify-between bottom-0 left-0 right-0 items-center absolute p-3 border-t-2">
            <span className="cursor-pointer flex items-center space-x-4">
                <SpeachRecognitionComponent setSourceText={setSourceText} />
              <FaVolumeUp size={20} onClick={handleAudioPlayback} />
            </span>
          </div>
          <div className="absolute bottom-2 right-4 text-sm text-gray-500">
            {sourceText.length} / 2000
          </div>
        </div>
        <div className="relative z-10 flex flex-col">
          <TextArea
            id="source-language"
            value={targetText}
            placeholder={isLoading ? "Translating..." : error ? "Translation failed" : "output language"}
            onChange={() => { }}
          />
          {isLoading && (
            <div className="absolute top-2 right-2 text-sm text-red-500">
              Translating...
            </div>
          )}
          {error && (
            <div className="absolute top-2 right-2 text-sm text-red-500">
              Error: {error}
            </div>
          )}
          <div className="bottom-0 absolute p-3 left-0 right-0 pr-4 border-t-2 w-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 pl-2 cursor-pointer">
                <span className="flex items-center justify-between bg-slate-950/80 h-full w-full text-white rounded-full p-0.5 cursor-pointer">
                  <LanguagesIcon size={16} className="ml-1" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectLanguage(e.target.value)}
                    className="focus:outline-none focus:ring-0 bg-transparent text-sm"
                  >
                    {languages.map((language, index) => (
                      <option
                        key={index}
                        value={language}
                        className="bg-slate-950/80"
                      >
                        {language}
                      </option>
                    ))}
                  </select>
                </span>
                <FaVolumeUp
                  size={20}
                  onClick={handleTargetAudioPlayback}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2 items-center cursor-pointer">
                {copied ? (
                  <span className="text-xs flex items-center">
                    <Check size={16} /> Copied!
                  </span>
                ) : (
                  <Copy size={16} onClick={handleCopyToClipboard} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
