function configureScreenManifest(){

  }

  function setupTimeBars(){

  }

  function setupUnitDescription(){

  }

  function calculateCurrentTurn(){
      var members = TeamService.getAllMembers();

      members = _.sortBy(members,function(member){
        return -member.currentTime;
      });

      console.log(members);

      setUnitActive(members[0]._id)

      // if lowest time has priority:
      // get and cache lowest current time of all members
      // subtract lowest time
      // current turn is unit with 0 current time

  }

  function setUnitActive(unitId){
    TeamMembers.update(unitId,{$set:{isActive:true}})
  }

  function commitUnitTurn(unitId,timeValue){

    //TeamMembers.update(unitId,{$set:{currentTime:timeValue,isActive:false}})
  
    // since highest speed as priority
    // set acting unit time to zero after turn ended
    TeamMembers.update(unitId,{$set:{currentTime:0,isActive:false}})
  }

  Meteor.methods({

    startGame: function(){
      calculateCurrentTurn();
    },

    createTeam: function(name,color){
      console.log("createTeam",name,color);

      var team = {
        name: name,
        color: color
      }

      return Teams.insert(team);
    },
    deleteTeam: function(teamId) {
      Teams.remove(teamId);
    },

    updateTeamMember: function(unitId, attributes) {
      // damage, healing
      TeamMembers.update(unitId,{$set:attributes});
    },

    draftUnit: function(unitId, teamId, playerId, sessionId){

      var unit = Units.findOne(unitId);

      var doc = {
        owner_id: playerId,
        team_id: teamId,
        currentHealth: unit.health,
        currentTime: unit.speed, 
        isActive: false, // is taking turn
        position: [null,null], // position on map
        facing: [0,1], // relative to map axis
        status: {}, // ad hoc key/value pairs for tracking special ability effects 
        currentRareCandy: 5
      }

      unit = _.extend(unit,doc);

      return TeamMembers.insert(unit);
    },
    commitAction: function(unitId, actionId){
      // generate action entry from unit action & target
      
      return entryId;
    },
    advanceTurn: function(unitId, actionId){
      // return unit with next turn
      commitUnitTurn(unitId,null)

      // if all units' time is zero
      // reset each time to unit's speed
      if (TeamService.allUnitsHaveActed()) {
        TeamService.resetUnitsTime()
      }

      calculateCurrentTurn();

      // get unit with min time value
      // subtract min from all units
      
      return unitId;
    }

  })