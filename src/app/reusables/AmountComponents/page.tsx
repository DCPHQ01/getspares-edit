const AmountComponentsPage: React.FC<{ amount: number }> = ({ amount }) => {
  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  return <div>{formatNumber(amount)}</div>;
};

export default AmountComponentsPage;
