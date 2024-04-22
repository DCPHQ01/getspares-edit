import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { MdStar } from "react-icons/md";

// const labels: { [index: string]: string } = {
//   0.5: "Useless",
//   1: "Useless+",
//   1.5: "Poor",
//   2: "Poor+",
//   2.5: "Ok",
//   3: "Ok+",
//   3.5: "Good",
//   4: "Good+",
//   4.5: "Excellent",
//   5: "Excellent+",
// };

export default function TextRating({value}: any) {

  return (
    <Box id="ratingStars!%^">
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<MdStar style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
}
