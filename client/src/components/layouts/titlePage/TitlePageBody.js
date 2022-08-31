import { Box } from '@mui/material';
import styled from '@emotion/styled';

/**
 * a react Box component styled with:
 * display: flex;
 * justify-content: space-between;
 * align-items: center;
 * flex-direction: column;
 * paddingTop: 1em;
 * margin: auto;
 * maxWidth: md;
 */
export default styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: "1em",
  margin: "auto",
  gap: "5rem",
});
