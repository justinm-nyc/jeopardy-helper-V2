module.exports = (app) => {
    const teams = require('../controllers/team.controller.js');

    // Create a new team
    app.post('/teams/:teamName', teams.create);

    // Retrieve all Teams
    app.get('/teams', teams.findAll);


    // Update a team clickTime with timestamp
    app.put('/teams/:teamName/clickedBuzzer', teams.update);


    // Clear teams clickTime
    app.put('/teams/clearClickedTime', teams.clearClickTimeStamp);

    // Delete all teams
    app.delete('/teams/delete', teams.delete);
}