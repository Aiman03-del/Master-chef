/* eslint-disable react/prop-types */

import { Helmet } from "react-helmet-async";

const TitleWrapper = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title} - Master Chef</title>
      </Helmet>
      {children}
    </>
  );
};

export default TitleWrapper;
