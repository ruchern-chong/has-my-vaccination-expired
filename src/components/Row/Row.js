import React from "react";
import PropTypes from "prop-types";
import styled, { css, withTheme } from "styled-components";
import theme from "../../theme";

const Row = withTheme(styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
  margin-left: ${(p) => (p.theme.grid.gutterWidth / 2) * -1}rem;
  margin-right: ${(p) => (p.theme.grid.gutterWidth / 2) * -1}rem;
  ${(p) =>
    p.reverse &&
    css`
      flex-direction: row-reverse;
    `};
  ${(p) =>
    p.start &&
    p.theme.media[p.start]`
      justify-content: flex-start;
      text-align: start;
  `};
  ${(p) =>
    p.center &&
    p.theme.media[p.center]`
      justify-content: center;
      text-align: center;
  `};
  ${(p) =>
    p.end &&
    p.theme.media[p.end]`
      justify-content: flex-end;
      text-align: end;
  `};
  ${(p) =>
    p.top &&
    p.theme.media[p.top]`
      align-items: flex-start;
  `};
  ${(p) =>
    p.middle &&
    p.theme.media[p.middle]`
      align-items: center;
  `};
  ${(p) =>
    p.bottom &&
    p.theme.media[p.bottom]`
      align-items: flex-end;
  `};
  ${(p) =>
    p.around &&
    p.theme.media[p.around]`
      justify-content: space-around;
  `};
  ${(p) =>
    p.between &&
    p.theme.media[p.between]`
      justify-content: space-between;
  `};
`);

Row.defaultProps = {
  theme,
};

Row.propTypes = {
  reverse: PropTypes.bool,
  start: PropTypes.oneOf(["sm", "md", "lg"]),
  center: PropTypes.oneOf(["sm", "md", "lg"]),
  end: PropTypes.oneOf(["sm", "md", "lg"]),
  top: PropTypes.oneOf(["sm", "md", "lg"]),
  middle: PropTypes.oneOf(["sm", "md", "lg"]),
  bottom: PropTypes.oneOf(["sm", "md", "lg"]),
  around: PropTypes.oneOf(["sm", "md", "lg"]),
  between: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Row;
