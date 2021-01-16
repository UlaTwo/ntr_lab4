import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class CRUDTeacher extends Component {

    constructor() {
        super();
        this.state = { done: 0 };
        this.state = { chosen_teacher: "" }
        this.state = { chosen_room: "" }
        this.state = { chosen_class: "" }
        this.state = { chosen_ed: "" }
        this.state = { persons: [] }
    }

    render() {
        var freeTeachers = [];
        var freeRooms = [];
        var EditDelete = ["Usuń", "Dodaj", "Modyfikuj"];
        return (
            <BrowserRouter>
                <div class="text-center">
                    <h1>Zmiana danych nauczyciela: </h1>
                    <Link to="/addTeacher">
                        <button type="button" class="btn btn-outline-info">
                            <a class="nav-link text-dark" asp-area="" role="button"><h2>Dodaj</h2></a>
                        </button>
                    </Link>
                    <Switch>
                        <Route path="/addTeacher">
                            <addTeacher data={this.props.data} />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default CRUDTeacher;