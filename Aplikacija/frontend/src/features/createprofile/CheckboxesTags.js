import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CheckboxesTags = ({specialties,setSpecialties}) => {
    const postavi=(listObj)=>{
      let specialtiesString=''
      if(listObj!=null)
      {
        listObj.map(Obj=>{
          specialtiesString+=Obj.props.label+','
        })
        setSpecialties(specialtiesString.slice(0,-1))
      }
    }
    return (
      <Autocomplete
       
        multiple
        id="checkboxes-tags-demo"
        options={specijalnosti}
        disableCloseOnSelect
        getOptionLabel={(option) => option.tekst}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
             
            />
            {option.tekst}
          </li>
        )}
        style={{ maxWidth: 800, backgroundColor: "#fafafa" }}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Specialties" 
            placeholder="more?"
            onClick={(e)=>postavi(params.InputProps.startAdornment)}
          />
        )}
      />
    );
  }

  export default CheckboxesTags;

  const specijalnosti = [
    { tekst: '1 - Point guard'},
    { tekst: '2 - Shooting guard' },
    { tekst: '3 - Small forward' },
    { tekst: '4 - Power forward' },
    { tekst: '5 - Center' },
    { tekst: 'Beginner' },
    { tekst: 'Intermediate' },
    { tekst: 'Advanced' },
    { tekst: 'Professional' },
    { tekst: '1 VS 1' },
    { tekst: '3 VS 3' },
    { tekst: '5 VS 5' },
    { tekst: 'Shooting' },
    { tekst: 'Dribbling' },
    { tekst: 'Defense' },
    { tekst: 'Rebounding' },
    { tekst: 'Passing' },
    { tekst: '50 - 70 kg' },
    { tekst: '70 - 90 kg' },
    { tekst: '160 - 180 cm' },
    { tekst: '180 - 200 cm'},
    { tekst: '200 - 220 cm' },
  ];