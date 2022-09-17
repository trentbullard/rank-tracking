import { ListItem, ListItemText, Typography } from '@mui/material';

const LeagueDetailsItem = ({ primary, secondary }) => {
  return (
    <ListItem>
      <ListItemText
        primary={primary}
        secondary={
          <Typography component="span" variant="body2" color="textSecondary">
            {secondary}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default LeagueDetailsItem;
