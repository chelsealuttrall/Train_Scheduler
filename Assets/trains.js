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

//time calcs
let currentTime = moment().format("hh:mm A");

let frequencyFormat = moment().format("hhmm");

var nextDepart = "";
var minutesUntil = moment().startOf('hour').fromNow();


// Firebase watcher + initial loader HINT: .on("value")

dbRefObject.ref().on("child_added", function(snapshot) {
    console.log("LOADING")
        // Log everything that's coming out of snapshot
    let firstShuttleTime = snapshot.val().first;
    let frequencyCalc = snapshot.val().frequency;
    nextDepart = firstShuttleTime + currentTime;
    minutesUntil = nextDepart - currentTime;
    // console.log(snapshot.val());
    // Change the HTML to reflect DB info
    $("tbody").html(
        `<tr>
        <td> ${snapshot.val().shuttle}</td>  
        <td> ${snapshot.val().terminal}</td> 
        <td> ${snapshot.val().frequency}</td> 
        <td> ${nextDepart}</td> 
        <td> ${minutesUntil}</td> 
        </tr>`);



});

// $("td#shuttleCompany").append(snapshot.val().shuttle);
// $("td#terminal").append(snapshot.val().terminal);
// $("td#frequency").append(;
//     //make this a formula to calc next depart
//     $("td#nextDepart").append(snapshot.val().comment); $("td#minutesUntil").append; $("tr#object").append("<hr>");
//     //preObject.innerText = JSON.stringify(snap.val(), null, 3);





//on the submit click, put info into db
$("#submit").on("click", function() {
    console.log("SUBMITTING")
    shuttle = $("input#shuttlecompany").val().trim();
    terminal = $("input#terminal").val().trim();
    first = $("input#first").val().trim();
    frequency = $("input#frequency").val().trim();
    // Code for the push
    dbRefObject.ref().push({
        shuttle: shuttle,
        terminal: terminal,
        first: first,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

//console.log(moment().format("hh:mm A"));
//console.log(moment().format("hhmm"));
//moment().startOf('hour').fromNow();      

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