const uuid = require("uuid")

class lobby {

  constructor(host) {//Host is a player instance
   this.host = host
   this.players = [host]
   this.id = uuid()

   this.maxPlayers=2
  }


addPlayer(player){
  if (this.players.length>=this.maxPlayers){return false}
  this.players.push(player)
}



}