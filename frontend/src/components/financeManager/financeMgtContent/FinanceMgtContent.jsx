import "./FinanceMgtContent.scss";
import FinancialReports from "../finacialReports/FinancialReports";
import AllContributions from "../membersContribution/AllContributions";
import SummaryView from "../summary/SummaryView";

const FinanceMgtContent = ({ active }) => {
  return (
    <article className="finance-mgt-dashboard-right-box-wrapper">
      {active === 1 && <SummaryView />}

      {active === 2 && <FinancialReports />}

      {active === 3 && <AllContributions />}
    </article>
  );
};

export default FinanceMgtContent;
