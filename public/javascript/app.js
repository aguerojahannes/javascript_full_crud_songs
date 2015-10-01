var songs = []; // can also do var song_array

//we need to create objects with a constructor function
var Song = function(title, artist, genre){ // typically we want constructor functions to stand out, sowe give then Uppercase name (Pascal casing)
   this.title = title; // this is pointing to whatever is called. Inside a function, the value of this depends on how the function is called.
   this.artist = artist;
   this.genre = genre;
}

var backstroke =new Song("Backstoke","Teedra Moses","R&B");
var smoking =new Song("Smoking Cigarettes", "Tweet", "R&B");
var toxic =new Song("Toxic", "Britney", "pop");
songs.push(backstroke,smoking,toxic); // The push() method adds new items to the end of an array, and returns the new length. Note: The new item(s) will be added at the end of the array. Note: This method changes the length of the array.



function displaySongs(){ // creating a function bc we're gonna use this again
   var elemString =""; // create an empty string, so they can hold songs
   for(var i=0;i<songs.length; i++) { //loop over array
      // pass in the song itself and the index of the song to get the elemString
      elemString += getElemString(songs[i], i);
                        // "<div class='well container'>" // well and container are bootstrap classes
                        // + "<h3>" + songs[i].title + "</h3>"
                        // + "<p><i>" + songs[i].artist + "</i></p><br/>"
                        // + "<p><i>" + songs[i].genre + "</i></p><br/>"
                        // + "</div>"
}
document.getElementById("songs").innerHTML = elemString;
}
displaySongs();


// Event Listener - make it for anytime a user does something
// when someone clicks the submit button, or hits enter on one of the inputs, then run this function
document.getElementById("newSongForm").addEventListener("submit", function(event){event.preventDefault();
 // takes 2 parameters: 1st) event we're looking for. 2) function (always) that tells the event what to do // preventDefault says whatever you're ab to do stop. using it here to prevent from the page refreshing

 // get the values from the nputs and store them in variables, so we can use them later. specifically e're going to use then in mySong
var title = document.getElementById("songTitle").value; // value is always linked to an input
var artist = document.getElementById("songArtist").value;
var genre = document.getElementById("songGenre").value;

//create the mySong object by calling the Song constructor
var mySong = new Song(title, artist, genre);

// add the created song into the song array with push function
songs.push(mySong); // at this point, it's adding it to the array. we know this bc it shows up in the array in console when we enter a new song, but we havent displayed it on the page yet for the user
// append the new song to the end of the list already on the index page
document.getElementById("songs").innerHTML += getElemString(mySong, songs.length -1);

                  document.getElementById("songTitle").value = ""; // this clears out the values to make input value empty string, just like how it started out
                  document.getElementById("songArtist").value = "";
                  document.getElementById("songGenre").value = "";
});


// returns the element string for us to displayed (only - after this point, we should just be able to see it)
function getElemString(song, z){
   return "<div class='well container'>" // well and container are bootstrap classes
                     + "<h3>" + song.title + "</h3>" // we changed from songs[songs.length -1].title which was looping thru the array, but because we already have a variable called mySong which holds the information for a new song, which is also the last value of the array, we can put in mySong.
                     + "<p>Artist: <i>" + song.artist + "</i><br/>"
                     + "<p>Genre: <i>" + song.genre + "</i><br/>"
                     + "<div>"
                        + "<button class='btn btn-info' onclick='editSong(" + z +")'>Edit</button>&nbsp; &nbsp; &nbsp; " // z is the index that we're passing in from line 57 getElemString(z)
                        + "<button class='btn btn-danger' onclick='deleteSong("+z+")'>Delete</button></p>"// z is the index that we're passing in from line 57 getElemString(z)
                     + "</div>"
                  + "</div>";

}

// DELETE BUTTON
// a is the song index we want to delete (refrences z in the getElemString() - it's not the new name of z)
function deleteSong(a){
   songs.splice(a, 1);
   displaySongs();
}

// EDIT BUTTON
function editSong(index){
      // Javascript way of doing jQuery below: document.getElementById("editTtle").value = songs[index].title
      $("#editTitle").val(songs[index].title); // val() with no param will gets the values, val(with stuff inside) sets the value to what's inside
      $("#editArtist").val(songs[index].artist);
      $("#editGenre").val(songs[index].genre);
      // Javascript way of doing jQuery below: document.getElementById("saveEditButton).innerHTML = "<button type="button" class="btn btn-primary">Save changes</button>"
      $("#saveEditButton").html("<button onclick='saveChanges(" + index + ")' type='button' class='btn btn-primary'>Save changes</button>");
      $('#myModal').modal('toggle');
}

function saveChanges(index){
   // var title = document.getElementById("editTitle").value;
   var title = $("#editTitle").val();
   var artist = $("#editArtist").val();
   var genre = $("#editGenre").val();

   // set the selected song equal to a new Song created from the input field values
   songs[index] = new Song(title, artist, genre);
   // clear out all the inputs
   $("#editTitle").val("");
   $("#editArtist").val("");
   $("#editGenre").val("");

   $("#myModal").modal("toggle");
   displaySongs();
}
