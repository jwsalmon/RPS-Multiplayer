

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
var playerName, player1Name, player2Name = "";
var playerOneChoice = "";
var playerTwoChoice = "";

//write code to get name of players and add them to chat:
function addToChat() {
    var chat = $("#chatScreen");
    chat.val('');
    for (let i = 0; i < comments.length; i++) {
        var element = comments[i];

        chat.val(chat.val() + element.trim() + "\n");
    }
    var messageListRef = database.ref();

    messageListRef.set({
        comments: comments
    });
}

function playAgain() {
    if (bPlayer1) {
        $("#p1Option3").attr("background-image", "url(../images/scissorHand.png)");
        $("#p1Option1").attr("background-image", "url(../images/rockHand.png)");
        $("#p1Option2").attr("background-image", "url(../images/paperHand.png)");
        playerOneChoice = "";
        $("#p1Option1").prop("checked", false);
        $("#p1Option2").prop("checked", false);
        $("#p1Option3").prop("checked", false);
        var messageListRef = database.ref()
        messageListRef.child(playerOneChoice).remove();
    }
    if (bPlayer2) {
        $("#p2Option3").attr("background-image", "url(../images/scissorHand.png)");
        $("#p2Option1").attr("background-image", "url(../images/rockHand.png)");
        $("#p2Option2").attr("background-image", "url(../images/paperHand.png)");
        playeTwoChoice = "";
        $("#p2Option1").prop("checked", false);
        $("#p2Option2").prop("checked", false);
        $("#p2Option2").prop("checked", false);
        messageListRef.child(playerTwoChoice).remove();
    }
}
function checkWinner() {
    if ((playerOneChoice === 'rock') && (playerTwoChoice === 'scissor')) {
        var comment = "Admin: Winner is " + player1Name;
        comments.push(comment)
        addToChat();
        $("#p1Option1").attr("background-image", "url(../images/rockHandGreen.png)");
        $("#p2Option3").attr("background-image", "url(../images/scissorHandRed.png)");
    }
    else if ((playerOneChoice === 'rock') && (playerTwoChoice === 'paper')) {
        var comment = "Admin: Winner is " + player2Name;
        comments.push(comment)
        addToChat();
        $("#p1Option1").attr("background-image", "url(../images/rockHandRed.png)");
        $("#p2Option2").attr("background-image", "url(../images/paperHandGreen.png)");

    }
    else if ((playerOneChoice === 'rock') && (playerTwoChoice === 'rock')) {
        var comment = "Admin: Draw ";
        comments.push(comment)
        addToChat();
        $("#p1Option1").attr("background-image", "url(../images/rockHandGreen.png)");
        $("#p2Option1").attr("background-image", "url(../images/rockHandGreen.png)");
    }
    else if ((playerOneChoice === 'paper') && (playerTwoChoice === 'scissor')) {
        var comment = "Admin: Winner is " + player2Name;
        comments.push(comment)
        addToChat();
        $("#p1Option2").attr("background-image", "url(../images/paperHandRed.png)");
        $("#p2Option3").attr("background-image", "url(../images/scissorHandGreen.png)");
    }
    else if ((playerOneChoice === 'paper') && (playerTwoChoice === 'paper')) {
        var comment = "Admin: Draw ";
        comments.push(comment)
        addToChat();
        $("#p1Option2").attr("background-image", "url(../images/paperHandGreen.png)");
        $("#p2Option2").attr("background-image", "url(../images/paperHandGreen.png)");
    }
    else if ((playerOneChoice === 'paper') && (playerTwoChoice === 'rock')) {
        var comment = "Admin: Winner is " + player1Name;
        comments.push(comment)
        addToChat();
        $("#p1Option2").attr("background-image", "url(../images/paperHandGreen.png)");
        $("#p2Option1").attr("background-image", "url(../images/rockHandRed.png)");
    }
    else if ((playerOneChoice === 'scissor') && (playerTwoChoice === 'paper')) {
        var comment = "Admin: Winner is " + player1Name;
        comments.push(comment)
        addToChat();
        $("#p1Option3").attr("background-image", "url(../images/scissorHandGreen.png)");
        $("#p2Option1").attr("background-image", "url(../images/paperHandRed.png)");
    }
    else if ((playerOneChoice === 'scisor') && (playerTwoChoice === 'rock')) {
        var comment = "Admin: Winner is " + player2Name;
        comments.push(comment)
        addToChat();
        $("#p1Option3").attr("background-image", "url(../images/scissorHandRed.png)");
        $("#p2Option1").attr("background-image", "url(../images/rockHandGreen.png)");
    }
    else if ((playerOneChoice === 'scissor') && (playerTwoChoice === 'scissor')) {
        var comment = "Admin: Draw ";
        comments.push(comment)
        addToChat();
        $("#p1Option3").attr("background-image", "url(../images/scissorHandGreen.png)");
        $("#p2Option3").attr("background-image", "url(../images/scissorHandGreen.png)");
    }
    var comment = "Admin: Play Again? click on restart button";
    comments.push(comment)
    addToChat();
    $(".restart").prop("disabled",false);
}
$("#setPlayer1").on("click", function () {
    bPlayer1 = true;
    $("#setPlayer1").prop("disabled", true);
    $("#setPlayer2").prop("disabled", true);
    $("#addToChat").prop("disabled", false);

    player1Name = playerName = $("#player1Name").val();
});
$("#setPlayer2").on("click", function () {
    bPlayer2 = true;
    $("#setPlayer1").prop("disabled", true);
    $("#setPlayer2").prop("disabled", true);
    $("#addToChat").prop("disabled", false);
    player2Name = playerName = $("#player2Name").val();

});
$("#addToChat").on("click", function () {
    var comment = playerName + ": " + $("#chatText").val();
    comments.push(comment)
    addToChat();

});
$(".restart").on("click", function () {
    $(".restart").prop("disabled",true);
    playAgain();
});
database.ref().on("value", function (snapshot) {

    if (snapshot.child("comments").exists()) {

        dbVal = snapshot.val();
        comments = dbVal.comments;
        addToChat();
    }
    if (snapshot.child("playerOneChoice").exists() && snapshot.child("playTwoChoice").exists()) {
        dbVal = snapshot.val();
        playerTwoChoice = dbVal.playerTwoChoice;
        playerOneChoice = dbVal.playerOneChoice;
        if (bPlayer1) {
            if (playerTwoChoice === 'rock') {
                $("#p2Option1").prop("checked", true);
            }
            else if (playerTwoChoice === 'paper') {
                $("#p2Option2").prop("checked", true);
            }
            else {
                $("#p2Option3").prop("checked", true);
            }

        }
        if (bPlayer2) {
            if (playerOneChoice === 'rock') {
                $("#p1Option1").prop("checked", true);
            }
            else if (playerTwoChoice === 'paper') {
                $("#p1Option2").prop("checked", true);
            }
            else {
                $("#p1Option3").prop("checked", true);
            }
        }
        checkWinner();
    }
});

//write code to sent player selection to db
$("input[type='button']").click(function () {
    // $(".p1Option").on("click", function() {
    //   playerOneChoice = $(this).value();
    if (bPlayer1) {
        playerOneChoice = $("input[name='p1rps']:checked").val();
        database.ref().set({
            playerOneChoice: playerOneChoice
        });
    }
    if (bPlayer2) {
        playerTwoChoice = $("input[name='p2rps']:checked").val();
        database.ref().set({
            playerTwoChoice: playerTwoChoice
        })
    }
})

    