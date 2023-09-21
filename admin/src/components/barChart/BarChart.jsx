import React from 'react';
import './BarChart.scss';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BarChart1 = (props) => {
  const data = [
    {
      month: 'January',
      baptism: 1,
      marriage: 1,
      prayer: 2,
    },
    {
      month: 'February',
      baptism: 3,
      marriage: 0,
      prayer: 1,
    },
    {
      month: 'March',
      baptism: 1,
      marriage: 1,
      prayer: 2,
    },
    {
      month: 'April',
      baptism: 1,
      marriage: 0,
      prayer: 0,
    },
    {
      month: 'June',
      baptism: 1,
      marriage: 0,
      prayer: 0,
    },
    {
      month: 'July',
      baptism: 2,
      marriage: 1,
      prayer: 2,
    },

    {
      month: 'August',
      baptism: 1,
      marriage: 0,
      prayer: 0,
    },

    {
      month: 'September',
      baptism: 0,
      marriage: 1,
      prayer: 1,
    },

    {
      month: 'October',
      baptism: 1,
      marriage: 1,
      prayer: 1,
    },

    {
      month: 'November',
      baptism: 3,
      marriage: 0,
      prayer: 2,
    },

    {
      month: 'December',
      baptism: 2,
      marriage: 0,
      prayer: 1,
    },
  ];
  return (
    <div className="barchart">
      <h1 className="title"> {props.title} </h1>
      <div className="chart">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barSize={15}>
            <XAxis
              dataKey="month"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffefd5',
                borderRadius: '5px',
                color: 'dark',
              }}
              labelStyle={{ display: 'none' }}
              cursor={{ fill: 'none' }}
            />

            <Bar dataKey="baptism" fill="#8884d8" />
            <Bar dataKey="marriage" fill="#82ca9d" />
            <Bar dataKey="prayer" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart1;
