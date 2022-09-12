import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const FormTitle = ({ title }) => {
  return (
    <HeadingStyle component={motion.div} {...fadeInUp}>
      <Typography variant="h4" sx={{ color: "text.secondary", mb: 4 }}>
        {title}
      </Typography>
    </HeadingStyle>
  );
};

export default FormTitle;
