TeamService = {
  getTeams: function(){
    var teams = Teams.find().fetch();
    var data = [];
    _.each(teams,function(team){

      var members = TeamMembers.find({team_id:team._id}).fetch();
      team.members = members;
      
      data.push(team);
    })
    console.log("teams",data);

    return data;
  },
  getAllMembers: function(){
    var members = [];
    _.each(TeamService.getTeams(),function(team){
      members = members.concat(team.members)
    });

    return members;
  },
  resetUnitsTime: function(){
    var members = TeamService.getAllMembers();

    _.each(members,function(member){
      TeamMembers.update(member._id,{$set:{currentTime:member.speed}});
    });
  },
  allUnitsHaveActed: function(){
    var members = TeamService.getAllMembers();
    var endedTurnUnits = _.where(members,{currentTime:0});
    return (endedTurnUnits.length == members.length);
  }
}