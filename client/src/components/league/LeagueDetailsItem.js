import { ListItem, ListItemText } from '@mui/material';

const LeagueDetailsItem = ({ primary, secondary }) => {
  return (
    <ListItem>
      <ListItemText
        primary={primary}
        secondary={secondary}
      />
    </ListItem>
  );
};

export default LeagueDetailsItem;
