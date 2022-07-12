import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';  
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Chart from 'chart.js/auto'; 

export const Events = ({events}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const ThisYear=()=>{
    let aug10=1,aug11=1,aug12=1,aug13=1,aug14=1,aug15=1,aug16=1;  //eto za jedan vise da bude lepse
    events?.map(event=>{
      const date=event?.activityDateTime.slice(0,10)
      
      if(date==="2022-07-10") aug10++; //radi
      else if(date==="2022-07-11") aug11++;
      else if(date==="2022-07-12") aug12++;
      else if(date==="2022-07-13") aug13++;
      else if(date==="2022-07-14") aug14++;
      else if(date==="2022-07-15") aug15++;
      else if(date==="2022-07-16") aug16++;
    })
    return [aug10,aug11,aug12,aug13,aug14,aug15,aug16]
  }
  const LastYear=()=>{
    let aug10=1,aug11=1,aug12=1,aug13=1,aug14=1,aug15=1,aug16=1;
    events?.map(event=>{
      const date=event?.activityDateTime.slice(0,10)
      console.log(date)
      if(date==="2021-07-10") aug10++; //radi
      else if(date==="2021-07-11") aug11++;
      else if(date==="2021-07-12") aug12++;
      else if(date==="2021-07-13") aug13++;
      else if(date==="2021-07-14") aug14++;
      else if(date==="2021-07-15") aug15++;
      else if(date==="2021-07-16") aug16++;
    })
    return [aug10,aug11,aug12,aug13,aug14,aug15,aug16]
  }

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: ThisYear(), //ovde ide plave linije 
        label: 'This year',
        maxBarThickness: 10,
      },
      {
        backgroundColor: '#EEEEEE',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: LastYear(), //ovde idu sive line 
        label: 'Last year',
        maxBarThickness: 10
      }
    ],
    labels: ['10 July', '11 July', '12 July', '13 July', '14 July', '15 July', '16 July']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const handleClick=()=>{

  }
  return (
    <Card >
      <CardHeader
        action={(
          <Tooltip title="Rounding off the first 7 days" arrow>
          <Button
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
            First 7 days
          </Button>
          </Tooltip>
        )}
        title="All Events"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          aria-describedby={2}
          color="primary"
          endIcon={<ArrowDropDownIcon fontSize="small" />}
          size="small"
          onClick={(event)=> setAnchorEl(event.currentTarget)}
        >
          Overview
        </Button>
        <Popover
          id={2}
          open={open}
          anchorEl={anchorEl}
          onClose={()=>setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>This graph shows the difference between making events this week and last year same week</Typography>
      </Popover>
      </Box>
    </Card>
  );
};
