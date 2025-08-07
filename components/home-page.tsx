"use client";
import { ChangeEvent, useRef, useState } from "react";
import TextArea from "@/components/Inputs/text-area";
import SpeachRecognitionComponent from "@/components/Speech-recognition/page";
import { FaVolumeUp } from "react-icons/fa";
import { PiLinkBold } from "react-icons/pi";
import { TbFileUpload } from "react-icons/tb";
import { Text } from "./retroui/Text";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedLanguage, setSelectLanguage] = useState<string>("Spanish");
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Korean",
  ]);

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favorite", JSON.stringify(sourceText));
    } else {
      localStorage.removeItem("favorite");
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sourceText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    try {
      if (link) {
        const response = await fetch(link);
        const data = await response.text();
        setSourceText(data);
      } else {
        setSourceText("");
      }
    } catch (error) {
      console.error("Error Fetching link content", error);
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
  const fileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };
  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleAudioPlayback = () => {
    const utterance = new SpeechSynthesisUtterance(sourceText);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen mt-[4rem] md:p-4 p-8">
      <div className="flex items-center justify-center flex-col space-y-4">
        <Text as="h1">
          Lingua
          <span className="text-orange-600/90 tracking-tighter">Speak</span>
        </Text>
        <Text as="h4">LinguaSpeak: Bridging Voices, Connecting Worlds</Text>
      </div>

      <div className="mt-[4rem] grid md:grid-cols-2 grid-cols-1 gap-4 max-w-5xl mx-auto">
        <div className="relative z-10 flex flex-col">
          <TextArea
            id="source-language"
            value={sourceText}
            placeholder="source language"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setSourceText(e.target.value)
            }
          />
          <div className="flex flex-row justify-between bottom-0 absolute p-4">
            <span className="cursor-pointer flex items-center space-x-4">
              <SpeachRecognitionComponent setSourceText={setSourceText} />
              <FaVolumeUp size={20} onClick={handleAudioPlayback} />
              <input
                type="file"
                className="hidden"
                accept=".txt,.rtf,.json,"
                onChange={fileUpload}
                ref={fileInputRef}
              />
              <TbFileUpload size={20} onClick={handleFileUploadClick} />
              <label htmlFor="link-paste-input">
                <PiLinkBold size={20} />
              </label>
              <input id="link-paste-input" type="url" className="hidden" onChange={handleLinkPaste} />
            </span>
          </div>
        </div>
        <div className="relative z-10 flex flex-col">
          <TextArea
            id="source-language"
            value={sourceText}
            placeholder="output language"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setSourceText(e.target.value)
            }
          />
          <div className="bottom-0 absolute p-4 w-full">
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
                  onClick={handleAudioPlayback}
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
                <ThumbsUp size={16} />
                <ThumbsDown size={16} />
                <button>
                  {favorite ? (
                    <Star size={18} onClick={handleFavorite} fill="black" />
                  ) : (
                    <Star size={18} onClick={handleFavorite} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
