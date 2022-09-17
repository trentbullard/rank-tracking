import _ from 'lodash';
import { Paper } from '@mui/material';
import styled from '@emotion/styled';
import FormTitle from './FormTitle';
import FormSection from './FormSection';

const FormPaper = styled(Paper)({
  maxWidth: 480,
  padding: 15,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
});

const FormLayout = ({ children, title }) => {
  return (
    <FormPaper>
      <FormTitle title={title} />
      {_.map(_.castArray(children), (value, index) => {
        return <FormSection key={index}>{value}</FormSection>;
      })}
    </FormPaper>
  );
};

export default FormLayout;
