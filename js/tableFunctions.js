function moveTableSearch() {

  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("moveSearchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("grapplingTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function meetingTableSearch() {

  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("meetingSearchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("meetingTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

var hidden = true;

function hideShowDesc() {

    var rows = document.getElementById('grapplingTable').rows;

    if (hidden == true){

        hidden = false;

            for(var i = 0, len = rows.length; i < len; i++) {
            rows[ i ].cells[ rows[ i ].cells.length - 1].style.display = 'table-cell';
        }
     document.getElementById("showhidedescbtn").innerHTML = "Hide Descriptions";
        
    } else if (hidden == false) {

        hidden = true;
        
         for(var l = 0, len2 = rows.length; l < len2; l++) {
            rows[ l ].cells[ rows[ l ].cells.length - 1].style.display = 'none';
        }
        
        document.getElementById("showhidedescbtn").innerHTML = "Show Descriptions";
    }
    
}

function hideShowImages() {

    var rows = document.getElementById('meetingTable').rows;

    if (hidden == true){

        hidden = false;

            for(var i = 0, len = rows.length; i < len; i++) {
            rows[ i ].cells[ rows[ i ].cells.length - 1].style.display = 'table-cell';
        }
     document.getElementById("showhideimgbtn").innerHTML = "Hide Images";
        
    } else if (hidden == false) {

        hidden = true;
        
         for(var l = 0, len2 = rows.length; l < len2; l++) {
            rows[ l ].cells[ rows[ l ].cells.length - 1].style.display = 'none';
        }
        
        document.getElementById("showhideimgbtn").innerHTML = "Show Images";
    }
    
}



function tableFix(){
    
    var x = window.innerWidth;
    var rows = document.getElementById('grapplingTable').rows;
    
    if (x>=720) {
        
        for(var j = 0, len3 = rows.length; j < len3; j++) {
            rows[ j ].cells[ rows[ j ].cells.length - 1].style.display = 'table-cell';
        }
        document.getElementById("showhidedescbtn").innerHTML = "Hide Descriptions";

    } 
    
}

function tableFixMeeting(){
    
    var x = window.innerWidth;
    var rows = document.getElementById('meetingTable').rows;
    
    if (x>=720) {
        
        for(var j = 0, len3 = rows.length; j < len3; j++) {
            rows[ j ].cells[ rows[ j ].cells.length - 1].style.display = 'table-cell';
        }
        document.getElementById("showhideimgbtn").innerHTML = "Hide Images";

    } 
    
}