import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './Main.css';
import Plan from './Plan';
import DeleteTeacher from './DeleteTeacher';
import AddTeacher from './addTeacher';

class Main extends Component {
  render() {
    const Data = require('./Data.js')
    const data = this.props.data;

    return (

      <BrowserRouter>


        <div class="Main">
          <h1 class="display-4">Szkolny plan zajęć</h1>
          {/* <p>{data.plan}</p> */}
        </div>

        <div class="Main">
          <Link to="/plan">
            <button type="button" class="btn btn-outline-info">
              <a class="nav-link text-dark" asp-area="" role="button"><h2>Plan wybranej klasy</h2></a>
            </button>
          </Link>
        </div>

        <div class="Main">
          <Link to="/deleteTeacher">
            <button type="button" class="btn btn-outline-info">
              <a class="nav-link text-dark" asp-area="" role="button"><h2>Usunięcie nauczyciela</h2></a>
            </button>
          </Link>
        </div>

        <div class="Main">
          <Link to="/addTeacher">
            <button type="button" class="btn btn-outline-info">
              <a class="nav-link text-dark" asp-area="" role="button"><h2>Dodanie nauczyciela</h2></a>
            </button>
          </Link>
        </div>

        <div>

          <Switch>
            <Route path="/deleteTeacher">
              <DeleteTeacher data={data} />
            </Route>
            <Route path="/addTeacher">
              <AddTeacher data={data} />
            </Route>
            <Route path="/plan">
              <Plan data={data}/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;