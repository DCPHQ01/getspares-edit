"use client";

import React, { useState } from "react";
import { Button, Dialog, DialogTitle, Rating, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoClose } from "react-icons/io5";
import { useCreateFeedbackMutation } from "../../../../../redux/features/feedback/feedbackQuery";

interface ReviewModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const CustomIconContainer = styled("span")({
  fontSize: "75px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "4px",
});

const ReviewModal: React.FC<ReviewModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const closeModal = () => {
    setOpenModal(false);
  };


  const [formData, setFormData] = useState({
    description: "",
    rating: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [feedBackPostReview] = useCreateFeedbackMutation();

  const handleSubmit = async () => {
    try {
      const res = await feedBackPostReview({
        comment: formData.description,
        orderId: "66770091d36d2c0f4f2a2569",
        productId: "666877a5b48207256da90429",
        rating: 0
      }).unwrap();
      closeModal();
      if ("data" in res) {
        console.log("create comment", res.data.data);
      }
    } catch (error) {}
  };

  return (
    <Dialog
      open={openModal}
      onClose={closeModal}
      sx={{
        "& .MuiDialog-paper": {
          width: "440px",
          height: "470px",
          padding: "7px",
        },
      }}
    >
      <DialogTitle>
        <div className="flex justify-end gap-6 text-[30px] cursor-pointer">
          <IoClose onClick={closeModal} />
        </div>
      </DialogTitle>
      <div className={`flex items-center flex-col`}>
        <div className={`mb-4 text-xl`}>Your overall rating for this item?</div>
        <Rating
          IconContainerComponent={(props) => <CustomIconContainer {...props} />}
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#095AD3",
            },
            "& .MuiRating-iconEmpty": {
              color: "#095AD3",
              fontWeight: "400",
            },
          }}
          defaultValue={0}
          value={formData.rating}
          onChange={(e: any) =>
            setFormData({ ...formData, rating: e.target.value })
          }
          max={5}
        />
        <div className={`mt-8 mb-6`}>
          <TextField
            id="description"
            label="Description"
            name="description"
            multiline
            rows={6}
            defaultValue="Enter review description"
            variant="filled"
            sx={{
              width: "370px",
              background: "#EEF2F6",

              "& .MuiInputBase-root": {
                "&::placeholder": {
                  color: "#4B5565",
                  opacity: 1,
                },
              },
            }}
            InputProps={{
              disableUnderline: true,
              inputProps: {
                style: {
                  color: "gray",
                },
              },
            }}
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <div className={`flex justify-between gap-36`}>
          <button
            className={`w-[130px] h-[44px] text-[#095AD3] border-[2px] rounded-full border-[#095AD3]`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`w-[130px] h-[44px] text-[#095AD3] text-white rounded-full bg-[#095AD3]`}
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
