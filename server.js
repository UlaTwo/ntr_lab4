const express = require('express');
const app = express();
const data = {
    "rooms":["110","111","120","121"],
    "groups":["1a","1b","1c","2a","2b","3a","3b","4a","4b"],
    "classes":["mat","geo","eng","phys","biol"],
    "teachers":["kowalski","nowak","smith","clarkson","may","hammond","atkinson"],
    "activities":[
      {"room":"110", "group":"1a", "class":"mat", "slot":1, "teacher":"kowalski"},
      {"room":"120", "group":"1b", "class":"mat", "slot":2, "teacher":"may"},
      {"room":"121", "group":"1c", "class":"eng", "slot":3, "teacher":"nowak"}
    ]
}
app.get('/heya', (req,res) => res.json(data))
app.listen(5000)