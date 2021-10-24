import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import theme from "../../theme";

const isNumber = (val) => val === parseInt(val, 10);

const getColumnWidthFromProps = (props) =>
  Object.keys(props)
    .filter((key) => ["sm", "md", "lg"].includes(key))
    .map((viewport) => {
      if (isNumber(props[viewport])) {
        return props.theme.media[viewport]`
          display: block;
          max-width: ${(100 / 12) * props[viewport]}%;
          flex-basis: ${(100 / 12) * props[viewport]}%;
      `;
      } else if (props[viewport]) {
        return props.theme.media[viewport]`
          display: block;
          max-width: 100%;
          flex-grow: 1;
          flex-basis: 0;
        `;
      } else {
        return props.theme.media[viewport]`
          display: none;
        `;
      }
    });

const getColumnOffsetFromProps = (props) =>
  Object.keys(props)
    .filter((propKey) => ["smOffset", "mdOffset", "lgOffset"].includes(propKey))
    .map(
      (viewport) => props.theme.media[viewport.replace(/Offset$/, "")]`
        margin-left: ${(100 / 12) * props[viewport]}%;
      `
    );

const Column = styled.div`
  box-sizing: border-box;
  flex: 0 0 auto;
  padding-left: ${(p) => p.theme.grid.gutterWidth / 2}rem;
  padding-right: ${(p) => p.theme.grid.gutterWidth / 2}rem;
  ${(p) =>
    p.reverse &&
    css`
      flex-direction: column-reverse;
    `};
  ${(p) => getColumnWidthFromProps(p)};
  ${(p) => getColumnOffsetFromProps(p)};
`;

Column.defaultProps = {
  sm: true,
  theme,
};

Column.propTypes = {
  reverse: PropTypes.bool,
  sm: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  lgOffset: PropTypes.number,
};

export default Column;
