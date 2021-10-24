import { css } from "styled-components";

const mediaQueries = (breakpoints) =>
  Object.keys(breakpoints).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}em) {
        ${css(...args)}
      }
    `;

    return acc;
  }, {});

export default mediaQueries;
