import { FormControl, Grid, Input, InputAdornment, InputLabel, Paper, Typography } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect } from 'react'
import Snackbar from '../../modules/components/Snackbar';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import * as NBAIcons from 'react-nba-logos';

const SearchPlayers = ({starPlayerId,setStarPlayerId,EventSpecial,setTeamAbbrevation}) => {
    const [open,setOpen]=React.useState(false)
    const [showAccordion,setShowAccordion]=React.useState(false)

    const [playerName,setPlayerName]=React.useState('');
    const [basicStats,setBasicStats]=React.useState({})
    //const [starPlayerId,setStarPlayerId]=React.useState('')
    const [playerStats,setPlayerStats]=React.useState({});
  let abbr;
    useEffect(()=>{
      if(EventSpecial)
        gotPlayerId()
    },[])

    const gotPlayerId = () => {
      console.log(starPlayerId)
      fetch(`https://www.balldontlie.io/api/v1/players/${starPlayerId}`,{
          method: 'GET',
          headers:  {'Content-Type': 'application/json'},
        }).then((response)=> response.json())
        .then((PlayerStats)=>{
          console.log(PlayerStats)
          if(PlayerStats?.length > 1)
              setOpen(true)    
          else{
              console.log(PlayerStats)
              if(typeof setTeamAbbrevation ==='function'){
                setTeamAbbrevation(PlayerStats?.team?.abbreviation)
                console.log('uso sam u seter abbrevation:',PlayerStats?.team?.abbreviation)
              }
              //setStarPlayerId(PlayerStats?.id)
              setBasicStats(PlayerStats)
              getPlayerStats(PlayerStats?.id)
          }
      }) 
        .catch(error=>console.log(error))
  }

    const getPlayerId = () => {
      
        fetch(`https://www.balldontlie.io/api/v1/players?search=${playerName}`,{
            method: 'GET',
            headers:  {'Content-Type': 'application/json'},
          }).then((response)=> response.json())
          .then((PlayerStats)=>{
            if(PlayerStats?.data.length > 1)
                setOpen(true)    
            else{
                console.log(PlayerStats?.data[0])
                setStarPlayerId(PlayerStats?.data[0]?.id)
                setBasicStats(PlayerStats?.data[0])
                
                
               console.log(PlayerStats?.data[0]?.team?.abbreviation)
               abbr=PlayerStats?.data[0]?.team?.abbreviation;
               getPlayerStats(PlayerStats?.data[0]?.id)
            }
        }) 
          .catch(error=>console.log(error))
    }

    const getPlayerStats = (playerId) => {
        fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${starPlayerId}`,{
            method: 'GET',
            headers:  {'Content-Type': 'application/json'},
          }).then((response)=> response.json())
          .then((SeasonAvg)=>{
            setPlayerStats(SeasonAvg?.data[0]) //dvaput mora kliknes
            if(playerStats) 
                setShowAccordion(true)
            console.log(SeasonAvg?.data[0])
          })
          .catch(error=>console.log(error))
    }
    
    const handleSubmit=()=>{
        console.log(playerName)
        console.log(starPlayerId)
        getPlayerId();
        //getPlayerStats();
    }
    
    const handleChange1=(e)=>{
        const replace=e.target.value.split(" ").join("_"); //svaki space replacujemo sa _
        setPlayerName(replace)
        if(!e.target.value)
            setShowAccordion(false)
    }


    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) =>setExpanded(isExpanded ? panel : false);
    
    function ControlledAccordions() {
       // EventSpecial=null;
        return (
          <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Overview
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>General informaiton about the player</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  First_name: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'25px'}}>{basicStats?.first_name}</span>
                  Last_name:<span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'25px'}}>{basicStats?.last_name}</span>
                  Position:  <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'25px'}}>{basicStats?.position}</span>
                  Team_name: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'25px'}}>{basicStats?.team?.full_name}</span>
                  Injures: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'25px'}}>None</span>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Statistics</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Latest stats from the last season
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  games_played: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{playerStats?.games_played}</span>
                  minutes_played: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{playerStats?.min}</span>
                  points_averaged: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{playerStats?.pts}</span>
                  rebounds_averaged: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{playerStats?.reb}</span>
                  assists_averaged: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{playerStats?.ast}</span>
                  steals: <span style={{fontFamily:'Rockwell',marginLeft:'0px',marginRight:'20px'}}>{playerStats?.stl}</span>
                  blocks_averaged: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{playerStats?.blk}</span>
                  3_pt_field_goal_pct: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{playerStats?.fg3_pct}%</span>
                  free_throw-pct: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{playerStats?.ft_pct}%</span>
                  current_season: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{playerStats?.season}</span>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Current team: 
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  The current team he/she is playing in 2021/2022 season 
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  abbreviation: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'25px'}}>{basicStats?.team?.abbreviation}</span>
                  city: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'25px'}}>{basicStats?.team?.city}</span>
                  conference: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'25px'}}>{basicStats?.team?.conference}</span>
                  division: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'25px'}}>{basicStats?.team?.division}</span>
                  full_name: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'25px'}}>{basicStats?.team?.full_name}</span>
                  name: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'25px'}}>{basicStats?.team?.name}</span>
                  
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  First_name:  <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{basicStats?.first_name}</span>   
                  Last_name:  <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{basicStats?.last_name}</span>
                  Height:   <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{ (basicStats?.height_feet * 30.54 + basicStats?.height_inches *2.54) } cm</span> 
                  Weight: <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{basicStats?.weight_pounds/ 2}kg</span>
                  Height(US):   <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{basicStats?.height_feet} feet,{basicStats?.height_inches} inches</span> 
                  Weight(US): <span style={{fontFamily:'Rockwell',marginLeft:'5px',marginRight:'20px'}}>{basicStats?.weight_pounds}pounds</span>
                  
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      }

  return (<>
    
    {EventSpecial==null?
      <>
      <Typography>Search the player for validation  <ArrowDownwardIcon fontSize='small'/></Typography>
      <Grid container sx={{display:'flex',justifyContent:'space-between'}}>
          
          <Grid item xs={12} md={6}> 
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel >Basketball Star</InputLabel>
                  <Input 
                      sx={{fontSize:'20px'}}
                      startAdornment={<InputAdornment position="start"><StarOutlineIcon sx={{color:'#ffc13c'}}/></InputAdornment>} 
                      value={playerName}
                      onChange={(e)=>handleChange1(e)}
                  />

              </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
          <Button 
              variant="outlined" 
              sx={{ m: 2 }} 
              endIcon={<SendIcon />}
              onClick={()=>handleSubmit()}
              align='center'
          >
              Confirm
          </Button>
          </Grid>
          
      </Grid>
      </>
      :
      null
    }
    
    {showAccordion===true || EventSpecial?ControlledAccordions():null}
    {EventSpecial?null:<Typography variant="caption" color="#c6e1f2"> Make sure you write fullname</Typography>}
    <Snackbar
        open={open}
        closeFunc={()=>setOpen(false)}
        message={'Please specify the name more!'}
    />
    
    </>

    
  )
}

export default SearchPlayers