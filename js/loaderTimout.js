//meetingLoadContainer

window.onload = function(){
   setInterval(function(){
       document.getElementById('meetingLoadContainer').style.display = "none";
       document.getElementById('noMeetingError').style.display = "block";
   }, 5000);
};