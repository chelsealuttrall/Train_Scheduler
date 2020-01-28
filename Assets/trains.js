var firebaseConfig = {
    apiKey: "api-key",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id",
};


let shuttleCompany = {
    shuttle: "Dark Side Passages",
    terminal: "Paris",
    frequency: "6 Hours",
    firstDepart: "0600 AM",
}

let nextDepartureTime

let minutesUntilDeparture

let submit

//Set up how database

//firebase.initializeApp()


//on the submit click, pull info from form 
$("#submit").click(function() {
    $("#shuttlecompany").val()

}) console.log($("#shuttlecompany").val());



//put pulled info on chart and in firebase
$(shuttleCompany.shuttle).append(tr.material)