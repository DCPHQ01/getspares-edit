import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductReviews from './Review/productReviews';

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

interface BasicProps {
  productInformation: {
    quantity?:string,
    manufacturerPartNumber?:string,
    manufacturer?:string,
    model?:string,
    itemModelNumber?:string,
    color?:string,
    itemWeight?:string,
    productDimension?:string,
    countryOfOrigin?:string
  }
}

const BasicTabs : React.FC<BasicProps> = ({productInformation}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
     <>
       <Box sx={{ width: '100%' }}>
         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
           <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
             <Tab label="Details" sx={{ textTransform: "none" }} {...a11yProps(0)} />
             <Tab label="Reviews" sx={{ textTransform: "none" }} {...a11yProps(1)} />
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
                 <div className=' font-thin'>Quantity available</div>
                 <div>{productInformation?.quantity || 'Not specified'}</div>
               </div>
             </Box>
             <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
               <div className='flex flex-col'>
                 <div className=' font-thin'>Manufacturer part number</div>
                 <div>{productInformation?.manufacturerPartNumber || 'Not specified'}</div>
               </div>
             </Box>
             <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
               <div className='flex flex-col'>
                 <div className=' font-thin'>Brand</div>
                 <div>{productInformation?.manufacturer || 'Not specified'}</div>
               </div>
             </Box>
             <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
               <div className='flex flex-col'>
                 <div className=' font-thin'>Model</div>
                 <div>{productInformation?.model} {productInformation?.itemModelNumber}</div>
               </div>
             </Box>
             <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
               <div className='flex flex-col'>
                 <div className=' font-thin'>Color</div>
                 <div>{productInformation?.color || 'Not specified'}</div>
               </div>
             </Box>
             <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
               <div className='flex flex-col'>
                 <div className=' font-thin'>Weight</div>
                 <div>{productInformation?.itemWeight || 'Not specified'}</div>
               </div>
             </Box>
             <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
               <div className='flex flex-col'>
                 <div className=' font-thin'>Dimension</div>
                 <div>{productInformation?.productDimension || 'Not specified'}</div>
               </div>
             </Box>
             <Box component="section" sx={{ p: 2,  border: 'shadow', backgroundColor: "#EEF2F6" }}>
               <div className='flex flex-col'>
                 <div className=' font-thin'>Country of origin</div>
                 <div>{productInformation?.countryOfOrigin || 'Not specified'}</div>
               </div>
             </Box>
           </Box>
         </CustomTabPanel>
         <CustomTabPanel value={value} index={1}>
           <ProductReviews/>
         </CustomTabPanel>
       </Box>
     </>
  );
}


export default BasicTabs;
