"use client";

import * as React from "react";
import Rating from "@mui/material/Rating";
import ProgressBar from "./ProgressBar";
import { IoStarSharp } from "react-icons/io5";
import ReviewModal from "./ReviewModal";
import { Button } from "@mui/material";
import ViewAllComments from "./ViewAllComments";
import { useGetAllBuyersFeedbackQuery } from "../../../../../redux/features/feedback/feedbackQuery";
import { useEffect, useState } from "react";

interface viewAllFeedBack {
  comment: string;
  createdBy: string;
  productId: string;
  orderId: string;
  rating: number;
  dateCreated: string;
}

const ProductReview = () => {
  const { data, isLoading, isError } = useGetAllBuyersFeedbackQuery({
    productId: "666877a5b48207256da90429",
  });
  console.log("The feedbacks", data);
  const [viewFeedbacks, setViewFeedbacks] = useState<viewAllFeedBack[]>([]);

  useEffect(() => {
    if (data) {
      const list = data.data;
      setViewFeedbacks(list);
    }
  }, [data]);

  console.log("The feedback list: ", viewFeedbacks);

  const firstTwoItem = viewFeedbacks.slice(0, 2);

  console.log("First two item", firstTwoItem);

  const [value, setValue] = React.useState<number | null>(2);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openViewAllCommentsModal, setOpenViewAllCommentsModal] =
    React.useState<boolean>(false);
  const [selectedRating, setSelectedRating] = React.useState<number | null>(
    null
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleOpenViewAllCommentsModal = () => {
    setOpenViewAllCommentsModal(true);
  };

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
  ];

  return (
    <div>
      <div className={`flex justify-between p-[2px]`}>
        <div className={`text-xl font-semibold`}>Feedbacks & Reviews</div>
        <button
          onClick={handleOpenModal}
          className={`w-[170px] h-[40px] text-[#095AD3] text-white rounded-full bg-[#095AD3]`}
        >
          Give Feedback
        </button>
      </div>
      <div className={`flex gap-16 mt-4`}>
        <div
          className={`border-gray-300 w-[470px] h-[344px] border bg-[#F8FAFC] rounded-lg p-3`}
        >
          <div className={`w-[242px] h-[72px] flex gap-6`}>
            <div className={`text-6xl font-semibold`}>5.0</div>
            <div className={``}>
              <Rating
                name="read-only"
                sx={{ color: "#095AD3" }}
                value={3}
                readOnly
              />
              <div className={`font-normal text-xs`}>Based on 200 ratings</div>
            </div>
          </div>
          <div className={`flex gap-4 mt-4`}>
            <div className={`flex gap-2 w-24`}>
              <div className={`mt-0`}>
                <IoStarSharp color="#095AD3" />
              </div>
              <div>5 (50%)</div>
            </div>
            <ProgressBar percentage={50} />
          </div>
          <div className={`flex gap-4 mt-6`}>
            <div className={`flex gap-2 w-24 `}>
              <div className={`mt-0`}>
                <IoStarSharp color="#095AD3" />
              </div>
              <div>4 (20%)</div>
            </div>
            <ProgressBar percentage={20} />
          </div>
          <div className={`flex gap-4 mt-6`}>
            <div className={`flex gap-2 w-24`}>
              <div className={`mt-0`}>
                <IoStarSharp color="#095AD3" />
              </div>
              <div>3 (10%)</div>
            </div>
            <ProgressBar percentage={10} />
          </div>
          <div className={`flex gap-4 mt-6`}>
            <div className={`flex gap-2  w-24`}>
              <div className={`mt-0`}>
                <IoStarSharp color="#095AD3" />
              </div>
              <div>2 (15%)</div>
            </div>
            <ProgressBar percentage={15} />
          </div>
          <div className={`flex gap-4 mt-6`}>
            <div className={`flex gap-2 w-24`}>
              <div className={`mt-0`}>
                <IoStarSharp color="#095AD3" />
              </div>
              <div>1 (5%)</div>
            </div>
            <ProgressBar percentage={5} />
          </div>
        </div>
        <div className={`w-[600px] h-[436px]`}>
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
          {firstTwoItem?.map((firstTwoItem, index) => {
            return (
              <div className={`mb-4`}>
                <div className={`mb-2`}>
                  <div>{firstTwoItem.createdBy}</div>
                  <Rating
                    name="read-only"
                    sx={{ color: "#095AD3" }}
                    value={firstTwoItem.rating}
                    readOnly
                  />
                </div>
                <div className={`mb-1.5`}>{firstTwoItem.comment}</div>
                <div className={`text-[#9AA4B2]`}>
                  {firstTwoItem.dateCreated}
                  {/* .{review.time} */}
                </div>
              </div>
            );
          })}
          <div
            onClick={handleOpenViewAllCommentsModal}
            className={`underline text-[#095AD3] cursor-pointer`}
          >
            View more comments
          </div>
        </div>
      </div>
      <ReviewModal openModal={openModal} setOpenModal={setOpenModal} />
      <ViewAllComments
        viewAllFeedBack={viewFeedbacks}
        openModal={openViewAllCommentsModal}
        setOpenModal={setOpenViewAllCommentsModal}
      />
    </div>
  );
};
export default ProductReview;
