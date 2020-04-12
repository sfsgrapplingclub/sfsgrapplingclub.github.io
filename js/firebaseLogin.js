firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

	  console.log("signed in");
	  document.getElementById("user_div").style.display = "block";
	  document.getElementById("login_div").style.display = "none";
	  document.getElementById("adminLogOutBtn").style.display = "block";
	  document.getElementById("adminLoginBtn").style.display = "none";
	  
    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.
	  console.log("nobody in");
      document.getElementById("user_div").style.display = "none";
	  document.getElementById("login_div").style.display = "block";
	  document.getElementById("adminLogOutBtn").style.display = "none";
	  document.getElementById("adminLoginBtn").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}
window.onload = function() {
	document.getElementById("email_field").value = '';
	document.getElementById("password_field").value = '';
	
 }


var usernameInput = document.getElementById("email_field");
var passwordInput = document.getElementById("password_field");

// Execute a function when the user releases a key on the keyboard
usernameInput.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("login-form-submit").click();
  }
});

passwordInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("login-form-submit").click();
  }
});