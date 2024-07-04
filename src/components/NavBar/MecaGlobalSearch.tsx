import {AppBar, Autocomplete, TextField, Toolbar} from "@mui/material";
import React, {useState} from "react";


const MecaGlobalSearch = () => {

   const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);

   const top100Films =[
      { title: "The Shawshank Redemption", year: 1994 },
      { title: "The Godfather", year: 1972 },
      { title: "The Godfather: Part II", year: 1974 },
      { title: "The Dark Knight", year: 2008 },
      { title: "12 Angry Men", year: 1957 },
      { title: "Schindler's List", year: 1993 },
      { title: "Pulp Fiction", year: 1994 },
   ]

   return (
      <>
         {/*<AppBar>*/}
         {/*   <Toolbar>*/}
         {/*      <MecaGlobalSearch/>*/}
         {/*   </Toolbar>*/}
         {/*</AppBar>*/}
         <Autocomplete
            id="filter-demo"
            options={top100Films}
            getOptionLabel={option => option.title}
            style={{ width: 300 }}
            open={true}
            // This will close the autocomplete on empty text
            // Will collapse on select
            onInputChange={(event, value, reason) => {
               switch(reason) {
                  case 'input':
                     setAutoCompleteOpen(!!value);
                     break;
                  case 'reset':
                  case 'clear':
                     setAutoCompleteOpen(false);
                     break;
                  default:
                     console.log(reason);
               };
            }}
            renderInput={params => (
               <TextField
                  {...params}
                  label="Search"
                  variant="outlined"
               />
            )}
         />
      </>
   )


}



export default MecaGlobalSearch
