import { Box } from '@mui/material';
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

const AnimatedBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const FormSection = ({ children }) => {
  return (
    <AnimatedBox component={motion.div} {...fadeInUp}>
      {children}
    </AnimatedBox>
  );
};

export default FormSection;
