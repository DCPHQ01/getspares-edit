import React from "react";

interface TruncateTextProps {
  text: string;
  maxLength: number;
}

const TruncateText: React.FC<TruncateTextProps> = ({ text, maxLength }) => {
  if (text?.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = text?.substring(0, maxLength) + "...";

  return <span title={text}>{truncatedText}</span>;
};
export default TruncateText;
