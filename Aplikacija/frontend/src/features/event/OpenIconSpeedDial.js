import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Filter3OutlinedIcon from '@mui/icons-material/Filter3Outlined';
import Filter4OutlinedIcon from '@mui/icons-material/Filter4Outlined';
import Filter5TwoToneIcon from '@mui/icons-material/Filter5TwoTone';

const actions = [
  { icon: <LooksTwoOutlinedIcon />, name: '2 Teams' },
  { icon: <Filter3OutlinedIcon />, name: '3 Teams' },
  { icon: <Filter4OutlinedIcon />, name: '4 Teams' },
  { icon: <Filter5TwoToneIcon />, name: '5 Teams!' },
];

export default function OpenIconSpeedDial({setNooTeams,setMakeTeams}) {
    const handleClick=(ActionName)=>{
        if(ActionName==="2 Teams") {
          setNooTeams(2)
          setMakeTeams(true)
        }
        if(ActionName==="3 Teams"){
          setNooTeams(3)
          setMakeTeams(true)
        }
        if(ActionName==="4 Teams") {
          setNooTeams(4)
          setMakeTeams(true)
        }
        if(ActionName==="5 Teams!")  {
          setNooTeams(5)
          setMakeTeams(true)
        }
    }
  return (
    <Box sx={{ height: 20, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        direction="left"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(e)=>(handleClick(action.name))}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
