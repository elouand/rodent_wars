var socket = io();



var currentState = "noGame"
var cardInfos



const topbarTabs = ["gameList","decks","cards"] 

//------------Création d'une partie
function login(){
console.log("Connection pas encore implémenté")
}

function signUp(){
    console.log("Connectionas encore implémenté")
}

function loginAnonymous(){
socket.emit("login","anonymous")
}




function changeTab(buttonClicked){
    if (document.getElementById(buttonClicked.id)==undefined || document.getElementById(buttonClicked.id).className=="topBarSelectedButton"){return}
    var wantedTab = buttonClicked.id.substring(0,buttonClicked.id.length-6)
    for (var tab of topbarTabs){
        if (tab==wantedTab){
        document.getElementById(tab+"Button").className="topBarSelectedButton"
        document.getElementById(tab+"Div").style.display="flex"
    }
        else{
            document.getElementById(tab+"Button").className="topBarButton"
            document.getElementById(tab+"Div").style.display="none"
        }
    }
    if (wantedTab=="decks" && socket.userId!=undefined){socket.emit("askForDecks")}

}




socket.on("login",data=>{
    console.log("connection réussie !")
    console.log(data)
    document.getElementById("loginDiv").innerHTML="<p>Logged as "+data.username+"</p>"
    socket.username=data.username
    socket.userId=data.userId
})



function updateDecks(decks){
    var deckList = document.getElementById("decksTopDiv")
    deckList.innerHTML=""
    for (var deck of decks){
        var dDiv = document.createElement("div")
        dDiv.classList.add('decksTopDivElem');
        dDiv.id = "deck_"+deck.uuid;

        var dName = document.createElement('p');
        dName.textContent = deck.name;
        
        var dImg = document.createElement('img');
        if (deck.icon==undefined){dImg.src="/ressources/player0.png"}
        else{dImg.src = deck.icon}
        dDiv.appendChild(dName);
        dDiv.appendChild(dImg);
        deckList.appendChild(dDiv);
    }



}

socket.on("askForDecks",data=>{
    
    console.log(data)
    if (data==undefined){return}
    updateDecks(data)
})

socket.on("askForCards",data=>{
    
    console.log(data)
    cardInfos=data

    createCard(0,cardInfos,"test","hand-1")
    createCard(0,cardInfos,"test","hand-2")
    createCard(1,cardInfos,"test","hand-3")
})




