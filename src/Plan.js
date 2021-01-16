import { useState } from 'react';
import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PlanDisplay from './PlanDisplay';
import { Dropdown } from 'react-bootstrap';

function Plan(props) {
    const Data = require('./Data.js')
    const data = props.data;
    var chosen = 0;
    const [value, setValue] = useState('');
    const handleSelect = (e) => {
        chosen=1;
        console.log(e);
        setValue(e)
    }
    return (
        <div class="text-center">
            <h1 class="display-4">Plan zajęć w wybranej klasie</h1>
                <DropdownButton
                    alignRight
                    title="Wybierz klasę"
                    id="dropdown-menu-align-right"
                    onSelect={handleSelect}
                >
                    {data.groups.map((group, index) => (<Dropdown.Item eventKey={index}>{group}</Dropdown.Item>))}
                </DropdownButton>
                <PlanDisplay data={data} value={value} chosen={chosen}/>
            </div>
    );
}

export default Plan;