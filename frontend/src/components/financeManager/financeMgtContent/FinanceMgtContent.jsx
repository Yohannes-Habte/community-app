
import './FinanceMgtContent.scss';
import FinancialReports from '../finacialReports/FinancialReports';
import AllContributions from '../membersContribution/AllContributions';

const FinanceMgtContent = ({ active }) => {
  return (
    <article className="finance-mgt-dashboard-right-box-wrapper">
      {active === 1 && <FinancialReports />}

      {active === 2 && <AllContributions />}

    </article>
  );
};

export default FinanceMgtContent;
