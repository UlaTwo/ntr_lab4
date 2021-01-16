import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Dropdown } from 'react-bootstrap';

class ChangePlan extends Component {

    constructor() {
        super();
        this.state = { done: 0 };
        this.state = { chosen_teacher: "" }
        this.state = { chosen_room: "" }
        this.state = { chosen_class: "" }
        this.state = { chosen_ed: "" }
        this.btnClick = this.btnClick.bind(this);
        this.handleTeacher = this.handleTeacher.bind(this);
        this.handleRoom = this.handleRoom.bind(this);
        this.handleClass = this.handleClass.bind(this);
        this.handleED = this.handleED.bind(this);
        this.state = { persons: [] }
    }

    btnClick(d) {
        const done_v = d;
        this.setState(state => ({ done: done_v }));
        //usunięcie
        if (this.state.chosen_ed === "Usuń") {
            //sprawdzenie czy w wybranym slocie coś było
            if (this.props.data.plan[this.props.chosen_i][this.props.chosen_j] !== " ") {
                //odnajdujemy indeks naszego activities po slocie i grupie
                var slot = this.props.chosen_i * 5 + this.props.chosen_j + 1;
                var group = this.props.data.chosen_group;

                for (var j = 0; j < this.props.data.activitiesGroup.length; j++) {
                    if (slot === this.props.data.activitiesSlot[j] && this.props.data.activitiesGroup[j] === group) {
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
        }
        //modyfikacja
        //dane dla nowego slotu: 
        if (this.state.chosen_ed === "Edytuj") {
            //uwaga trzeba najpierw sprawdzić, czy są wszystkie wypełnione!
            if (this.state.chosen_teacher !== "" && this.state.chosen_room !== "" && this.state.chosen_class !== "") {
                var group = this.props.data.chosen_group;
                var slot = this.props.chosen_i * 5 + this.props.chosen_j + 1;

                //usunięcie poprzedniej danej w tym slocie
                for (var j = 0; j < this.props.data.activitiesGroup.length; j++) {
                    if (slot === this.props.data.activitiesSlot[j] && this.props.data.activitiesGroup[j] === group) {
                        //usunięcie:
                        this.props.data.activitiesGroup.splice(j, 1);
                        fetch('http://localhost:3001/activities/' + this.props.data.activitiesId[j], {
                            method: 'DELETE',
                        })
                            .then(res => res.text()) // or res.json()
                            .then(res => console.log(res))
                    }
                }

                const singledata = {
                    room: this.state.chosen_room.toString(),
                    group: group.toString(),
                    class: this.state.chosen_class.toString(),
                    slot: slot,
                    teacher: this.state.chosen_teacher.toString()
                }
                //dodanie nowego activity według podanych danych
                fetch("http://localhost:3001/activities/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(singledata)
                })
            }
        }
    }

    handleClass(d) {
        const done_v = d;
        this.setState(state => ({ chosen_class: done_v }));
    }

    handleTeacher(d) {
        const done_v = d;
        this.setState(state => ({ chosen_teacher: done_v }));
    }

    handleRoom(d) {
        const done_v = d;
        this.setState(state => ({ chosen_room: done_v }));
    }

    handleED(d) {
        const done_v = d;
        this.setState(state => ({ chosen_ed: done_v }));
    }

    initFreeRooms(data, chosen_i, chosen_j) {
        var freeRooms = [];

        //dla każdej klasy
        for (var i = 0; i < data.rooms.length; i++) {
            var is_in_slot = false;
            for (var j = 0; j < data.activitiesRoom.length; j++) {
                var slot = chosen_i * 5 + chosen_j + 1;
                if (slot === data.activitiesSlot[j] && data.activitiesRoom[j] === data.rooms[i]) {
                    is_in_slot = true;
                }
            }

            if (is_in_slot === false) {
                freeRooms.push(data.rooms[i]);
            }
        }

        return freeRooms;
    }

    initFreeTeachers(data, chosen_i, chosen_j) {
        var freeTeachers = [];

        //dla każdej klasy
        for (var i = 0; i < data.teachers.length; i++) {
            var is_in_slot = false;
            for (var j = 0; j < data.activitiesTeacher.length; j++) {
                var slot = chosen_i * 5 + chosen_j + 1;
                if (slot === data.activitiesSlot[j] && data.activitiesTeacher[j] === data.teachers[i]) {
                    is_in_slot = true;
                }
            }

            if (is_in_slot === false) {
                freeTeachers.push(data.teachers[i]);
            }
        }

        return freeTeachers;
    }

    render() {
        var freeTeachers = [];
        var freeRooms = [];
        var EditDelete = ["Edytuj", "Usuń"];
        freeRooms = this.initFreeRooms(this.props.data, this.props.chosen_i, this.props.chosen_j);
        freeTeachers = this.initFreeTeachers(this.props.data, this.props.chosen_i, this.props.chosen_j);
        return (
            <div>
                <p>Zmiana danych: </p>
                <p>Aktualne zajęcia: {this.props.data.plan[this.props.chosen_i][this.props.chosen_j]}</p>
                <p>Wybrana grupa: {this.props.data.chosen_group}</p>

                <DropdownButton
                    alignRight
                    title="Wybierz rodzaj zmiany"
                    id="dropdown-menu-align-right"
                >
                    {EditDelete.map((group, index) => (<Dropdown.Item eventKey={index} onClick={() => this.handleED(group)} >{group}</Dropdown.Item>))}
                </DropdownButton>
                <p>Wybrany tryb: {this.state.chosen_ed}</p>

                <DropdownButton
                    alignRight
                    title="Wybierz przedmiot"
                    id="dropdown-menu-align-right"
                >
                    {this.props.data.classes.map((group, index) => (<Dropdown.Item eventKey={index} onClick={() => this.handleClass(group)} >{group}</Dropdown.Item>))}
                </DropdownButton>
                <p>Wybrany przedmiot: {this.state.chosen_class}</p>

                <DropdownButton
                    alignRight
                    title="Wybierz nauczyciela"
                    id="dropdown-menu-align-right"
                >
                    {freeTeachers.map((group, index) => (<Dropdown.Item eventKey={index} onClick={() => this.handleTeacher(group)} >{group}</Dropdown.Item>))}
                </DropdownButton>
                <p>Wybrany nauczyciel: {this.state.chosen_teacher}</p>
                <DropdownButton
                    alignRight
                    title="Wybierz salę"
                    id="dropdown-menu-align-right"
                >
                    {freeRooms.map((group, index) => (<Dropdown.Item eventKey={index} onClick={() => this.handleRoom(group)}>{group}</Dropdown.Item>))}
                </DropdownButton>
                <p>Wybrana sala: {this.state.chosen_room}</p>
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

export default ChangePlan;