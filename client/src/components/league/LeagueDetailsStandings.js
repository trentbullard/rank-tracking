import _ from 'lodash';
import * as React from 'react';
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LeagueDetailsStandings = ({ standings }) => {
  const [standingsOpen, setStandingsOpen] = React.useState(false);

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end" onClick={() => setStandingsOpen(!standingsOpen)}>
            {standingsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      >
        <ListItemText
          primary="Standings"
          secondary="latest season"
        />
      </ListItem>
      <Collapse in={standingsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {_.map(standings, (standing, index) => {
            return (
              <ListItemButton
                role="link"
                sx={{ pl: 4 }}
                onClick={() => {}}
                key={`standing-${index}`}
              >
                <ListItemText primary={standing.team} secondary={standing.points} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default LeagueDetailsStandings;
