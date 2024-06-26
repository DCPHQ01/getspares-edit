import Card from "@mui/material/Card";
import { useGetCategoryQuery } from "../../../redux/features/users/authQuery";

const categorydropdown = [
  {
    id: 1,
    part1: "AC",
    part2: "Air Filters",
    part3: "Air Flow Meters",
    part4: "Alternators",
    part5: "Axles",
    part6: "Back Mirrors",
    part7: "Ball Joints",
    part8: "Batteries",
    part9: "Bonnets",
    part10: "Tractor Parts",
    part11: "Brakes",
    part12: "Bulldozer Parts",
  },
];

const DropdownPage = () => {
  const { data: getCategoriesData } = useGetCategoryQuery({});
  console.log("buyers category  ", getCategoriesData);

  return (
    <div className="">
      <div>
        <Card
          className="w-full  "
          style={{
            boxShadow: "0px 2px 8px 0px #63636333",
            zIndex: 200,
          }}
        >
          {getCategoriesData?.data.map((category:any) => (
            <div>
              {category.name}
            </div>
              // <div className="h-96 flex scrollbar-none justify-between p-6 leading-10 gap-x-32 overflow-y-scroll ">
              //   <div className="flex-col">
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p> {category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p> {category.name}</p>
              //   </div>
              //   <div className="flex-col">
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p> {category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p> {category.name}</p>
              //   </div>
              //   <div className="flex-col">
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p> {category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p>{category.name}</p>
              //     <p> {category.name}</p>
              //   </div>
              // </div>
            )
          )}
        </Card>
      </div>
    </div>
  );
};

export default DropdownPage;
