interface IndicatorProps {
  active: boolean;
}

const Indicator: React.FC<IndicatorProps> = ({ active }) => {
  return (
    <svg
      width="32"
      height="6"
      viewBox="0 0 32 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="32"
        height="6"
        rx="3"
        fill={`${active ? "#095AD3" : "#E3E8EF"}`}
      />
    </svg>
  );
};
export default Indicator;
