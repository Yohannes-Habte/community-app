import { useEffect, useState } from "react";
import "./Tables.scss";
import axios from "axios";
import FetchData from "../../utiles/globalFunctions/GlobalClientFunction";
import { API } from "../../utiles/securitiy/secreteKey";

const SacramentReport = () => {
  // Local state variable
  const [total, setTotal] = useState();

  // Global Functions
  const { data } = FetchData(`${API}/sacraments`);

  // Display surplus or deficit from the financial report table
  useEffect(() => {
    const totalSacramentService = async () => {
      try {
        const { data } = await axios.get(
          `${API}/sacraments/size/total`
        );
        setTotal(data.counts);
      } catch (error) {
        console.log(error);
      }
    };
    totalSacramentService();
  }, []);

  return (
    <section className="report-table-container">
      <table className="report-table">
        <thead className="table-head">
          <tr className="table-head-row">
            <th className="head-cell"> Service Date </th>
            <th className="head-cell"> Sacrament Name </th>
            <th className="head-cell"> Service Facilitator </th>
            <th className="head-cell"> User Status </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {data && data.sacraments && data.map((sacrament) => {
            return (
              <tr key={sacrament._id} className="table-body-row">
                <td className="body-cell"> {sacrament.date} </td>
                <td className="body-cell"> {sacrament.name} </td>
                <td className="body-cell"> {sacrament._id} </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h4 className="total-income">
        Total Sacrament services from September 2021 to September 2023 were
        <span className="total"> {total}. </span>
      </h4>
    </section>
  );
};

export default SacramentReport;
