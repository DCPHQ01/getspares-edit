import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductReview from "./ProductReview";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface productInformation {
  manufacturer?: string | null;
  brand?: string | null;
  model?: string | null;
  itemWeight?: string | null;
  productDimension?: string | null;
  countryOfOrigin?: string | null;
  itemModelNumber?: string | null;
  manufacturerPartNumber?: string | null;
  voltage?: string | null;
  quantity?: number | null;
  color?: string | null;
}

interface productInformationProps {
  data: productInformation;
}

const DetailsTable = ({ data }: productInformationProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="w-[100%]">
      <Box>
        <CustomTabPanel value={value} index={0}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 2,
              p: 2,
            }}
          >
            <Box
              component="section"
              sx={{ p: 2, border: "shadow", backgroundColor: "#EEF2F6" }}
            >
              <div className="flex flex-col">
                <div>Quantity Available</div>
                <div>{data?.quantity}</div>
              </div>
            </Box>
            <Box
              component="section"
              sx={{ p: 2, border: "shadow", backgroundColor: "#EEF2F6" }}
            >
              <div className="flex flex-col">
                <div>Manufacturer</div>
                <div>{data?.manufacturer}</div>
              </div>
            </Box>
            <Box
              component="section"
              sx={{ p: 2, border: "shadow", backgroundColor: "#EEF2F6" }}
            >
              <div className="flex flex-col">
                <div>Brand</div>
                <div>{data?.brand}</div>
              </div>
            </Box>

            <Box
              component="section"
              sx={{ p: 2, border: "shadow", backgroundColor: "#EEF2F6" }}
            >
              <div className="flex flex-col">
                <div>Model</div>
                <div>{data?.itemModelNumber}</div>
              </div>
            </Box>

            <Box
              component="section"
              sx={{ p: 2, border: "shadow", backgroundColor: "#EEF2F6" }}
            >
              <div className="flex flex-col">
                <div>Color</div>
                <div>{data?.color}</div>
              </div>
            </Box>

            <Box
              component="section"
              sx={{ p: 2, border: "shadow", backgroundColor: "#EEF2F6" }}
            >
              <div className="flex flex-col">
                <div>Weight</div>
                <div>{data?.itemWeight}</div>
              </div>
            </Box>
            <Box
              component="section"
              sx={{ p: 2, border: "shadow", backgroundColor: "#EEF2F6" }}
            >
              <div className="flex flex-col">
                <div>Dimensions</div>
                <div>{data?.productDimension}</div>
              </div>
            </Box>
            <Box
              component="section"
              sx={{ p: 2, border: "shadow", backgroundColor: "#EEF2F6" }}
            >
              <div className="flex flex-col">
                <div>Country of origin</div>
                <div>{data?.countryOfOrigin}</div>
              </div>
            </Box>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ProductReview />
        </CustomTabPanel>
      </Box>
    </div>
  );
};
export default DetailsTable;
