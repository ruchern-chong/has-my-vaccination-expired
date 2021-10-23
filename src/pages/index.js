import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import Layout from "../components/layout";
import Seo from "../components/seo";

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

const Title = styled.h1`
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 18px;
  padding: 16px;
  margin-bottom: 24px;
  text-align: center;
  border-radius: 8px;
`;

const IndexPage = () => {
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
    setExpiryDate(calculateExpiryDate(todayDate));
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;

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

export default IndexPage;
