import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import ChangePlan from './ChangePlan';


class PlanDisplay extends Component {
    constructor(){
        super();
        this.state ={chosen_i: 'test'};
        this.state ={chosen_j: 'test'};
        this.btnClick = this.btnClick.bind(this);
      }
      btnClick(iGet,jGet){
       const i = iGet;
       const j = jGet;
       this.setState(state => ({      chosen_i: i  }));
       this.setState(state => ({      chosen_j: j  }));
      }

    render() {
        const Data = require('./Data.js')
        const data = this.props.data;
        var value = this.props.value;
        data.chosen_group= data.groups[parseInt(value)];

        var slots = ["8:00-8:45", "8:55-9:40", "9:50-11:35", "11:55-12:40", "12:50-13:35", "13:45-14:30", "14:40-15:25", "15:35-16:20", "16:30-17:15"];
        var days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];

        var planLocal = new Array(9);

        for (var i = 0; i < planLocal.length; i++) {
            planLocal[i] = new Array(5);
        }
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 5; j++) {
                planLocal[i][j] = "";
            }
        }

        if (value !== "") {
            data.planInicjalization(data.groups[parseInt(value)]);
            //inicjalizacja planu:
            for (var i = 0; i < data.activitiesGroup.length; i++) {
                if (data.activitiesGroup[i] === data.groups[parseInt(value)]) {
                    planLocal[Math.floor((data.activitiesSlot[i] - 1) / 5)][(data.activitiesSlot[i] - 1) % 5] = data.activitiesRoom[i] + " " + data.activitiesClass[i];
                }
            }
            data.plan = planLocal;
        }

        return (
            <BrowserRouter>
            <div class="btn-group">
                <div class="BodyBlock ListTable GroupsList">
                    <table>
                        <tr>
                            <td></td>
                            {days.map((day, index) => (<td><button type="button" class="btn btn-success btn-block" >
                                {day}
                            </button></td>))}
                        </tr>
                        {slots.map((s, i) => (
                            <tr>
                                <td>
                                    <button type="button" class="btn btn-primary" >
                                        {s}
                                    </button>
                                </td>
                                {days.map((d,j) => (
                                    <td>
                                        <Link to="/chengeData">
                                        <button value = "aada" type="button" class="btn btn-outline-dark"
                                        onClick={()=>this.btnClick(i,j)}
                                         >

                                            {data.plan[i][j]}

                                        </button>
                                        </Link>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </table>
                </div>
                <Switch>
            <Route path="/chengeData">
              <ChangePlan chosen_i={this.state.chosen_i} chosen_j={this.state.chosen_j} data={data}/>
            </Route>
          </Switch>
            </div>
            </BrowserRouter>
        );
    }
}

export default PlanDisplay;