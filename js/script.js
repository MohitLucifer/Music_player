const content = document.querySelector(".content"),
    Playimage = content.querySelector(".music-image img"),
    musicName = content.querySelector(".music-titles .name"),
    musicArtist = content.querySelector(".music-titles .artist"),
    Audio = document.querySelector(".main-song"),
    playBtn = content.querySelector(".play-pause"),
    playBtnIcon = content.querySelector(".play-pause span"),//used to change play btn
    prevBtn = content.querySelector("#prev"),
    nextBtn = content.querySelector("#next"),
    progressBar = content.querySelector(".progress-bar"),
    progressDetails = content.querySelector(".progress-details"),
    repeatBtn = content.querySelector("#repeat"),
    Shuffle = content.querySelector("#shuffle");

let index = 1;

// here we are using load event instead of onload as load event works only when all images ,selectors ,and everything is loaded 
// What is the difference between load and onload?
// load() event is that the code included inside onload function will run once the entire page(images, iframes, stylesheets,etc) are loaded
//  whereas the $(document). ready() event fires before all images,iframes etc. are loaded, but after the whole DOM itself is ready.

window.addEventListener("load", () => {
    loadData(index);
    // Audio.play();
});

function loadData(indexValue) {
    musicName.innerHTML = songs[indexValue - 1].name;
    musicArtist.innerHTML = songs[indexValue - 1].artist;
    Playimage.src = "images/" + songs[indexValue - 1].img + ".jpg";
    Audio.src = "music/" + songs[indexValue - 1].audio + ".mp3";
}
// console.log(window);

playBtn.addEventListener("click", () => {
    const isMusicPaused = content.classList.contains("paused");
    if (isMusicPaused) {
        pauseSong();
    }
    else {
        playSong();
    }
});

function playSong() {
    content.classList.add("paused");
    playBtnIcon.innerHTML = "pause";
    Audio.play();
}

function pauseSong() {
    content.classList.remove("paused");
    playBtnIcon.innerHTML = "play_arrow";
    Audio.pause();
}

// const bd= div.classList;
// console.log(bd);

nextBtn.addEventListener("click", () => {
    nextSong();
});
prevBtn.addEventListener("click", () => {
    prevSong();
});

function nextSong() {
    index++;
    if (index > songs.length) {
        index = 1;
    }
    else {
        index = index;
    }
    loadData(index);
    playSong();
}
function prevSong() {
    index--;
    if (index < 1) {
        index = songs.length;
    }
    else {
        index = index;
    }
    loadData(index);
    playSong();
}

Audio.addEventListener("timeupdate" , (e)=>{
    const initialTime = e.target.currentTime ;//give current music time
    const finaltime = e.target.duration;//get music duration
    let BarWidth = (initialTime / finaltime) * 100;
    progressBar.style.width = BarWidth + "%";

    //currentTarget directly points to parent => here currentTarget is progressDetails 
    //target ppoints to clicked element=> here target is progressBar
    progressDetails.addEventListener("click" , (e)=>{
    let progressValue = e.currentTarget.clientWidth;//get width of progress bar , we also use 
                      //progressDetails.clientWidth;
    let clickedOffsetX = e.offsetX;//get offset x Value
    let MusicDuration = Audio.duration; // we can also use finaltime in place of Audio.duration 
                      //finaltime;                // get total music duration
    Audio.currentTime = (clickedOffsetX / progressValue ) * MusicDuration;
    // console.log(e);
 });
// console.log(e);  
// The provided double value is non-finite.

Audio.addEventListener("loadeddata" , ()=> {
    let finalTimeData = content.querySelector(".final");

    //update final duration on song change 
    let AudioDuration = Audio.duration;
    let finalMinutes = Math.floor(AudioDuration / 60);
    let finalSeconds = Math.floor(AudioDuration % 60);
    if(finalSeconds < 10 ){
        finalSeconds = "0" + finalSeconds ;
    }
    finalTimeData.innerText = finalMinutes + ":" + finalSeconds;
});
   //update current Duration 
   
   let currentTimeData = content.querySelector(".current");
   let CurrentTime = Audio.currentTime;
   let currentMinutes = Math.floor(CurrentTime / 60);
   let currentSeconds = Math.floor(CurrentTime % 60);
    if(currentSeconds < 10 ){
        currentSeconds = "0" + currentSeconds ;
    }
    currentTimeData.innerText = currentMinutes + ":" + currentSeconds;

    //repeat button logic 
    repeatBtn.addEventListener("click" , ()=>{
        Audio.currentTime = 0;
    });

    //shuffle logic 
    Shuffle.addEventListener("click" , ()=>{
        // console.log(Math.random())
        var randIndex = Math.floor(Math.random() * songs.length) + 1;
        loadData(randIndex);
        playSong();
    }) 

    Audio.addEventListener("ended" , ()=>{
        index++;
        if(index > songs.length){
            index = 1;
        }
        loadData(index);
        playSong();
    })
});