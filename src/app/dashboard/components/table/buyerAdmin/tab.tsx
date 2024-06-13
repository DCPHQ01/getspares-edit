import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='pt-14'>

      <Box sx={{ width: '100%'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Details" sx={{ textTransform: "none", fontSize: "28px"}} {...a11yProps(0)} />
            <Tab label="Reviews" sx={{ textTransform: "none", fontSize: "28px" }} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr', 
                sm: '1fr 1fr',     
                md: '1fr 1fr 1fr', 
              },
              gap: 2,
              p: 2,
            }}
          >
            <Box component="section" sx={{ p: 2, border: 'shadow', backgroundColor: "#EEF2F6" }}>
              <div className='flex flex-col'>
                <div>Quantity Available</div>
                <div>123</div>
              </div>
            </Box>
            <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
              <div className='flex flex-col'>
                <div>Transaction value</div>
                <div>123,000,000,000.00</div>
              </div>
            </Box>
            <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
              <div className='flex flex-col'>
                <div>Last sold</div>
                <div>12/12/23</div>
              </div>
            </Box>
            <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
              <div className='flex flex-col'>
                <div>Color</div>
                <div>Black</div>
              </div>
            </Box>
            <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
              <div className='flex flex-col'>
                <div>Model</div>
                <div>Caterpillar engine v1</div>
              </div>
            </Box>
            <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
              <div className='flex flex-col'>
              <div>Weight</div>
              <div>4000kg</div>
              </div>
            </Box>
            <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
              <div className='flex flex-col'>
                <div>Dimensions</div>
                <div>Medium</div>
              </div>
            </Box>
            <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
              <div className='flex flex-col'>
                <div>Country of originin a week</div>
                <div>Germany</div>
              </div>
            </Box>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          REVIEWS
        </CustomTabPanel>
      </Box>
    </div>
  );
}
