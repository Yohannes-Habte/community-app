import "./DashboardSummary.scss";
import "react-circular-progressbar/dist/styles.css";
import ServicesBarChart from "../charts/services/ServicesBarChart";
import SacramentsLineChart from "../charts/sacraments/SacramentsLineChart";
import SoulPrayersLineChart from "../charts/soulPrayer/SoulPrayersLineChart";
import SpiritualDevelopmentLineChart from "../charts/spiritual/SpiritualDevelopmentLineChart";
import EventsLineChart from "../charts/events/EventsLineChart";

const DashboardSummary = ({setActive}) => {
  return (
    <section className="priest-dashboard-summary">
      <h2 className="priest-dashboard-summary-title"> Dashboard Summary</h2>

      <ServicesBarChart  setActive={setActive} />

      <SacramentsLineChart setActive={setActive} />

      <SoulPrayersLineChart setActive={setActive} />

      <SpiritualDevelopmentLineChart setActive={setActive} />

      <EventsLineChart setActive={setActive} />
    </section>
  );
};

export default DashboardSummary;
