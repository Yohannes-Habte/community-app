
import "./LineCharts.scss"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const SacramentsLineChart = () => {
  const data = [
    {
      month: 'January',
      size: 80,
    },
    {
      month: 'February',
      size: 60,
    },
    {
      month: 'March',
      size: 70,
    },
    {
      month: 'April',
      size: 150,
    },

    {
      month: 'June',
      size: 70,
    },
    {
      month: 'July',
      size: 40,
    },

    {
      month: 'August',
      size: 50,
    },

    {
      month: 'September',
      size: 120,
    },
    {
      month: 'October',
      size: 60,
    },

    {
      month: 'November',
      size: 40,
    },

    {
      month: 'December',
      size: 100,
    },
  ];

  return (
    <section className="linechart-container">
      <h4 className="chart-title"> Sacrament Services Line Chart </h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
            labelStyle={{ display: 'none' }}
            position={{ x: 10, y: 80 }}
          />

          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />

          <Line type="monotone" dataKey="size" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default SacramentsLineChart;
