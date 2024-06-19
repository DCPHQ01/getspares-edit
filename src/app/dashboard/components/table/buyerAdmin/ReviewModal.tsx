import React from "react";
import { Button, Dialog, DialogTitle, Rating, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { IoClose } from "react-icons/io5";


interface ReviewModalProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

const CustomIconContainer = styled('span')({
    fontSize: '75px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '4px',
});

const ReviewModal: React.FC<ReviewModalProps> = ({ openModal, setOpenModal }) => {

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <Dialog open={openModal} onClose={closeModal}
            sx={{
                '& .MuiDialog-paper': {
                    width: '440px',
                    height: '470px',
                    padding: '7px', 
                }
            }}

        >
            <DialogTitle>
                <div className="flex justify-end gap-6 text-[30px] cursor-pointer">
                <IoClose  onClick={closeModal} />
                </div>
            </DialogTitle>
            <div className={`flex items-center flex-col`}>
                <div className={`mb-4 text-xl`}>Your overall rating for this item?</div>
                <Rating
                    IconContainerComponent={(props) => (
                        <CustomIconContainer {...props} />
                    )}
                    sx={{
                        '& .MuiRating-iconFilled': {
                            color: '#095AD3',
                        },
                        '& .MuiRating-iconEmpty': {
                            color: '#095AD3',
                            fontWeight: "400"
                        },
                    }}
                    defaultValue={0}
                    max={5}
                />
                <div className={`mt-8 mb-6`}>
                    <TextField
                        id="filled-multiline-static"
                        label="Review description"
                        multiline
                        rows={6}
                        defaultValue="Enter review description"
                        variant="filled"
                       
                        sx={{
                            width: '370px',
                            background:'#EEF2F6',
                            
                            '& .MuiInputBase-root': {
                                '&::placeholder': {
                                    color: '#4B5565',
                                    opacity: 1,
                                },
                                
                            },
                        }}
                        InputProps={{
                            disableUnderline: true,
                            inputProps: {
                                style: {
                                    color: 'gray',
                                },
                            },
                        }}

                    />

                </div>
                <div className={`flex justify-between gap-36`}>
                    <button className={`w-[130px] h-[44px] text-[#095AD3] border-[2px] rounded-full border-[#095AD3]`}>Cancel</button>
                    <button onClick={closeModal} className={`w-[130px] h-[44px] text-[#095AD3] text-white rounded-full bg-[#095AD3]`}>Save</button>
                </div>
            </div>
        </Dialog>
    );
};

export default ReviewModal;
