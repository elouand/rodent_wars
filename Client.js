var socket = io();




var uuid = null;
var gameId=null;//Obtenu du serveur, comme uuid
var currentState = "noGame"//Se change en "inLobby" ou en "inGame" après


var informationsJoueur;
var host = false;


//------------Création d'une partie