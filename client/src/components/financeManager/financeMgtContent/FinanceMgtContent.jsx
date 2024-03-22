import React from 'react';
import './FinanceMgtContent.scss';
import FinancialReports from '../finacialReports/FinancialReports';
import MembersContributionStatus from '../membersContribution/MembersContributionStatus';
import MemberContributionForm from '../memberContribution/MemberContributionForm';

const FinanceMgtContent = ({ active }) => {
  return (
    <article className="finance-mgt-dashboard-right-box-wrapper">
      {active === 1 && <FinancialReports />}

      {active === 2 && <MembersContributionStatus />}

      {active === 3 && <MemberContributionForm />}
    </article>
  );
};

export default FinanceMgtContent;
