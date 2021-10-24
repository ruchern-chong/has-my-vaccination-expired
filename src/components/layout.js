import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './header';

import 'normalize.css';
import './layout.css';
import 'animate.css';

const Site = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  flex-grow: 1;
  margin: 0 auto;
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Site>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Container>{children}</Container>
      <Footer />
    </Site>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
