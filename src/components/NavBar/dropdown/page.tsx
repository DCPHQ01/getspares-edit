import Card from "@mui/material/Card";

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
          {categorydropdown.map((categorydrop) => (
            <div
              key={categorydrop.id}
              className="h-96 flex scrollbar-none justify-between p-6 leading-10 gap-x-32 overflow-y-scroll "
            >
              <div className="flex-col">
                <p>{categorydrop.part1}</p>
                <p>{categorydrop.part2}</p>
                <p>{categorydrop.part3}</p>
                <p>{categorydrop.part4}</p>
                <p>{categorydrop.part5}</p>
                <p> {categorydrop.part6}</p>
                <p> {categorydrop.part7}</p>
                <p> {categorydrop.part8}</p>
                <p>{categorydrop.part9}</p>
                <p>{categorydrop.part10}</p>
                <p>{categorydrop.part11}</p>
                <p>{categorydrop.part12}</p>
              </div>
              <div className="flex-col">
                <p>{categorydrop.part1}</p>
                <p>{categorydrop.part2}</p>
                <p>{categorydrop.part3}</p>
                <p>{categorydrop.part4}</p>
                <p>{categorydrop.part5}</p>
                <p> {categorydrop.part6}</p>
                <p> {categorydrop.part7}</p>
                <p> {categorydrop.part8}</p>
                <p>{categorydrop.part9}</p>
                <p>{categorydrop.part10}</p>
                <p>{categorydrop.part11}</p>
                <p>{categorydrop.part12}</p>
              </div>
              <div className="flex-col">
                <p>{categorydrop.part1}</p>
                <p>{categorydrop.part2}</p>
                <p>{categorydrop.part3}</p>
                <p>{categorydrop.part4}</p>
                <p>{categorydrop.part5}</p>
                <p> {categorydrop.part6}</p>
                <p> {categorydrop.part7}</p>
                <p> {categorydrop.part8}</p>
                <p>{categorydrop.part9}</p>
                <p>{categorydrop.part10}</p>
                <p>{categorydrop.part11}</p>
                <p>{categorydrop.part12}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default DropdownPage;
