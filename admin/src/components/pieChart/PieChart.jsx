import React from 'react';
import './PieChart.scss';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const Piechart = () => {
  const data = [
    { name: 'Group A', value: 400, color: '#9370db' },
    { name: 'Group B', value: 300, color: '#00C49F' },
    { name: 'Group C', value: 300, color: '#FFBB28' },
    { name: 'Group D', value: 200, color: '#FF8042' },
  ];

  return (
    <section className="piechart">
      <div className="piechart-container">
        <ResponsiveContainer width="99%" height={280}>
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: 'lightgray',
                borderRadius: '5px',
              }}
            />
            <Pie
              data={data}
              innerRadius={'70%'}
              outerRadius={'90%'}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="options">
        {data.map((item) => {
          return (
            <div key={item.name} className="option">
              <div className="title">
                <div
                  className="dot"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="name"> {item.name} </span>
              </div>
              <span className="value"> {item.value} </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Piechart;
