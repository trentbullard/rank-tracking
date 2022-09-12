import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

/**
 * @param {string} title
 * @param {Object} action - {component: React.Component, tooltip: string, url: string}
 */
const TitlePageTitle = ({ title, action }) => {
  if (action) {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="row" sx={{ mb: 4 }}>
        <Typography variant="h3">
          {title}
        </Typography>
        <Tooltip title={action.tooltip} placement="top">
          <RouterLink to={action.url}>
            <IconButton aria-label="add" component="span" color="secondary">
              <action.component fontSize="large"/>
            </IconButton>
          </RouterLink>
        </Tooltip>
      </Box>
    );
  } else {
    return (
      <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
        {title}
      </Typography>
    );
  };
};

export default TitlePageTitle;
