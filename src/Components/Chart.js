import React from "react";
import "./Chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { BarChart, Bar } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Chart(props) {
  const { heading, type, data, monotone } = props;

  const renderLabel = (entry) => {
    return `${entry.name} ${entry.value}%`;
  };

  const monthTickFormatter = (tick) => {
    const date = new Date(tick);

    return date.getMonth() + 1;
  };

  const renderQuarterTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const { value, offset } = payload;
    const date = new Date(value);
    const month = date.getMonth();
    const quarterNo = Math.floor(month / 3) + 1;
    const isMidMonth = month % 3 === 1;

    if (month % 3 === 1) {
      return <text x={x} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
    }

    const isLast = month === 11;

    if (month % 3 === 0 || isLast) {
      const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;

      return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
    }
    return null;
  };

  return (
    <div className="chart__container">
      <h3>{heading}</h3>
      <div className="chart">
        <ResponsiveContainer>
          {type === "pie" ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={140}
                fill="#8884d8"
                paddingAngle={1}
                dataKey="value"
                label={renderLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          ) : type === "line" ? (
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(tick) => `${tick}%`} />
              <Tooltip />
              <Legend />
              <Line
                type={monotone ? "monotone" : ""}
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                strokeWidth={3}
              />
              <Line
                type={monotone ? "monotone" : ""}
                dataKey="uv"
                stroke="#82ca9d"
                strokeWidth={3}
              />
              <Line
                type={monotone ? "monotone" : ""}
                dataKey="wv"
                stroke="#823456"
                strokeWidth={3}
              />
            </LineChart>
          ) : (
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={renderQuarterTick}
                height={1}
                scale="band"
                xAxisId="quarter"
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;
