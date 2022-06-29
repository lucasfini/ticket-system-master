import React, { Component } from "react";
import StatusChart from "./charts/status-chart.component";
import PriorityChart from "./charts/priority-chart.component";
import TypeChart from "./charts/type-chart.component";
import TicketList from "./ticket-list.component";

const user = localStorage.getItem("token");
console.log();

export default class Dashboard extends Component {
  render() {
    return (
      <div className="table-css">
        <div className="table-responsive-lg ">
          <div className="container ">
            <table className="table flex-column  align-items-center">
              <thead>
                <tr className=" row ">
                  <th className="col">
                    Tickets By Status
                  </th>
                  <th className="col">
                    Tickets by Priority
                  </th>
                  <th className="col">
                    Tickets by Type
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className=" row">
                  <td className="col ">
                    <StatusChart />
                  </td>
                  <td  className="col " >
                    <PriorityChart />
                  </td>
                  <td  className="col " >
                    <TypeChart />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="container-flush">
            <TicketList />
          </div>
        </div>
      </div>
    );
  }
}
