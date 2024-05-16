import Card from "@mui/material/Card";

const DropdownPage = () => {
  return (
    <div>
      <Card
        className="w-full  "
        style={{
          boxShadow: "0px 2px 8px 0px #63636333",
          zIndex: 200,
        }}
      >
        <div className="h-96 flex justify-between p-6 leading-10 gap-x-32 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar ">
          <div className="">
            <p>AC</p>
            <p>Air Filters</p>
            <p>Air Flow Meters</p>
            <p>Alternators</p>
            <p>Axles</p>
            <p>Back Mirrors</p>
            <p>Ball Joints</p>
            <p>Batteries</p>
            <p>Bonnets</p>
            <p>Tractor Parts</p>
            <p>Brakes</p>
            <p>Bulldozer Parts</p>
          </div>
          <div className="">
            <p>AC</p>
            <p>Air Filters</p>
            <p>Air Flow Meters</p>
            <p>Alternators</p>
            <p>Axles</p>
            <p>Back Mirrors</p>
            <p>Ball Joints</p>
            <p>Batteries</p>
            <p>Bonnets</p>
            <p>Brain Boxes</p>
            <p>Brakes</p>
            <p>Bumpers</p>
          </div>
          <div className="">
            <p>AC</p>
            <p>Air Filters</p>
            <p>Air Flow Meters</p>
            <p>Alternators</p>
            <p>Axles</p>
            <p>Back Mirrors</p>
            <p>Ball Joints</p>
            <p>Batteries</p>
            <p>Bonnets</p>
            <p>Brain Boxes</p>
            <p>Brakes</p>
            <p>Bumpers</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DropdownPage;
