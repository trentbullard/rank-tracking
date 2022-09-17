import TitlePageBody from './TitlePageBody';
import TitlePageTitle from './TitlePageTitle';

/**
 * @param {string} title
 * @param {Object} action - {component: React.Component, tooltip: string, url: string}
 * @param {React.Component} children
*/
const TitlePageLayout = ({ title, action, children }) => {
  return (
    <TitlePageBody maxWidth="md">
      <TitlePageTitle title={title} action={action} />
      {children}
    </TitlePageBody>
  );
};

export default TitlePageLayout;
