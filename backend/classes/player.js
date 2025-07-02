const { v4: uuidv4 } = require('uuid');
class player {

  constructor(userId,username,decks) {//userID is used for the database,username a string, decks contains ID's of decks the player has
    this.userId=userId
    this.username=username
    

   this.decks = decks
  }

}

class anonymousPlayer extends player{
  
  constructor(){
    super(uuidv4(),"anonymous",["0"])
  }



}

module.exports = {player,anonymousPlayer}
