Template.draftSelection.helpers({
  availableUnits: function(){
    // if (!Session.get("availableUnits")) {
    //   var units = Units.find().fetch();
    //   Session.set("availableUnits",units);
    // }

    // return Session.get("availableUnits");

    return Units.find().fetch();
  }
});

Template.liveSummary.helpers({
  teams: function(){
    return TeamService.getTeams();
  }
})

Template.teamConfiguration.events({
  "click #createTeam": function(){
    var name = $("input#playerName").val()
    var color = $("input[name=teamColor]:checked").val()
    Meteor.call("createTeam",name,color);
  }
});


Template.draftButton.events({
  "click .draftToTeam": function(){
    var teamId = this._id;
    var unitId = Template.parentData()._id;
    console.log("draftToTeam");

    Meteor.call("draftUnit", unitId, teamId, null, null, function(error,result){

    });
  }
});

Template.sessionControlPanel.events({
  "click .start-game": function(){
    Meteor.call("startGame");
  }
});

Template.teamSummary.events({
  "click .deleteTeam": function(){
    console.log("teamSummary",this);
    Meteor.call("deleteTeam",this._id)
  }
});

Template.healthBar.events({
  "click .addHealth": function(){
    console.log(this)

    var delta = {currentHealth:Math.min(this.health,this.currentHealth+1)};
    Meteor.call("updateTeamMember",this._id,delta);
  },
  "click .subtractHealth": function(){
    console.log(this);
    var delta = {currentHealth:Math.max(0,this.currentHealth-1)};
    Meteor.call("updateTeamMember",this._id,delta);
  }
});

Template.rareCandyBar.events({
  "click .addRareCandy": function(){
    console.log(this)

    var delta = {currentRareCandy:this.currentRareCandy+1};
    Meteor.call("updateTeamMember",this._id,delta);
  },
  "click .subtractRareCandy": function(){
    console.log(this);
    var delta = {currentRareCandy:Math.max(0,this.currentRareCandy-1)};
    Meteor.call("updateTeamMember",this._id,delta);
  }
});

Template.editTeamMember.events({
  "click .end-turn": function(){
    Meteor.call("advanceTurn",this._id);
  }
})

Template.teamConfiguration.helpers({
  teamColors: function(){
    return ["red","blue"];
  }
});

Template.draftOptions.helpers({
  teams: function(){
    return Teams.find().fetch();
  }
});