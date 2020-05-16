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

var nextDepart ;
var minutesUntil = moment("20200615", "YYYYMMDD").fromNow();
console.log(moment(Date.now()).add(30, "minutes").fromNow());


// Firebase watcher + initial loader HINT: .on("value")

dbRefObject.ref().on("child_added", function(snapshot) {
    console.log("LOADING", snapshot.val())
        // Log everything that's coming out of snapshot
    let firstShuttleTime = snapshot.val().first;
    console.log("first", firstShuttleTime)
    let timeArr = firstShuttleTime.split(":");
    let hour = timeArr[0];
    let min =  timeArr[1];
    let frequencyCalc = snapshot.val().frequency;
    let tTime = moment().hours(hour).min(min);
    let latest = moment().max(tTime, moment())
    let mins; 
    let arrive;
    if(tTime == latest){
        arrive = tTime.format("hh:mm A")
        mins = tTime.diff(moment(), 'minutes')
    } else {
        let diffTime = moment().diff(tTime, "minutes");
        let r = diffTime %frequencyCalc;
        mins = frequencyCalc - r; 

        arrive = moment().add(mins, "minutes").format("hh:mm A")
    }
    console.log("hour", hour);
    console.log("min", min)
    let now = new Date(Date.now()); 
    console.log("now", now.getDate());


    // let ft_moment = moment({year: now.getFullYear(), month: now.getMonth(), date: now.getDate(), hour: hour, min: min})
    // 
    // nextDepart = firstShuttleTime + currentTime;
    // minutesUntil = nextDepart - currentTime;
    // let mU = ft_moment.add(frequencyCalc, 'minutes').fromNow()
    // console.log(snapshot.val());
    // Change the HTML to reflect DB info
    $("#theChartFill").append(
        $(`<tr>
        <td> ${snapshot.val().shuttle || "Dark Side Shuttles" }</td>  
        <td> ${snapshot.val().terminal || "Paris"}</td> 
        <td> ${snapshot.val().frequency || 0600}</td> 
        <td> ${arrive} </td> 
        <td> ${mins}</td> 
        </tr>`));



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
    console.log("shut", shuttle)
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