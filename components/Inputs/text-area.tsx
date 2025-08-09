import React from "react";
import { Textarea } from "@/components/ui/textarea";

const TextArea = ({
  id,
  value,
  onChange,
  placeholder,
  className,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <Textarea
      rows={5}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-4 py-2 pb-16 w-full border-2 shadow-md rounded-md transition focus:outline-hidden focus:shadow-xs h-[200px]
        resize-none
        ${className || ''}`}
        style={{scrollbarWidth: "thin"}}
    />
  );
};

export default TextArea;
