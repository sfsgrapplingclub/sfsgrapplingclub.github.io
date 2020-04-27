firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	  document.getElementById("adminLogOutBtn").style.display = "block";
	  document.getElementById("adminLoginBtn").style.display = "none";
	  
    var user = firebase.auth().currentUser;

  } else {
    // No user is signed in.
	  document.getElementById("adminLogOutBtn").style.display = "none";
	  document.getElementById("adminLoginBtn").style.display = "block";

  }
});

function logout(){
  firebase.auth().signOut();
}
