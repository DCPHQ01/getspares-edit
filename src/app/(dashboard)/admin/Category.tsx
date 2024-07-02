import React, {useRef, useState, useEffect} from "react";
import Header from "../../dashboard/components/ui/header";
import Avatar from "@mui/material/Avatar";
import SearchBox from "../../dashboard/components/ui/searchbox";
import PeriodRadios from "../../dashboard/components/ui/periodradios";
import AddButton from "../../dashboard/components/ui/addbutton";
import CategoryTable from "../../dashboard/components/table/mecaadmin/categoryTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
    useGetViewAllMecaAdminCategoryQuery,
    useAddCategoryMutation,
} from "../../../redux/features/dashboard/mecaAdminQuery";
import {
    MdAdd,
    MdChevronRight,
    MdClose,
    MdPhotoLibrary,
    MdChevronLeft,
} from "react-icons/md";
import {TextField} from "@mui/material";
import {ColorRing} from "react-loader-spinner";
import {uploadImage} from "../../../components/utils";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

interface Category {
    id: string;
    name: string;
    imageUrl: string;
    productsInCategory: number;
    createdBy: string;
    dateCreated: string;
    email: string;
    option: string;
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "20px",
    p: 4,
};

function Category() {
    const [activityPeriod, setActivityPeriod] = useState("month");
    const [page, setPage] = useState(0);
    const size = 10;
    const [totalElements, setTotalElements] = useState(0);
    const [first, setFirst] = useState(false);
    const [last, setLast] = useState(false);
    const {data, isError, refetch} = useGetViewAllMecaAdminCategoryQuery({
        page: page,
        size: size,
        options: activityPeriod,
    });
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [open, setOpen] = useState(false);
    const [formImage, setFormImage] = useState<string>("");
    const [categoryName, setCategoryName] = useState<string>("");
    const [image_url, setImage_url] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [categoryData, {isLoading}] = useAddCategoryMutation();
    const [error, setError] = useState<string>("");

    console.log("activityPeriod", activityPeriod);
    console.log("data", data);

    useEffect(() => {
        if (data && Array.isArray(data.data.content)) {
            const list = data.data.content;
            const lists = data.data;
            setCategoryList(list);
            setFirst(lists.first);
            setLast(lists.last);
            setTotalElements(lists.totalElements);
        }
    }, [data]);

    const handleOpen = () => {
        setErrorMessage("");
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetModal();
    };

    const resetModal = () => {
        setCategoryName("");
        setFormImage("");
        setImage_url("");
        setErrorMessage("");
    };

    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormImage(reader.result as string);
            };
            await uploadImage(file, setImage_url);

            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const lowerCaseCategoryName = categoryName.toLowerCase();
        if (categoryList.some((category) => category.name.toLowerCase() === lowerCaseCategoryName)) {
            setErrorMessage("Category name already exists.");
            return;
        }
        try {
            const response = await categoryData({
                name: categoryName,
                image: image_url,
            }).unwrap();
            if ("data" in response) {
                console.log(response.data.data);
                setCategoryList((prev) => [response.data.data, ...prev]);
                refetch();
                handleClose();
            }
        } catch (error: any) {
            console.log(error);
            setError(error.data.message);
        }
    };

    const handlePeriodChange = () => {
        setActivityPeriod((prevValue) => (prevValue === 'month' ? 'year' : 'month'));
    };

    const handleNextPage = () => {
        if (!last) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (!first) {
            setPage((prevPage) => prevPage - 1);
        }
    };
    const handleFocus = () => {
        setError("");
    };

    return (
        <>
            <div
                className="mb-[1.25rem] flex justify-between items-center"
                id="cateParentDiv"
            >
                <div>
                    <Header
                        subtitle="Keep track of categories and their products"
                        title="Category"
                        amount={totalElements}
                    />
                </div>

                <button
                    id="addButton"
                    onClick={handleOpen}
                    className="bg-[#095AD3] lg:w-[15%] w-[100%] text-white rounded-full py-[0.38rem] px-[1.5rem]"
                >
                    <div className="flex text-white items-center justify-center">
                        <MdAdd size={20} className="mr-1"/>
                        <span>Create</span>
                    </div>
                </button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="flex justify-between" id="createCategory">
                            <div>
                                <p className="text-lg font-semibold">Create category</p>
                                <p className="text-sm text-mecaGrayBodyText">
                                    Create category for your product items
                                </p>
                            </div>
                            <MdClose
                                className="text-2xl cursor-pointer"
                                onClick={handleClose}
                            />
                        </div>

                        <div className="h-[283px] w-[316px] pt-6" id="createCollection">
                            <input
                                title="image inputs"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="hidden"
                                onFocus={handleFocus}
                            />

                            {formImage ? (
                                <div className="w-20 h-20 m-auto" id="imgDiv">
                                    <img
                                        src={formImage}
                                        alt="Uploaded"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            ) : (
                                <div
                                    id="prevImgState"
                                    onClick={handleImageClick}
                                    className="w-full px-3 py-2 border rounded-md flex flex-col items-center justify-center cursor-pointer"
                                >
                                    <MdPhotoLibrary className="text-gray-600 text-7xl"/>
                                    {/* <Avatar {...stringAvatar('Moyin Tola')}/> */}
                                </div>
                            )}

                            <div className="text-gray-600 text-base mt-2 text-center">
                                <p className="font-bold">Add image</p>
                                <p className="font-normal">by clicking or drag and drop</p>
                            </div>

                            <TextField
                                required
                                id="filled-basic"
                                label="Category name"
                                variant="filled"
                                type="text"
                                name="categoryName"
                                placeholder="Enter name"
                                InputProps={{disableUnderline: true}}
                                className="w-[21rem] mt-10"
                                value={categoryName}
                                onFocus={handleFocus}
                                onChange={(e) => setCategoryName(e.target.value)}
                                sx={{backgroundColor: "porcelain", marginTop: "1rem"}}
                            />

                            {errorMessage && (
                                <Typography
                                    color="error"
                                    className="mt-2 text-center"
                                    id="errorMessage"
                                >
                                    {errorMessage}
                                </Typography>
                            )}

                            <button
                                id="addButton123"
                                onClick={handleSubmit}
                                className="bg-[#095AD3] flex justify-center items-center mt-8 w-[21rem] text-white rounded-full py-[0.38rem] px-[1.5rem]"
                            >
                                {isLoading ? (
                                    <ColorRing
                                        visible
                                        height="40"
                                        width="40"
                                        ariaLabel="color-ring-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="color-ring-wrapper"
                                        colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
                                    />
                                ) : (
                                    <div
                                        className="flex text-white items-center justify-center"
                                        id="addCategory123"
                                    >
                                        Create category
                                    </div>
                                )}
                            </button>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    </Box>
                </Modal>
            </div>

            <div
                className="flex flex-row-reverse justify-between items-center mb-[1.25rem]"
                id="searchBox"
            >
                <SearchBox placeholder="Search"/>
                <PeriodRadios
                    activityPeriod={activityPeriod}
                    onPeriodChange={handlePeriodChange}
                />
            </div>

            <CategoryTable categoryList={categoryList} isLoading={isLoading}/>

            <div className="flex gap-[89%] md:gap-[85%] mt-10 text-mecaBluePrimaryColor font-bold text-lg">
                <button
                    className={`flex gap-x-2  ${
                        first ? "text-gray-400 cursor-not-allowed" : ""
                    }`}
                    onClick={handlePreviousPage}
                    disabled={first}
                >
                    <MdChevronLeft className="mt-1 text-2xl"/> <span>Previous</span>
                </button>
                <button
                    className={`flex gap-x-2  ${
                        last ? "text-gray-400 cursor-not-allowed" : ""
                    }`}
                    onClick={handleNextPage}
                    disabled={last}
                >
                    Next
                    <span>
            <MdChevronRight className="mt-[2px] text-2xl"/>{" "}
          </span>
                </button>
            </div>
        </>
    );
}

export default Category;
