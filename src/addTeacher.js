import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, Col } from "react-bootstrap";

class AddTeacher extends Component {

    constructor() {
        super();
        this.state = { done: 0 };
        this.textInput = React.createRef();
        this.btnClick = this.btnClick.bind(this);
        this.state = { new_name: "" }
    }

    handleChange() {
        const value = this.textInput.current.value;
        this.state.new_name = value;
    }

    btnClick(d){
        const singledata = {
            teacher: this.state.new_name.toString() 
        }
        //dodanie nowego activity według podanych danych
        fetch("http://localhost:3001/teachers/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(singledata)
        })
    }

    render() {
        return (
            <div class="text-center">
                <h1>{this.state.new_name} </h1>
                <Col xs={5}>
                    <p>Wprowadź nazwisko nowego nauczyciela:</p>
                    <FormControl ref={this.textInput} type="text"
                    onChange={() => this.handleChange()} 
                    />
                </Col>

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

export default AddTeacher;