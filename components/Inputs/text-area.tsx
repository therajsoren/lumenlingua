import React from "react";
import { Textarea } from "../retroui/Textarea";

const TextArea = ({
  id,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}) => {
  return (
    <Textarea
      rows={5}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-4 py-2 w-full border-2 shadow-md transition focus:outline-hidden focus:shadow-xs"
    />
  );
};

export default TextArea;
