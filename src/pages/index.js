import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import VaccinationStatus from '../components/VaccinationStatus';

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Am I Still Vaccinated?" />
      <VaccinationStatus />
    </Layout>
  );
};

export default IndexPage;
