import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

import CampaignIcon from '@mui/icons-material/Campaign';
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';

export default function CustomizedTimeline({time}) {
    //Because it&apos;s awesome!
    const formatTime=(date,timeline)=>{
        let vreme=new Date(date)
        let sati=vreme.getHours()
        let minuti=vreme.getMinutes()
        if(timeline===2){
            minuti+=20
        }
        if(minuti>=60){
            minuti-=60;
            sati++;
        }
        return `${sati}:${minuti} `
    }
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {formatTime(time,1)} pm
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <CampaignIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Starts
          </Typography>
          <Typography>Welcoming our basketball star</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
           {formatTime(time,2)} pm
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <SignLanguageIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Meet up
          </Typography>
          <Typography> You can shake his hand or even get an autograph!</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <SportsHandballIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Have fun
          </Typography>
          <Typography>Doing activities specified above</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          <TimelineDot color="secondary">
            <CameraEnhanceIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            ending
          </Typography>
          <Typography>Take pictures and make long lasting memories!</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
