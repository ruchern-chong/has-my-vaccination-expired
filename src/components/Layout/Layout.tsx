import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Footer from '../Footer';
import Header from '../Header';

import theme from '../../theme';

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
  flex-grow: 1;
  padding: 0 16px;
  margin: 0 auto;

  ${theme.media.md`
  padding: 0 24px;
  `}
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
