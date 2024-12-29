/* eslint-disable react/prop-types */

import { Helmet } from "react-helmet-async";

const TitleWrapper = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title} - FoodApp</title>
      </Helmet>
      {children}
    </>
  );
};

export default TitleWrapper;
