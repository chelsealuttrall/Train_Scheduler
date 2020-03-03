// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyApzRXvIXLgZl64VeCWtZ0v5cJHRofX664",
    authDomain: "chelsea-sproject.firebaseapp.com",
    databaseURL: "https://chelsea-sproject.firebaseio.com",
    projectId: "chelsea-sproject",
    storageBucket: "chelsea-sproject.appspot.com",
    messagingSenderId: "258410064211",
    appId: "1:258410064211:web:1722a6076a98b2d4ce59a6"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Initial Values
var shuttle = "";
var terminal = "";
var first = 0;
var frequency = "";
var nextDepart = "";
var minutesUntil = "";

//const preObject = document.getElementById('object');

const dbRefObject = firebase.database();

// Firebase watcher + initial loader HINT: .on("value")

dbRefObject.ref().on("child_added", function(snapshot) {
    console.log("LOADING")
        // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().shuttle);
    console.log(snapshot.val().terminal);
    console.log(snapshot.val().first);
    console.log(snapshot.val().frequency);
    // Change the HTML to reflect
    $("#shuttle").text(snapshot.val().shuttle);
    $("#terminal").text(snapshot.val().terminal);
    $("#frequency").text(snapshot.val().frequency);
    //make this a formula to calc next depart
    $("#nextDepart").text(snapshot.val().comment);
    $("#minutesUntil").text(snapshot.val().comment);

    //preObject.innerText = JSON.stringify(snap.val(), null, 3);
    // Capture Button Click


    shuttle = $("#shuttlecompany").val().trim();
    terminal = $("#terminal").val().trim();
    first = $("#first").val().trim();
    frequency = $("#frequency").val().trim();



});

//on the submit click, put info into db
$("#submit").on("click", function() {
    console.log("SUBMITTING")
        // Code for the push
    dbRefObject.ref().push({
        shuttle: shuttle,
        terminal: terminal,
        first: first,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

console.log(moment().format("hh:mm A"));

//put pulled info on chart and in firebase
//$(shuttleCompany.shuttle).append(tr.material)

// dbRefObject = {
//     shuttle: "Dark Side Passages",
//     terminal: "Paris",
//     first: "0600 AM",
//     frequency: "6 Hours",
// }




// // YOUR TASK!!!



//     // Handle the errors
//   }, function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
//   });

// </script>