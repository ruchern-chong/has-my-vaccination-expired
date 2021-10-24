import React, { FC } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Column, Grid, Row } from '@noblitech/components/src';

import theme from '../../theme';

const StyledHeader = styled.header`
  background: ${theme.colours.primary};
  padding: 16px;
  margin-bottom: 24px;

  ${theme.media.md`
    padding: 24px;
  `}
`;

const StyledTitle = styled.h2`
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

interface Props {
  siteTitle: string;
}

const Header: FC<Props> = ({ siteTitle = '' }) => (
  <StyledHeader>
    <Grid>
      <Row>
        <Column>
          <StyledTitle>
            <StyledLink to="/">{siteTitle}</StyledLink>
          </StyledTitle>
        </Column>
      </Row>
    </Grid>
  </StyledHeader>
);

export default Header;
