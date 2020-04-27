firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	  
		if ($(window).width() < 720) {
		   document.getElementById("addmovesBtndesc").style.display = "block";
		} else {
			document.getElementById("addmovesBtndesc").style.display = "none";
		}

	  
	  
	  document.getElementById("adminLogOutBtn").style.display = "block";
	  document.getElementById("adminLoginBtn").style.display = "none";
	  document.getElementById("addmovesBtn").style.display = "absolute";
	  tableData();
	  
    var user = firebase.auth().currentUser;

  } else {
    // No user is signed in.

	  document.getElementById("adminLogOutBtn").style.display = "none";
	  document.getElementById("adminLoginBtn").style.display = "block";
	  document.getElementById("addmovesBtn").style.display = "none";
	  tableData();

  }
});

function logout(){
  firebase.auth().signOut();
}

var database = firebase.database();

function tableData(){
	
	 database.ref('/TableRows').once('value', function(snapshot){
        if(snapshot.exists()){
			
			document.getElementById("moveLoadContainer").style.display = "none";
			
            var content = '';
            snapshot.forEach(function(data){
                var val = data.val();
                content +='<tr>';
                if (val.video == true) {
					content += '<td>' + '<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + val.img + '" frameborder="0" allowfullscreen>'+'</iframe>'+ '</td>';
					
				} else {
					 content += '<td>' + '<img src='+'"'+val.img+'"'+ 'width="100%">'+ '</td>';
					
				}
                content += '<td>' + val.move + '</td>';
                content += '<td>' + val.desc + '</td>';
                content += '</tr>';
            });
            $('#grapplingTable').append(content);
        } else {
			document.getElementById("moveLoadContainer").style.display = "none";
		}
    });
}

function openMoveEditor(){

	firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
   		
		if (document.getElementById("newMoveWrapper").style.display == "none"){
			document.getElementById("newMoveWrapper").style.display = "block";
		} else {
			document.getElementById("newMoveWrapper").style.display = "none";
		}
		
	} else {
		console.log("Not Verified!");
	}
	
});
}


let imageURLInput = document.getElementById("imageUrl");
let youtubeURLInput = document.getElementById("youtubeUrl");
let imageUploadInput = document.getElementById("imageInput");

function sendNewMove(){
	
		let moveName = $('#newmovename').html();
		let description = $('#newdesc').html();
		let newUploadedImageUrl = null;
	
	if (youtubeUrlBtn && youtubeURLInput.value == ""){
			uploadError();
		
		} else if (imageUrlBtn && imageURLInput.value == "") {
			uploadError();
			
		} else if (uploadImageBtn && imageUploadInput.files.length == 0){
			uploadError();
		
		} else {
	
	if(description == "" || moveName == "" || description == "Write the description here" || moveName == "Edit Move Name Here") {
		
		uploadError();
		
	} else {
		
		document.getElementById("uploadedMsg").style.display = "none";
		document.getElementById("errorMsg").style.display = "none";
		
		if (youtubeUrlBtn == true){
			document.getElementById("uploadMoveBtn").disabled = true;
			let newYoutubeUrl = document.getElementById("youtubeUrl").value
			let videoId = getId(newYoutubeUrl);
			sendData("", videoId,description,moveName,true);
			
		} else if (imageUrlBtn == true){
			document.getElementById("uploadMoveBtn").disabled = true;
			let newImageUrl = document.getElementById("imageUrl").value
	
			sendData(newImageUrl, "",description,moveName,false);
			
		} else if (uploadImageBtn == true){
			
			(async () => {
				
				document.getElementById("uploadMoveBtn").disabled = true;
				newUploadedImageUrl = await uploadImg();
				
				sendData(newUploadedImageUrl, "",description,moveName,false);
				
			})()
			
		}
		
		function sendData(imgLink, videoId, desc, movetype, isVid){
			let dataRef = database.ref('/TableRows').push();
			
			if (!isVid && videoId == ""){
				
				  dataRef.set({
					desc: desc,
					img: imgLink,
					move: movetype,
					video: isVid
				  });
			document.getElementById("uploadedMsg").style.display = "block";
			document.getElementById("uploadMoveBtn").disabled = false;
			$('.empty').empty();
			$('.empty').empty();
			imageURLInput.value = "";
			$("#imageInput").replaceWith($("#imageInput").val('').clone(true));
				
			} else if (isVid){
				
				dataRef.set({
					desc: desc,
					img: videoId,
					move: movetype,
					video: isVid
				  });
			document.getElementById("uploadedMsg").style.display = "block";
			document.getElementById("errorMsg").style.display = "none";
			$('.empty').empty();
			$('.empty').empty();
			youtubeURLInput.value = "";
			}
			document.getElementById("uploadMoveBtn").disabled = false;
		}
		
	}	
}

}

function uploadError(){
		document.getElementById("uploadedMsg").style.display = "none";
		document.getElementById("errorMsg").style.display = "block";
		document.getElementById("errorMsg").innerHTML = "Error! You must write a description, move name, and add an image / video link / image url";
}

async function uploadImg(){
		
		const file = document.querySelector('#imageInput').files[0]

			let ref = firebase.storage().ref('/images/' + file.name)
			const name = (+new Date()) + '-' + file.name;
			const metadata = {
			  contentType: file.type
			};
			
			const task = ref.child(name).put(file, metadata)
			
			const data = task.then(snapshot => snapshot.ref.getDownloadURL())
			  .then((url) => {
				return url
			  })
			 .catch(console.error);
		
	return await data;
}

// =========================== Selection for Upload

let youtubeUrlBtn = false;
let imageUrlBtn = false;
let uploadImageBtn = true;

function youtubeUrl(){
	youtubeUrlBtn = true;
	imageUrlBtn = false;
	uploadImageBtn = false;
	document.getElementById("youtubeUrlBtn").style.backgroundColor = "#2980b9";
	document.getElementById("imageUrlBtn").style.backgroundColor = "#3498db";
	document.getElementById("uploadImgBtn").style.backgroundColor = "#3498db";
	document.getElementById("youtubeUrl").style.display = "block";
	document.getElementById("imageUrl").style.display = "none";
	document.getElementById("imageInput").style.display = "none";
}

function imageUrl(){
	youtubeUrlBtn = false;
	imageUrlBtn = true;
	uploadImageBtn = false;
	document.getElementById("youtubeUrlBtn").style.backgroundColor = "#3498db";
	document.getElementById("imageUrlBtn").style.backgroundColor = "#2980b9";
	document.getElementById("uploadImgBtn").style.backgroundColor = "#3498db";
	document.getElementById("youtubeUrl").style.display = "none";
	document.getElementById("imageUrl").style.display = "block";
	document.getElementById("imageInput").style.display = "none";
}

function uploadImage(){
	youtubeUrlBtn = false;
	imageUrlBtn = false;
	uploadImageBtn = true;
	document.getElementById("youtubeUrlBtn").style.backgroundColor = "#3498db";
	document.getElementById("imageUrlBtn").style.backgroundColor = "#3498db";
	document.getElementById("uploadImgBtn").style.backgroundColor = "#2980b9";
	document.getElementById("youtubeUrl").style.display = "none";
	document.getElementById("imageUrl").style.display = "none";
	document.getElementById("imageInput").style.display = "block";
}

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}
								   