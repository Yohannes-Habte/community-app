import React, { useEffect, useState } from 'react'
import "./Tables.scss"
import FetchData from '../../utiles/GlobalClientFunction';
import axios from 'axios';

const SacramentReport = () => {
     // Global Functions
  const { data, loading, error, reFetching, deleteData } = FetchData(
    'http://localhost:4000/api/sacraments'
  );

  // Local state variable
  const [total, setTotal] = useState();

  // Display surplus or deficit from the financial report table
  useEffect(() => {
    const totalSuplusOrDeficit = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/finances/total/surplus-or-deficit'
        );
        setTotal(data);
      } catch (error) {
        console.log(error);
      }
    };
    totalSuplusOrDeficit();
  }, []);

    return (
        <section className="report-table-container">
          <table className="report-table">
            <thead className="table-head">
              <tr className="table-head-row">
              <th className="head-cell"> Service Date </th>
                <th className="head-cell"> Sacrament Name </th>
                <th className="head-cell"> Contact Number </th>
                <th className="head-cell"> User Status </th>
               
              </tr>
            </thead>
    
            <tbody className="table-body">
              {data.map((sacrament) => {
                return (
                  <tr key={sacrament._id} className="table-body-row">
                    <td className="body-cell"> {sacrament.date} </td>
                    <td className="body-cell"> {sacrament.name} </td>
                    <td className="body-cell"> {sacrament.phone} </td>
                    <td className="body-cell"> {sacrament._id} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
    
          <h4 className="total-income">
            Total Income for the year 2022 was{' '}
            <span className="total">€ {total} </span>
          </h4>
        </section>
      );
}

export default SacramentReport