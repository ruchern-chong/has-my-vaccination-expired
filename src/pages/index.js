import React, { useEffect, useState } from "react";
import styled from "styled-components";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { connect } from "react-redux";
import dayjs from "dayjs";

import Layout from "../components/layout";
import Seo from "../components/seo";

import { updateSecondDose } from "../actions/datesActions";

const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const LocalizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(isSameOrAfter);
dayjs.extend(LocalizedFormat);

const Container = styled.main`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  width: auto;
`;

const Column = styled.div`
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  font-size: 18px;
  padding: 16px;
  margin-bottom: 24px;
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
        "When is your 2nd dose": "When is your 2nd dose?",
        "We do not store the date of your dose":
          "(We do not store the date of your dose)",
        "Vaccination will expire on": `Your vaccination status will expire on`,
      },
    },
    cn: {
      translation: {
        "When is your 2nd dose": "请输入您的第二疫苗的日期",
        "We do not store the date of your dose":
          "（我们不会把您的疫苗日期存储这）",
        "Vaccination will expire on": `您的疫苗有效期将在以下的日期成为无效`,
      },
    },
  },
  fallbackLng: "en",
});

const IndexPage = ({ date, settings, updateSecondDose }) => {
  const { t } = useTranslation();

  const { lang } = settings;

  const [expiryDate, setExpiryDate] = useState("2021-12-31");
  const todayDate = new Date().toISOString().split("T")[0];

  const calculateExpiryDate = (date) => {
    const theoreticalExpiryDate = dayjs(date).add(4, "M");

    if (theoreticalExpiryDate.isSameOrAfter(dayjs("2021-12-31"))) {
      return theoreticalExpiryDate;
    }

    return "2021-12-31";
  };

  useEffect(() => {
    i18n.changeLanguage(lang);

    if (date.dose?.second) {
      setExpiryDate(calculateExpiryDate(date.dose?.second));
    } else {
      updateSecondDose(todayDate);
    }
  }, [date.dose?.second, lang, todayDate, updateSecondDose]);

  const handleDateChange = (e) => {
    const date = e.target.value;
    updateSecondDose(date);

    setExpiryDate(calculateExpiryDate(date));
  };

  return (
    <Layout>
      <Seo title="Am I Still Vaccinated?" />
      <Container>
        <Row>
          <Column>
            <h2>This applies to the Sinovac and Sinopharm vaccines only.</h2>
          </Column>
          <Column>
            <label htmlFor="date-second-dose">
              <h3>
                {t("When is your 2nd dose")}
                <br />
                <Note>{t("We do not store the date of your dose")}</Note>
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
          <Column>
            <h3>{t("Vaccination will expire on")}</h3>
            <ExpiryDate key={expiryDate}>
              {dayjs(expiryDate).format("DD MMM YYYY")}
            </ExpiryDate>
          </Column>
        </Row>
      </Container>
    </Layout>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({ date, settings }) => ({
  date,
  settings,
});

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  updateSecondDose: (options) => dispatch(updateSecondDose(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
