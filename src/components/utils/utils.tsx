import React from "react";
import dayjs from "dayjs";

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


export const formatDateTime = (dateTime: string) => {
  const date = dayjs(dateTime).format("DD-MM-YYYY");
  const time = dayjs(dateTime).format("hh:mm A");
  return { date, time };
};