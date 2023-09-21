import React from 'react';
import './Home.scss';
import Menu from '../../components/menu/Menu';
import PieChart from '../../components/pieChart/PieChart';
import AreaChartRevenue from '../../components/areaChart/AreaChart';
import BarChart1 from '../../components/barChart/BarChart';
import SpiritualDevChart from '../../components/lineChart/SpiritualDevChart';
import ParticipationChart from '../../components/lineChart/ParticipationChart';

const Home = () => {
  return (
    <main className="home-page">
      <Menu />
      <section className="home-container">
        <h1 className="home-title"> Summary of Church Activities </h1>
        <hr />

        <article className=" box sacraments">
          <h2 className="subTitle"> Service of Sacraments </h2>
          <BarChart1 />
        </article>

        <article className="box members-participation">
          <h2 className="subTitle"> Church Members Participation </h2>
          <ParticipationChart />
        </article>

        <article className="box spiritual-development">
          <h2 className="subTitle"> Spiritual Development </h2>
          <SpiritualDevChart />
        </article>

        <article className="box members-donation">
          <h2 className="subTitle"> Members Donation category </h2>
          <PieChart />
        </article>

        <article className="box financial-analysis">
          <h2 className="subTitle"> Church Revenue </h2>
          <AreaChartRevenue />
        </article>
      </section>
    </main>
  );
};

export default Home;
