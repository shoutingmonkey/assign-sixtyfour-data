import React from "react";
import Chart from "./Chart";
import "./Charts.css";
import { BAR, LINE_SMALL, PIE } from "../data";

function Charts() {
  return (
    <div className="charts__container">
      <Chart
        heading="Loan Growth (YoY) by Bank Category"
        type="line"
        data={LINE_SMALL}
      />
      <Chart
        heading="Composition of Bank Deposits (September-2021)"
        type="pie"
        data={PIE}
      />
      <Chart
        heading="Deposit Growth (YoY) by Bank Category"
        type="line"
        data={LINE_SMALL}
        monotone={true}
      />
      <Chart
        heading="Scheduled Commercial Banks Tier I Capital Ratio (%)"
        type="bar"
        data={BAR}
      />
      <Chart
        heading="Scheduled Commercial Banks GNPA Ratio (%) "
        type="line"
        data={LINE_SMALL}
        monotone={false}
      />
      <Chart
        heading="Scheduled Commercial Banks Stressed Assets Ratio (%)"
        type="pie"
        data={PIE}
      />
    </div>
  );
}

export default Charts;
