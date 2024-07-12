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
  reviewerFullName: string;
  productId: string;
  orderId: string;
  rating: number;
  dateCreated: string;
}

interface AllFeedbackGraph {
  averageRating: 0;
  totalNoOfReviewers: 0;
  ratingPercentages: {
    additionalProp1: 0;
    additionalProp2: 0;
    additionalProp3: 0;
  };
}
const ProductReview = () => {
  let productId = "";
  useEffect(() => {
    const savedId = sessionStorage.getItem("myProductId");
    if (savedId) {
      productId = JSON.parse(savedId);
    }
  }, []);
  const { data, isLoading, isError } = useGetAllBuyersFeedbackQuery({
    productId: productId,
  });
  const [viewFeedbacks, setViewFeedbacks] = useState<viewAllFeedBack[]>([]);

  useEffect(() => {
    if (data) {
      const list = data?.data?.feedBackResponses;
      setViewFeedbacks(list);
    }
  }, [data]);
  // console.log("viewAllFeedback", viewFeedbacks);

  const [viewFeedbackGraph, setViewFeedbackGraph] =
    useState<AllFeedbackGraph>();
  useEffect(() => {
    if (data) {
      const listOfGraph = data?.data?.feedBackGraph;
      setViewFeedbackGraph(listOfGraph);
    }
  }, [data]);

  console.log("feedback graph", viewFeedbackGraph);

  const firstTwoItem = viewFeedbacks.slice(0, 2);

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

  // const listOfReviews = [
  //   {
  //     name: "Femi chukwuemeka",
  //     rate: 3,
  //     description:
  //       "Maintenance on this engine is a breeze thanks to its user-friendly design and easy access to components",
  //     date: "May 15th, 2023",
  //     time: "12:00",
  //   },
  //   {
  //     name: "Femi chukwuemeka",
  //     rate: 3,
  //     description:
  //       "Maintenance on this engine is a breeze thanks to its user-friendly design and easy access to components",
  //     date: "May 15th, 2023",
  //     time: "12:00",
  //   },
  // ];

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

      <div className={`lg:flex gap-16 mt-4`}>
        <div
          className={`border-gray-300 lg:w-[470px] w-[100%]  h-[344px] border bg-[#F8FAFC] rounded-lg p-3`}
        >
          <div className={`w-[242px] h-[72px] flex gap-6`}>
            <div className={`text-2xl font-semibold`}>
              {viewFeedbackGraph?.averageRating}
            </div>
            <div className={``}>
              <Rating
                name="read-only"
                sx={{ color: "#095AD3" }}
                value={3}
                readOnly
              />
              <div className={`font-normal text-xs`}>
                Based on {viewFeedbackGraph?.totalNoOfReviewers} ratings
              </div>
            </div>
          </div>
          <div className={`flex gap-4 mt-4`}>
            <div className={`flex gap-2 w-24`}>
              <div className={`mt-0`}>
                <IoStarSharp color="#095AD3" />
              </div>
              <div className="flex gap-x-2">
                <div className="">5</div>
                <div className="">()</div>
              </div>
            </div>
            <ProgressBar percentage={50} />
          </div>
          <div className={`flex gap-4 mt-6`}>
            <div className={`flex gap-2 w-24 `}>
              <div className={`mt-0`}>
                <IoStarSharp color="#095AD3" />
              </div>
              <div className="flex gap-x-2">
                <div className="">4</div>
                <div className="">(20%)</div>
              </div>
            </div>
            <ProgressBar percentage={20} />
          </div>
          <div className={`flex gap-4 mt-6`}>
            <div className={`flex gap-2 w-24`}>
              <div className={`mt-0`}>
                <IoStarSharp color="#095AD3" />
              </div>
              <div className="flex gap-x-2">
                <div className="">3</div>
                <div className="">(10%)</div>
              </div>
            </div>
            <ProgressBar percentage={10} />
          </div>
          <div className={`flex gap-4 mt-6`}>
            <div className={`flex gap-2  w-24`}>
              <div className={`mt-0`}>
                <IoStarSharp color="#095AD3" />
              </div>
              <div className="flex gap-x-2">
                <div className="">2</div>
                <div className="">(15%)</div>
              </div>
            </div>
            <ProgressBar percentage={15} />
          </div>
          <div className={`flex gap-4 mt-6`}>
            <div className={`flex gap-2 w-24`}>
              <div className={`mt-0`}>
                <IoStarSharp color="#095AD3" />
              </div>
              <div className="flex gap-x-2">
                <div className="">1</div>
                <div className="">(10%)</div>
              </div>
            </div>
            <ProgressBar percentage={5} />
          </div>
        </div>

        <div className={`lg:w-[600px] w-[100%] lg:mt-0 mt-10 h-[436px]`}>
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
                  <div>{firstTwoItem.reviewerFullName}</div>
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
      <div className="">
        <ReviewModal openModal={openModal} setOpenModal={setOpenModal} />
        <ViewAllComments
          viewAllFeedBack={viewFeedbacks}
          openModal={openViewAllCommentsModal}
          setOpenModal={setOpenViewAllCommentsModal}
        />
      </div>
    </div>
  );
};
export default ProductReview;
