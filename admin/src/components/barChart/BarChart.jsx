import React from 'react';
import './BarChart.scss';
import { BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';

const BarChart1 = (props) => {
  return (
    <div className="barchart">
      <h1 className="title"> {props.title} </h1>
      <div className="chart">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart width={150} height={40} data={props.chartData}>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffefd5',
                borderRadius: '5px',
                color: 'dark',
              }}
              labelStyle={{ display: 'none' }}
              cursor={{ fill: 'none' }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart1;
