import * as React from 'react';
import { Alert as MuiAlert, Snackbar as MuiSnackbar, Stack } from '@mui/material';
import { FlashContext } from '../../contexts/FlashContext';

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar = () => {
  const { flashList, removeFlash } = React.useContext(FlashContext);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(flashList.length > 0);
  }, [flashList]);

  const dismiss = (index, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    removeFlash(index);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {flashList.map((flash, index) => (
        <MuiSnackbar open={open} autoHideDuration={3000} onClose={(e, reason) => dismiss(index, reason)} key={`snackbar-${index}`}>
          <Alert onClose={(e, reason) => dismiss(index, reason)} severity={flash.type} sx={{ width: '100%' }}>
            {flash.message}
          </Alert>
        </MuiSnackbar>
      ))}
    </Stack>
  );
};

export default Snackbar;
