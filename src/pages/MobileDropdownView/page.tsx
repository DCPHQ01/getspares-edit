// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { MdChevronLeft, MdClear } from "react-icons/md";

// import NavBar from "../../components/NavBar/NavBar";
// import { useGetCategoryQuery } from "../../redux/features/users/authQuery";
// import { paths } from "../../path/paths";

// const MobileDropdownViewPage = () => {
//   const router = useRouter();
  
//   const [open, setOpen] = useState(false);
//   const handleNav = () => {
//     setOpen(!open);
//   };
//   // useEffect(() => setOpen(true), []);

//   const { data: getMobileCategoriesData } = useGetCategoryQuery({});
//   console.log("buyers category  ", getMobileCategoriesData);
//   const handleProductDescrip = (categoryName: string) => {
//     router.push(paths.toCategoryProducts(categoryName));
//   };

//   return (
//     <div>
     
//     </div>
//   );
// };

// export default MobileDropdownViewPage;
