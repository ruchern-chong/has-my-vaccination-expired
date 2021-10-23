import React, { useEffect, useState } from "react";
import styled from "styled-components";
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

const IndexPage = ({ date, updateSecondDose }) => {
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
    if (date.dose?.second) {
      setExpiryDate(calculateExpiryDate(date.dose?.second));
    } else {
      setExpiryDate(calculateExpiryDate(todayDate));
    }
  }, []);

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
            <label htmlFor="date-second-dose">
              <h3>When was your 2nd dose?</h3>
              <Input
                type="date"
                id="date-second-dose"
                min="2021-06-18"
                max={todayDate}
                defaultValue={todayDate}
                value={date.dose?.second}
                onChange={handleDateChange}
              />
            </label>
          </Column>
          <Column>
            <h3>Your vaccination status will expire on</h3>
            <h2>{dayjs(expiryDate).format("DD MMM YYYY")}</h2>
          </Column>
        </Row>
      </Container>
    </Layout>
  );
};

/* istanbul ignore next */
const mapStateToProps = (state) => {
  const { date } = state;

  return {
    date: date,
  };
};

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  updateSecondDose: (options) => dispatch(updateSecondDose(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
