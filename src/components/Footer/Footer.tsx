import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Column, Grid, Row } from '@noblitech/components/src/index';

import { setLanguage } from '../../actions/settingsActions';

import { languages } from '../../config';
import theme from '../../theme';

const StyledFooter = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 16px;
  color: #fff;
  background-color: ${theme.colours.primary};
  border-top: 1px solid #eee;

  ${theme.media.md`
    padding: 24px;
  `}
`;

const LanguageSelector = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const LanguageItem = styled.li`
  list-style-type: none;
  padding-left: 16px;

  &:first-child {
    padding-left: 0;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      pointer-events: none;
    `}

  ${({ isActive }) =>
    !isActive &&
    css`
      opacity: 0.5;
      cursor: pointer;
    `}
`;

const Footer = ({ settings, setLanguage }) => {
  const { i18n } = useTranslation();

  const { lang } = settings;

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  /**
   * Handle changing of language
   *
   * @param lang
   */
  const handleLanguageChange = (lang) => {
    setLanguage(lang);

    return i18n.changeLanguage(lang);
  };

  return (
    <StyledFooter>
      <Grid>
        <Row>
          <Column>
            <LanguageSelector>
              {languages.map(({ lang, name }) => (
                <LanguageItem
                  key={lang}
                  isActive={lang === i18n.language}
                  onClick={() => handleLanguageChange(lang)}
                >
                  {name}
                </LanguageItem>
              ))}
            </LanguageSelector>
          </Column>
        </Row>
      </Grid>
    </StyledFooter>
  );
};

Footer.propTypes = {
  settings: PropTypes.object,
  setLanguage: PropTypes.func
};

/* istanbul ignore next */
const mapStateToProps = (state) => ({
  settings: state.settings
});

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  setLanguage: (lang) => dispatch(setLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
