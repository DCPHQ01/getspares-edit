import { useState, useEffect } from "react";
import style from "src/components/Cohort/style/cohort.module.scss";

// interface ProgressBarProps {
//   percentage?: number;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
//   return (
//     <div
//     className="w-full"
//       style={{
//         // width: "100%",
//         height: "9.88px",
//         flexShrink: "0",
//         borderRadius: "16px",
//         background: "#F0F4F4",
//         marginTop: "7px",
//         // flexGrow: "5"
//       }}
//     >
//       <div
//         style={{
//           width: `${percentage}%`,
//           height: "9.88px",
//           flexShrink: "0",
//           borderRadius: "16px 0 0 16px",
//           background: "#095AD3",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default ProgressBar;
import React from "react";

interface ProgressBarProps {
  percentage?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="w-full h-2.5 flex-shrink-0 rounded-lg bg-gray-200 mt-1.5 sm:w-4/5 md:w-1/2 lg:w-1/2 xl:w-[100%]">
      <div
        className="h-2.5 rounded-l-lg bg-blue-600"
        style={{
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
