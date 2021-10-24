import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import defaultTheme from "../../theme";

const Grid = styled.div`
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ theme }) => theme.grid.outerMargin / 2}rem;
  padding-right: ${({ theme }) => theme.grid.outerMargin / 2}rem;

  ${({ fluid, theme }) =>
    fluid &&
    css`
      padding-left: ${theme.grid.outerMargin}rem;
      padding-right: ${theme.grid.outerMargin}rem;
    `};

  ${({ fluid, theme }) =>
    !fluid &&
    css`
      ${["md", "lg"].map(
        (viewport) =>
          theme.media[viewport]`
            width: ${theme.grid.container[viewport]}rem;
          `
      )};
    `};
`;

Grid.defaultProps = {
  theme: defaultTheme,
};

Grid.propTypes = {
  fluid: PropTypes.bool,
};

export default Grid;
