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
  buyerId: string;
}

interface AllFeedbackGraph {
  averageRating: 0;
  totalNoOfReviewers: 0;
  ratingPercentages: {
    threeStar: 0;
    oneStar: 0;
    fourStar: 0;
    twoStar: 0;
    fiveStar: 0;
  };
}
const ProductReview = () => {
  const storedProductId = sessionStorage.getItem("myProductId");
  const parsedProductId = storedProductId ? storedProductId : "";

  const { data, isLoading, isError } = useGetAllBuyersFeedbackQuery({
    productId: storedProductId || "",
  });

  const [viewFeedbacks, setViewFeedbacks] = useState<viewAllFeedBack[]>([]);

  useEffect(() => {
    if (data) {
      const list = data?.data?.feedBackResponses;
      setViewFeedbacks(list);
    }
  }, [data]);

  const [viewFeedbackGraph, setViewFeedbackGraph] =
    useState<AllFeedbackGraph>();
  useEffect(() => {
    if (data) {
      const listOfGraph = data?.data?.feedBackGraph;
      setViewFeedbackGraph(listOfGraph);
    }
  }, [data]);

  const firstTwoItem = viewFeedbacks.slice(0, 2);

  const [value, setValue] = React.useState<number | null>(2);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [openViewAllCommentsModal, setOpenViewAllCommentsModal] =
    React.useState<boolean>(false);
  const [selectedRating, setSelectedRating] = React.useState<number | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenModal = () => {
    const userHasSubmittedFeedback = viewFeedbacks.some(
      (feedback) => feedback.buyerId === currentUserId
    );

    if (userHasSubmittedFeedback) {
      setErrorMessage("You cannot give feedback more than once");
      return;
    }
    setOpenModal(true);
  };
  const handleOpenViewAllCommentsModal = () => {
    setOpenViewAllCommentsModal(true);
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const graph = [
    {
      id: 5,
      starSharp: <IoStarSharp color="#095AD3" />,
      number: 5,
      progressbar: (
        <ProgressBar
          percentage={viewFeedbackGraph?.ratingPercentages?.fiveStar || 0}
        />
      ),
      percentage: viewFeedbackGraph?.ratingPercentages?.fiveStar || 0,
    },
    {
      id: 4,
      starSharp: <IoStarSharp color="#095AD3" />,
      number: 4,
      progressbar: (
        <ProgressBar
          percentage={viewFeedbackGraph?.ratingPercentages?.fourStar || 0}
        />
      ),
      percentage: viewFeedbackGraph?.ratingPercentages?.fourStar || 0,
    },
    {
      id: 3,
      starSharp: <IoStarSharp color="#095AD3" />,
      number: 3,
      progressbar: (
        <ProgressBar
          percentage={viewFeedbackGraph?.ratingPercentages?.threeStar || 0}
        />
      ),
      percentage: viewFeedbackGraph?.ratingPercentages?.threeStar || 0,
    },
    {
      id: 2,
      starSharp: <IoStarSharp color="#095AD3" />,
      number: 2,
      progressbar: (
        <ProgressBar
          percentage={viewFeedbackGraph?.ratingPercentages?.twoStar || 0}
        />
      ),
      percentage: viewFeedbackGraph?.ratingPercentages?.twoStar || 0,
    },
    {
      id: 1,
      starSharp: <IoStarSharp color="#095AD3" />,
      number: 1,
      progressbar: (
        <ProgressBar
          percentage={viewFeedbackGraph?.ratingPercentages?.oneStar || 0}
        />
      ),
      percentage: viewFeedbackGraph?.ratingPercentages?.oneStar || 0,
    },
  ];

  useEffect(() => {
    const savedUserId = sessionStorage.getItem("userDetails");
    if (savedUserId) {
      const userId = JSON.parse(savedUserId);
      setCurrentUserId(userId.userId);
    }
  }, []);

  return (
    <div className="w-full">
      <div className={`flex justify-between p-[2px]`}>
        <div className={`text-xl font-semibold`}>Feedbacks & Reviews</div>
        <div className="block" id="feedbackButtonDiv">
          <button
            onClick={handleOpenModal}
            className={`w-[170px] h-[40px]  text-white rounded-full bg-[#095AD3]`}
          >
            Give Feedback
          </button>
          <div>
         
          </div>
        </div>
      </div>
      <div className="flex justify-end">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>

      <div className={`lg:flex gap-16 mt-4`}>
        <div
          className={`border-gray-300 md:w-[400px] lg:w-[470px] w-[150%]  h-[344px] border bg-[#F8FAFC] rounded-lg p-3`}
        >
          <div className={`w-[242px] h-[72px] flex gap-6`}>
            <div className={`text-2xl font-semibold`}>
              {viewFeedbackGraph?.averageRating || 0}
            </div>

            <div className={``}>
              <Rating
                name="read-only"
                sx={{ color: "#095AD3" }}
                value={Number(viewFeedbackGraph?.averageRating || 0)}
                readOnly
              />
              <div className={`font-normal text-xs`}>
                Based on {viewFeedbackGraph?.averageRating || 0} ratings
              </div>
            </div>
          </div>

          {graph.map((graph, id) => (
            <div
              className="lg:max-w-[60%] xl:max-w-[76%] w-full"
              key={graph.id}
            >
              <div className={`flex gap-4 mt-4 w-80`}>
                <div className={`flex gap-2 w-24`}>
                  <div className={`mt-0`}>{graph.starSharp}</div>
                  <div className="flex gap-x-2">
                    <div className="">{graph.number}</div>
                    <div className="w-96">({`${graph.percentage}%`})</div>
                  </div>
                </div>
                {/* <div className=""> */}
                  {graph.progressbar}
                  {/* </div> */}
                
              
              </div>
            </div>
          ))}
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
              <div className={`mb-4`} key={index}>
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
