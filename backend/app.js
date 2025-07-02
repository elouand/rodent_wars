const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new require("socket.io")(server);
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')



const {Lobby} = require("./classes/lobby.js")
const {player,anonymousPlayer} = require("./classes/player.js")
const {card} = require("./classes/card.js") 


app.use(express.static(__dirname));

const PORT = 8888;
const IP = "localhost"
server.listen(PORT, () => {
  console.log(`Server is running on ${IP}:${PORT}`);
});


const lobbies = {}
const games = {}
const authedPlayers = {}//Connected players. Values are player class instances



//-------------------------------Express-------------------------------------------
app.get('/', (request, response) => {
  response.sendFile('index.html', {root: __dirname+"/../frontend"});
});

app.get('/fichier/:nomFichier', function(request, response) {
  response.sendFile(request.params.nomFichier, {root: __dirname+"/../frontend"});
});

app.get('/ressources/:nomFichier', function(request, response) {
  response.sendFile(request.params.nomFichier, {root: __dirname+"/ressources"});
});
//-------------------------------Fonctions------------------------------------------



/*  <div id="gameListElem" class="gameListElem">
                    <p>Evil-mouse</p><p>1/2</p><button>Join!</button>
                </div>*/
                

io.on('connection', (socket) => {
  socket.join("noLobby")//Room for new games sends while the player isn't in one
  
  var cardInfos = fs.readFileSync(__dirname+"/gameDatas/cards.json");
  if (cardInfos!=undefined){socket.emit("askForCards",JSON.parse(cardInfos))};


socket.on("login",data=>{
  if (socket.userId!=undefined){return}
  console.log(data)

  if (data=="anonymous"){
    var player = new anonymousPlayer()
    socket.emit("login",{"userId":player.userId,"username":player.username,"decks":player.decks})
    socket.userId=player.userId
    socket.username=player.username



  }
  
  
  socket.on("askForDecks",data=>{
    const db = new sqlite3.Database(__dirname+"/database.db", (err) => {
      if (err) {
        console.error('Could not connect to database', err);
        return;
      }
      
      
      console.log("a")
      function getAndSendDecks(socket,decks,db){
        if (socket==undefined||decks==undefined){return}
        console.log("c")
        
        
        db.all("SELECT * FROM deck WHERE uuid in ("+(decks.map(() => '?').join(', '))+")",decks, (err, rows) => {//Getting the decks that correspond
          if (err) {
            console.error('Error running query', err);
            return;
          }
          
          if (rows) {
            socket.emit("askForDecks",rows) 
          }
        }
      )
      
      
    }
    
    
    
    
    var playerDecks = []
    if (socket.username=="anonymous"){
      playerDecks=[0]
      console.log("b")
      getAndSendDecks(socket,playerDecks,db)
    }
    else{//Use sqlite3 to recover player's decks
      
      db.get("SELECT decks FROM player WHERE userId ="+socket.userId, (err, row) => {//Getting the decks of the player
        if (err) {
          console.error('Error running query', err);
          return;
        }
        
        if (row) {
          console.log(JSON.parse(row));
          getAndSendDecks(socket,JSON.parse(row),db)
          
        }
      }
    )
  }
})

})


   



})






})


