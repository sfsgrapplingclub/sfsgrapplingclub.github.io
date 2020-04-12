firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

	  
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
		console.log("testing123");
        if(snapshot.exists()){
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
        }
    });
}

function openMoveEditor(){
	console.log("Function called");
	firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
   		
		document.getElementById("newMoveWrapper").style.display = "block";
		
		
	} else {
		console.log("Not Verified!");
	}
	
});
}


function sendNewMove(){
	
		let moveName = $('#newmovename').html();
		let description = $('#newdesc').html();
		let newUploadedImageUrl = null;
		
	if(description == "" || moveName == "" || description == "Write the description here" || moveName == "Edit Move Name Here") {
		
		document.getElementById("uploadedMsg").style.display = "none";
		document.getElementById("errorMsg").style.display = "block";
		document.getElementById("errorMsg").innerHTML = "Error! You must write a description, move name, and add an image / video link / image url";
		
	} else {
		
		document.getElementById("uploadedMsg").style.display = "none";
		document.getElementById("errorMsg").style.display == "none";
		
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
			
			console.log("Send Data")
			let dataRef = database.ref('/TableRows').push();
			
			if (!isVid && videoId == ""){
				
				console.log("Uploading 999999");
				
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
				
			} else if (isVid){
				
				dataRef.set({
					desc: desc,
					img: videoId,
					move: movetype,
					video: isVid
				  });
			document.getElementById("uploadedMsg").style.display = "block";
			$('.empty').empty();
			$('.empty').empty();
			}
			document.getElementById("uploadMoveBtn").disabled = false;
		}
		
	}	

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
				//console.log(url);
				console.log("Successfully uploaded image");
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






									   