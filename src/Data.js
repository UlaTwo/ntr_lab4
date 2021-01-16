
class Data {
    constructor(groups, classes, rooms, teachers, activitiesRoom, activityGroup, activityClass, activitySlot, activityTeacher, activityId, teachersId) {
        this.groups = groups;
        this.classes = classes;
        this.rooms = rooms;
        this.teachers = teachers;
        this.activitiesRoom = activitiesRoom;
        this.activitiesGroup = activityGroup;
        this.activitiesClass = activityClass;
        this.activitiesSlot = activitySlot;
        this.activitiesTeacher = activityTeacher;
        this.activitiesId = activityId;
        this.teachersId = teachersId;
        this.chosen_group = 'nic';

        var plan = new Array(9);

        for (var i = 0; i < plan.length; i++) {
            plan[i] = new Array(5);
        }
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 5; j++) {
                plan[i][j] = " ";
            }
        }

        this.plan = plan;
    }

    planInicjalization(group) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 5; j++) {
                this.plan[i][j] = 4;
            }
        }

        for (var i = 0; i < this.activitiesGroup.length; i++) {
                if(this.activitiesGroup[i]===group){
                this.plan[Math.floor( (this.activitiesSlot[i] - 1) / 5) ][ (this.activitiesSlot[i] - 1) % 5] = this.activitiesRoom[i] + " " + this.activitiesClass[i];
            }
        }
    }

}

module.exports = Data