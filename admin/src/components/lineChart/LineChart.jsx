import React from 'react'
import "./LineChart.scss"
import { Link } from 'react-router-dom';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

const LineChart1 = (props) => {
  return (
    <div className="chart-box">
      {/* Left side info */}
      <div className="box-info">
        <div className="title">
          <img className="image" src={props.icon} alt="" />
          <span className="title"> {props.title} </span>
        </div>
        <h1 className="amount"> {props.number} </h1>
        <Link to={'/'} style={{ color: props.color }} className="view-all">
          View All
        </Link>
      </div>

      {/* Right side info */}
      <div className="chart-info">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
                labelStyle={{ display: 'none' }}
                position={{ x: 10, y: 80 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{ color: props.percentage < 0 ? 'tomato' : 'limegreen' }}
          >
            {props.percentage}
          </span>
          <span className="duration"> This Month </span>
        </div>
      </div>
    </div>
  );
}

export default LineChart1