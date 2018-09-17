

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCmvxuM183nvcLbEBecAg8AOVstwnf880s",
    authDomain: "jws-rps-multiplayer.firebaseapp.com",
    databaseURL: "https://jws-rps-multiplayer.firebaseio.com",
    projectId: "jws-rps-multiplayer",
    storageBucket: "",
    messagingSenderId: "871272250305"
};
firebase.initializeApp(config);
//get handle for firebase
var database = firebase.database();
var comments = [];
var bPlayer1 = false;
var bPlayer2 = false
var playerName = "";

//write code to get name of players and add them to chat:
$("#setPlayer1").on("click", function () {
    bPlayer1 = true;
    $("#setPlayer1").prop("disable",true);
    $("#setPlayer2").prop("disable", true);
    playerName = $("#player1Name").val();
});
$("#setPlayer2").on("click", function () {
    bPlayer2 = true;
    $("#setPlayer1").prop("disable",true);
    $("#setPlayer2").prop("disable", true);
    playerName = $("#player2Name").val();

});
$("#addToChat").on("click", function () {
    var comment = playerName + ": " + $("#chatText \n").val();
   comments.push(comment)
   var chat = $("#chatScreen");
   chat.val('');
   for (let i = 0; i < comments.length; i++) {
       var element = comments[i];

       chat.val(chat.val() + element.trim() + "\n");
   }
   
});


    //write code to sent player selection to db

    //write code to determine winner and let players know who won
    // use this to set correct images: $('myObject').css('background-image', 'url(' + imageUrl + ')');

    // write code to take chat info put in db and display it in chat text

    //add button with rules to play and pop dialog with details.