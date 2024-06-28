import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FetchData from '../../utiles/globalFunctions/GlobalClientFunction';

const PrayerReport = () => {
  // Local state variable
  const [total, setTotal] = useState();
  const id = '64e8a320c470c731d3d7c1dd';

  // Global Functions for pryers data
  const { data, loading, error } = FetchData(
    'http://localhost:4000/api/prayers'
  );

  // Global Functions for service facilitator
  const { data: facilitator } = FetchData(
    `http://localhost:4000/api/committees/${id}/facilitator`
  );

  // Display surplus or deficit from the financial report table
  useEffect(() => {
    const prayerServices = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/prayers/count/all/prayers'
        );
        setTotal(data);
      } catch (error) {
        console.log(error);
      }
    };
    prayerServices();
  }, []);

  return (
    <section className="report-table-container">
      <table className="report-table">
        <thead className="table-head">
          <tr className="table-head-row">
            <th className="head-cell"> Service Date </th>
            <th className="head-cell"> Prayer Service </th>
            <th className="head-cell"> Service Facilitator </th>
            <th className="head-cell"> User Status </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {data.map((sacrament) => {
            return (
              <tr key={sacrament._id} className="table-body-row">
                <td className="body-cell"> {sacrament.date} </td>
                <td className="body-cell"> {sacrament.name} </td>
                <td className="body-cell"> {facilitator} </td>
                <td className="body-cell"> {sacrament._id} </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h4 className="total-income">
        Total Prayer services from September 2021 to September 2023 were
        <span className="total"> {total}. </span>
      </h4>
    </section>
  );
};

export default PrayerReport;
