"use clents";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Rating,
} from "@mui/material";
import { IoClose, IoStarSharp } from "react-icons/io5";
import * as React from "react";

interface viewAllFeedBack {
  comment: string;
  reviewerFullName: string;
  productId: string;
  orderId: string;
  rating: number;
  dateCreated: string;
}

interface ReviewModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  viewAllFeedBack: viewAllFeedBack[];
}
const ViewAllComments: React.FC<ReviewModalProps> = ({
  openModal,
  setOpenModal,
  viewAllFeedBack,
}) => {
  const [selectedRating, setSelectedRating] = React.useState<number | null>(
    null
  );

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const listOfReviews = [
    {
      name: "Femi chukwuemeka",
      rate: 3,
      description:
        "Maintenance on this engine is a breeze thanks to its user-friendly design and easy access to components",
      date: "May 15th, 2023",
      time: "12:00",
    },
    {
      name: "Femi chukwuemeka",
      rate: 3,
      description:
        "Maintenance on this engine is a breeze thanks to its user-friendly design and easy access to components",
      date: "May 15th, 2023",
      time: "12:00",
    },
    {
      name: "Femi chukwuemeka",
      rate: 3,
      description:
        "Maintenance on this engine is a breeze thanks to its user-friendly design and easy access to components",
      date: "May 15th, 2023",
      time: "12:00",
    },
  ];
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <Dialog
      open={openModal}
      onClose={closeModal}
      sx={{
        "& .MuiDialog-paper": {
          width: "659px",
          height: "670px",
          padding: "7px",
        },
      }}
    >
      <DialogTitle>
        <div className={`flex justify-between`}>
          <div>All reviews</div>
          <IoClose onClick={closeModal} className={`cursor-pointer`} />
        </div>
      </DialogTitle>
      <Divider sx={{ width: "100%" }} />
      <DialogContent>
        <div className={` h-[436px] bg-scroll`}>
          <div className={`flex gap-2 mb-4`}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                sx={{
                  borderRadius: "38px",
                  width: "45px",
                  height: "28px",
                  border:
                    selectedRating === rating
                      ? "solid 2px #095AD3"
                      : "solid 1px #CDD5DF",
                  color: "black",
                }}
                startIcon={<IoStarSharp color="#095AD3" />}
              >
                {rating}
              </Button>
            ))}
          </div>
          {viewAllFeedBack?.map((review, index) => {
            return (
              <div className={`mb-6`} key={index}>
                <div className={`mb-1.5`}>
                  <div>{review.reviewerFullName}</div>
                  <Rating
                    name="read-only"
                    sx={{ color: "#095AD3" }}
                    value={review.rating}
                    readOnly
                  />
                </div>
                <div className={`mb-2`}>{review.comment}</div>
                <div className={`text-[#9AA4B2]`}>{review.dateCreated}</div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ViewAllComments;
