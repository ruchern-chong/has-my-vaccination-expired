import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Grid, Row, Column } from '@noblitech/components/src/index';
import dayjs from 'dayjs';

import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import { updateSecondDose } from '../../actions/datesActions';

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const LocalizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(isSameOrAfter);
dayjs.extend(LocalizedFormat);

const StyledGrid = styled(Grid)`
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  font-size: 18px;
  padding: 16px;
  text-align: center;
  border-radius: 8px;
`;

const ExpiryDate = styled.h2`
  animation: heartBeat;
  animation-duration: 1s;
`;

const Note = styled.small`
  color: #ff0000;
`;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'No affliation':
          'This site is not affliated with the MOH, HSA and Multi-Ministry Task Force (MMTF). Please visit the respective websites for official information.',
        'Inactivated vaccines only': 'For Sinovac and Sinopharm vaccines ONLY',
        'When is your 2nd dose': 'When is your 2nd dose?',
        'We do not store the date of your dose':
          '(We do not store the date of your dose)',
        'Vaccination will expire on': `Your vaccination status will expire on`
      }
    },
    cn: {
      translation: {
        'No affliation':
          '这个网站与卫生部（MOH），卫生科学局（HSA）和抗疫跨部门工作小组没挂钩。如果您在寻找疫苗相关的咨询，请到各方的浏览站查询。谢谢！',
        'Inactivated vaccines only': '仅适用于科兴和国药疫苗',
        'When is your 2nd dose': '请输入您的第二疫苗的日期',
        'We do not store the date of your dose':
          '（我们不会把您的疫苗日期存储这）',
        'Vaccination will expire on': `您的疫苗有效期将在以下的日期成为无效`
      }
    }
  },
  fallbackLng: 'en'
});

export const VaccinationStatus = ({ date, settings, updateSecondDose }) => {
  const { t } = useTranslation();

  const { lang } = settings;

  const [expiryDate, setExpiryDate] = useState('2021-12-31');
  const todayDate = new Date().toISOString().split('T')[0];

  const calculateExpiryDate = (date) => {
    const theoreticalExpiryDate = dayjs(date).add(4, 'M');

    if (theoreticalExpiryDate.isSameOrAfter(dayjs('2021-12-31'))) {
      return theoreticalExpiryDate;
    }

    return '2021-12-31';
  };

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  useEffect(() => {
    if (date.dose?.second) {
      setExpiryDate(calculateExpiryDate(date.dose?.second));
    } else {
      updateSecondDose(todayDate);
    }
  }, [date.dose?.second, todayDate, updateSecondDose]);

  const handleDateChange = (e) => {
    const date = e.target.value;
    updateSecondDose(date);

    setExpiryDate(calculateExpiryDate(date));
  };

  return (
    <StyledGrid>
      <Row middle="sm" center="sm">
        <Column>
          <p>
            <em>{t('No affliation')}</em>
          </p>
        </Column>
      </Row>
      <Row>
        <Column>
          <h2>{t('Inactivated vaccines only')}</h2>
        </Column>
      </Row>
      <Row>
        <Column>
          <label htmlFor="date-second-dose">
            <h3>
              {t('When is your 2nd dose')}
              <br />
              <Note>{t('We do not store the date of your dose')}</Note>
            </h3>
            <Input
              type="date"
              id="date-second-dose"
              min="2021-06-18"
              max={todayDate}
              value={date.dose?.second}
              onChange={handleDateChange}
            />
          </label>
        </Column>
      </Row>
      <Row>
        <Column>
          <h3>{t('Vaccination will expire on')}</h3>
          <ExpiryDate key={expiryDate}>
            {dayjs(expiryDate).format('DD MMM YYYY')}
          </ExpiryDate>
        </Column>
      </Row>
    </StyledGrid>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({ date, settings }) => ({
  date,
  settings
});

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  updateSecondDose: (options) => dispatch(updateSecondDose(options))
});

export default connect(mapStateToProps, mapDispatchToProps)(VaccinationStatus);
