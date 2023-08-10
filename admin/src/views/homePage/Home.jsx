import React from 'react'
import "./Home.scss"
import Menu from '../../components/menu/Menu'
import PieChart from '../../components/pieChart/PieChart'
import AreaChartRevenue from '../../components/areaChart/AreaChart'
import TopBox from '../../components/userBox/TopBox'
import LineChart1 from '../../components/lineChart/LineChart'
import BarChart1 from '../../components/barChart/BarChart'


const Home = () => {
  return (
    <main className="home-page">
      <Menu />
      <section className="home-container">
        <div className="box box1">
          <TopBox />
        </div>
        <div className="box box2">
          <LineChart1 />
        </div>
        <div className="box box3">
          <LineChart1  />
        </div>
        <div className="box box4"> <PieChart /> </div>
        <div className="box box5">
          <LineChart1 />
        </div>
        <div className="box box6">
          <LineChart1  />
        </div>
        <div className="box box7"> <AreaChartRevenue /> </div>
        <div className="box box8">
          <BarChart1  />
        </div>
        <div className="box box9">
          <BarChart1  />
        </div>
      </section>
    </main>
  )
}

export default Home