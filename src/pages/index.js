import React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import VaccinationStatus from "../components/VaccinationStatus";

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Am I Still Vaccinated?" />
      <VaccinationStatus />
    </Layout>
  );
};

export default IndexPage;
