
var vm = new Vue({
    el: '#jeopardy-helper-app',
    data: {
        tloaded: [],
        selectedTeam: 'No team has been selected',
        buzzedTeams: []
    },
    computed: {
        orderedBuzzClicks: function () {
            return _.orderBy(this.buzzedTeams, 'clickedTime')
        },
        buzzedTeamNames: function () {
            let emptyClickedTeams = true
            var teamNames = []

            if(this.orderedBuzzClicks.length != 0){
                this.orderedBuzzClicks.forEach(function (item, index){
                    teamNames.push(item.name)
                    if(item.clickedTime != ''){
                        emptyClickedTeams = false
                    }
                });
            }

            if(emptyClickedTeams == true){
                teamNames = []
            }
            
            return teamNames
        }
    },
    watch: {
        tloaded: function (){
            this.reloadTeams()
        }
    },
    created() {
        /**
         * Load the teams to the page...
         */
        var loadedTeamsArray = []
        axios.get('/teams')
        .then(response => {
        const teams = response.data
                for (const key in teams) {
                    if (teams.hasOwnProperty(key)) {
                        loadedTeamsArray.push(teams[key].name)
                    }
                }
                this.tloaded = loadedTeamsArray
            })
        .catch(e => {
        this.errors.push(e)
        })
    },
    methods: {
        createTeamAndRedirect: function(evt) {
            var teamName = prompt("Please enter your team name with no spaces!")
            if(teamName != null){
            teamName = teamName.replace(' ','')
                axios.post('/teams/' + teamName)
                .then(response => console.log(response.data))
            }
        },
        reloadTeams: async function(){
            var loadedTeamsArray = []
            var loadedBuzzedTeamsArray = []
            let result = await axios.get('/teams')
            .then(response => {
                const teams = response.data
                for (const key in teams) {
                    if (teams.hasOwnProperty(key)) {
                        loadedTeamsArray.push(teams[key].name)
                        if(teams[key].clickedTime != ''){
                            loadedBuzzedTeamsArray.push(teams[key])
                        }  
                    }
                }
            })
            this.tloaded = loadedTeamsArray
            this.buzzedTeams = loadedBuzzedTeamsArray

            if(this.tloaded.length == 0){
                this.setSelectedTeam('No team has been selected' )
            }
        },
        setSelectedTeam: function (teamName){
            this.selectedTeam = teamName
            console.log("Selected Team: " + this.selectedTeam)
        },
        deleteTeams: async function(evt) {
            this.selectedTeam = 'No team has been selected' 
            this.buzzedTeams = []                    
            let result = await axios.delete('/teams/delete')
            .then(response => {
                console.log(response.data);
            })                   
        },
        updateClickedTime: async function(teamName) {
            console.log(teamName + " buzzed")
            let result = await axios.put('/teams/' + teamName + '/clickedBuzzer')
            .then(response => {
                console.log(response.data);
            })  
        },
        clearClickedTime: async function(){
            let result = await axios.put('/teams/clearClickedTime')
            .then(response => {
                console.log(response.data);
                this.buzzedTeams = []
                this.buzzedTeamNames
            })  
        }             
    }
})