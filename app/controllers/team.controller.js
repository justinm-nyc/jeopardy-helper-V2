const Team = require('../models/team.model.js');

var teams = [];
// Create a new team
exports.create = (req, res) => {
    console.log("\ncreate called");
    // Validate request
    if(!req.params.teamName) {
        return res.status(400).send({
            message: "Team name can not be empty"
        });
    }

    var exists = false;

    if(teams.length == 0){
        // Create a team
        const team = new Team({
            name: req.params.teamName, 
            clickedTime: ''
        });

        //Push new team to array
        teams.push(team);   
    } else {
        teams.forEach(function(team){
            if(team.name == req.params.teamName){
                exists = true;
            }
        });

        if(exists == false){
            // Create a team
            const team = new Team({
                name: req.params.teamName, 
                clickedTime: ''
            });
            
            //Push new team to array
            teams.push(team);
            return res.send(team)
        }
        else if(exists == true){
                return res.send('Team already exists.')
            }
        }
    

    // // Save Team in the database
    // team.save()
    // .then(data => {
    //     res.send(data);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while creating the team."
    //     });
    // });

    console.log(teams)
}

// Retrieve all Teams
exports.findAll = (req, res) => {
    res.send(teams);

};


// Update a team clickTime with timestamp
exports.update = (req, res) => {
    console.log("\nupdate called");
    // Validate Request
    if(!req.params.teamName) {
        return res.status(400).send({
            message: "Team name can not be empty"
        });
    }

    //Using teams array
    var currentTime = Date.now();
    teams.forEach(function(team){
        if(team.name == req.params.teamName){
            team.clickedTime = currentTime;
        }
    });
};

// Clear teams clickTime
exports.clearClickTimeStamp = (req, res) => {
    console.log("\nclearClickTimeStamp called");
    //Using teams array
    teams.forEach(function(team){
        team.clickedTime = '';
    });

    console.log(teams)

};

// Delete all teams
exports.delete = (req, res) => {
    console.log("\ndelete called");
    //Using teams array
    teams = []
    if(teams.length == 0){
        console.log("Teams have been cleared")
    }    
};