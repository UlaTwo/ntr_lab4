import React, { Component } from 'react';
import Main from "./Main";

class InitData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      groups: [],
      classes: [],
      teachers_all: []
    };
  }

  componentDidMount() {

    fetch("http://localhost:3001/rooms")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            rooms: result
          });
        },
        error => {
          console.log(error);
        }
      );

    fetch("http://localhost:3001/groups")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            groups: result
          });
        },
        error => {
          console.log(error);
        }
      );

    fetch("http://localhost:3001/classes")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            classes: result
          });
        },
        error => {
          console.log(error);
        }
      );


    fetch("http://localhost:3001/teachers")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            teachers_all: result
          });
        },
        error => {
          console.log(error);
        }
      );

    fetch("http://localhost:3001/activities")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            activities: result
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  render() {
    var activityRoom = [];
    {
      this.state.activities &&
        this.state.activities.length > 0 &&
        this.state.activities.map((item, i) => (
          activityRoom[i] = item.room
        ))
    }
    var activityGroup = [];
    {
      this.state.activities &&
        this.state.activities.length > 0 &&
        this.state.activities.map((item, i) => (
          activityGroup[i] = item.group
        ))
    }
    var activityClass = [];
    {
      this.state.activities &&
        this.state.activities.length > 0 &&
        this.state.activities.map((item, i) => (
          activityClass[i] = item.class
        ))
    }
    var activitySlot = [];
    {
      this.state.activities &&
        this.state.activities.length > 0 &&
        this.state.activities.map((item, i) => (
          activitySlot[i] = item.slot
        ))
    }
    var activityTeacher = [];
    {
      this.state.activities &&
        this.state.activities.length > 0 &&
        this.state.activities.map((item, i) => (
          activityTeacher[i] = item.teacher
        ))
    }
    var activityId = [];
    {
      this.state.activities &&
        this.state.activities.length > 0 &&
        this.state.activities.map((item, i) => (
          activityId[i] = item.id
        ))
    }
    var teachers = [];
    {
      this.state.teachers_all &&
        this.state.teachers_all.length > 0 &&
        this.state.teachers_all.map((item, i) => (
          teachers[i] = item.teacher
        ))
    }
    var teachersId = [];
    {
      this.state.teachers_all &&
        this.state.teachers_all.length > 0 &&
        this.state.teachers_all.map((item, i) => (
          teachersId[i] = item.id
        ))
    }
    const Data = require('./Data.js')
    const data = new Data(this.state.groups, this.state.classes, this.state.rooms, teachers, activityRoom, activityGroup, activityClass, activitySlot, activityTeacher, activityId, teachersId);

    return (
      <div className="InitData">
        <Main data={data} />
      </div>

    );
  }
}

export default InitData;