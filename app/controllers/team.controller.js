const Team = require('../models/team.model.js');

// Create a new team
exports.create = (req, res) => {
    // Validate request
    if(!req.params.teamName) {
        return res.status(400).send({
            message: "Team name can not be empty"
        });
    }

    // Create a team
    const team = new Team({
        name: req.params.teamName, 
        clickedTime: ''
    });

    // Save Team in the database
    team.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the team."
        });
    });
};

// Retrieve all Teams
exports.findAll = (req, res) => {
    Team.find()
    .then(teams => {
        res.send(teams);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving teams."
        });
    });
};


// Update a team clickTime with timestamp
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.teamName) {
        return res.status(400).send({
            message: "Team name can not be empty"
        });
    }

    // Find note and update it with the request body
    Team.findOneAndUpdate(
        {"name": req.params.teamName}, 
        {clickedTime: Date.now()},
        {new: true})
    .then(team => {
        if(!team) {
            return res.status(404).send({
                message: "Team not found with team name: " + req.params.teamName
            });
        }
        res.send(team);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Team not found with team name " + req.params.teamName
            });                
        }
        return res.status(500).send({
            message: "Error updating team with team name " + req.params.teamName
        });
    });
};

// Clear teams clickTime
exports.clearClickTimeStamp = (req, res) => {
    Team.updateMany({},
        {"clickedTime": ''},
        {
            upsert: false,
            multi: true,
        }
    )
    .then(team => {
        if(!team) {
            return res.status(404).send({
                message: "Teams not found"
            });
        }
        res.send(team);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Teams not found"
            });                
        }
        return res.status(500).send({
            message: "Error updating teams"
        });
    });

};

// Delete all teams
exports.delete = (req, res) => {
    var myquery = { __v: 0 };
    Team.deleteMany(myquery, function(err, obj) {
      if (err) throw err;
    })
    
};