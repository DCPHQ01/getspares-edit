import { Typography, Button } from "@mui/material";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import { IoStarSharp } from "react-icons/io5";
import ProgressBars from "./progressBars";
import ReviewsModal from "./reviewsModal";

const ProductReviews: React.FC = () => {
    const [value, setValue] = React.useState<number | null>(2);
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const listOfReviews = [
        {
            name: "Femi Chukwuemeka",
            rate: 3,
            description: "Maintenance on this engine is a breeze thanks to its user-friendly design and easy access to components",
            date: "May 15th, 2023",
            time: "12:00",
        },
        {
            name: "Femi Chukwuemeka",
            rate: 3,
            description: "Maintenance on this engine is a breeze thanks to its user-friendly design and easy access to components",
            date: "May 15th, 2023",
            time: "12:00",
        },
    ]

    return (
        <div>
            <div className="flex justify-between p-[2px]">
                <div className="text-xl font-semibold">Feedbacks & Reviews</div>
                <button onClick={handleOpenModal} className="w-[170px] h-[40px] text-[#095AD3] text-white rounded-full bg-[#095AD3]">Give Feedback</button>
            </div>
            <div className="flex gap-16 mt-4">
                <div className="border-gray-300 w-[470px] h-[344px] border bg-[#F8FAFC] rounded-lg p-3">
                    <div className="w-[242px] h-[72px] flex gap-6">
                        <div className="text-6xl font-semibold">5.0</div>
                        <div>
                            <Rating name="read-only" sx={{ color: "#095AD3" }} value={3} readOnly />
                            <div className="font-normal text-xs">Based on 200 ratings</div>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <div className="flex gap-2 w-24">
                            <div className="mt-0"><IoStarSharp color='#095AD3' /></div>
                            <div>5 (50%)</div>
                        </div>
                        <ProgressBars percentage={50} />
                    </div>
                    <div className="flex gap-4 mt-6">
                        <div className="flex gap-2 w-24">
                            <div className="mt-0"><IoStarSharp color='#095AD3' /></div>
                            <div>4 (20%)</div>
                        </div>
                        <ProgressBars percentage={20} />
                    </div>
                    <div className="flex gap-4 mt-6">
                        <div className="flex gap-2 w-24">
                            <div className="mt-0"><IoStarSharp color='#095AD3' /></div>
                            <div>3 (10%)</div>
                        </div>
                        <ProgressBars percentage={10} />
                    </div>
                    <div className="flex gap-4 mt-6">
                        <div className="flex gap-2 w-24">
                            <div className="mt-0"><IoStarSharp color='#095AD3' /></div>
                            <div>2 (15%)</div>
                        </div>
                        <ProgressBars percentage={15} />
                    </div>
                    <div className="flex gap-4 mt-6">
                        <div className="flex gap-2 w-24">
                            <div className="mt-0"><IoStarSharp color='#095AD3' /></div>
                            <div>1 (5%)</div>
                        </div>
                        <ProgressBars percentage={5} />
                    </div>
                </div>
                <div className="w-[600px] h-[436px]">
                    <div className="flex gap-2 mb-4">
                        <Button sx={{ borderRadius: '38px', width: "45px", height: '28px', border: "solid 1px #CDD5DF", color: "black" }} startIcon={<IoStarSharp color='#095AD3' />}>5</Button>
                        <Button sx={{ borderRadius: '38px', width: "45px", height: '28px', border: "solid 1px #CDD5DF", color: "black" }} startIcon={<IoStarSharp color='#095AD3' />}>4</Button>
                        <Button sx={{ borderRadius: '38px', width: "45px", height: '28px', border: "solid 1px #CDD5DF", color: "black" }} startIcon={<IoStarSharp color='#095AD3' />}>3</Button>
                        <Button sx={{ borderRadius: '38px', width: "45px", height: '28px', border: "solid 1px #CDD5DF", color: "black" }} startIcon={<IoStarSharp color='#095AD3' />}>2</Button>
                        <Button sx={{ borderRadius: '38px', width: "45px", height: '28px', border: "solid 1px #CDD5DF", color: "black" }} startIcon={<IoStarSharp color='#095AD3' />}>1</Button>
                    </div>
                    {listOfReviews.map((review, index) => (
                        <div key={index} className="mb-4">
                            <div className="mb-2">
                                <div>{review.name}</div>
                                <Rating name="read-only" sx={{ color: "#095AD3" }} value={review.rate} readOnly />
                            </div>
                            <div className="mb-1.5">{review.description}</div>
                            <div className="text-[#9AA4B2]">{review.date} {review.time}</div>
                        </div>
                    ))}
                </div>
            </div>
            <ReviewsModal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}

export default ProductReviews;