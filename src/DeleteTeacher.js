import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Dropdown } from 'react-bootstrap';

class DeleteTeacher extends Component {

    constructor() {
        super();
        this.state = { done: 0 };
        this.state = { chosen_teacher: "" }
        this.state = { chosen_room: "" }
        this.state = { chosen_class: "" }
        this.state = { chosen_ed: "" }
        this.state = { persons: [] }
        this.btnClick = this.btnClick.bind(this);
        this.handleTeacher = this.handleTeacher.bind(this);
    }

    handleTeacher(d) {
        const done_v = d;
        this.setState(state => ({ chosen_teacher: done_v }));
    }

    btnClick(d) {
        var teacher = this.state.chosen_teacher;
        for (var j = 0; j < this.props.data.teachers.length; j++) {
            if (this.props.data.teachers[j] === teacher) {
                //usunięcie:
                //i teraz trzeba jakoś zrobić delete do jsona /|^^|\
                fetch('http://localhost:3001/teachers/' +this.props.data.teachersId[j], {
                    method: 'DELETE',
                })
                    .then(res => res.text()) // or res.json()
                    .then(res => console.log(res))
            }
        }
        //tutaj teraz powinno być usunięcie wszystkich activities, w których był nauczyciel
        for (var j = 0; j < this.props.data.activitiesTeacher.length; j++) {
            if ( this.props.data.activitiesTeacher[j] === teacher) {
                //usunięcie:
                this.props.data.activitiesGroup.splice(j, 1);
                //i teraz trzeba jakoś zrobić delete do jsona /|^^|\
                fetch('http://localhost:3001/activities/' + this.props.data.activitiesId[j], {
                    method: 'DELETE',
                })
                    .then(res => res.text()) // or res.json()
                    .then(res => console.log(res))
            }
        }
    }

    render() {
        var freeTeachers = [];
        var freeRooms = [];
        var EditDelete = ["Usuń", "Dodaj", "Modyfikuj"];
        return (
            <div class="text-center">
                <h1>Usunięcie nauczyciela </h1>
                <DropdownButton
                    alignRight
                    title="Wybierz nauczyciela"
                    id="dropdown-menu-align-right"
                >
                    {this.props.data.teachers.map((group, index) => (<Dropdown.Item eventKey={index}
                        onClick={() => this.handleTeacher(group)}
                    >{group}</Dropdown.Item>))}
                </DropdownButton>
                <p>Wybrany nauczyciel: {this.state.chosen_teacher}</p>

                <button type="button" class="btn btn-outline-info"
                    onClick={() => this.btnClick(1)}
                >
                    <a class="nav-link text-dark"
                        href="http://localhost:3000"
                        asp-area="" role="button"><h2>Zatwierdź</h2></a>
                </button>
            </div>
        );
    }
}

export default DeleteTeacher;