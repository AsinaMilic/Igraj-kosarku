import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../features/language/languageSlice';
let j
//import withRoot from '../../modules/withRoot'; 

const SelectFieldGroup = ({type,setType}) => {
     j=useSelector(selectLanguage);
     let labela= j==='e'?'Search by type':'Pretrazi po tipu'
    const field = {
        name:"ime",
        value:11, //??
        label:labela,
        sportList: ["All types","Casual","1 vs 1","2 vs 2","3 vs 3", "5 vs 5", "Training", "Competition", "Something else..."]
    }
    return(
        <FormControl fullWidth={true} variant="outlined" margin="normal" > 
            <InputLabel color="warning">{field.label}</InputLabel>
            <Select
                label={field.label}
                value={type}
                error={field.error ? true : false}
                onChange={(e)=>setType(e.target.value)}
                
            >

            {field.sportList.map(sport => {
                return <MenuItem key={sport} value={sport}>{sport}</MenuItem>
            })}
            </Select>
            {/*<FormHelperText error>{field.error}</FormHelperText>*/}
      </FormControl>
    );
};

export default (SelectFieldGroup);