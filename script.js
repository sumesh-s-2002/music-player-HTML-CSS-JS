//TODO:1 get elments from DOM
const playBtn = document.querySelector(".big"),
    forwardBtn = document.querySelector(".fa-forward"),
    backwardBtn = document.querySelector(".fa-backward"),
    coverImage = document.querySelector(".cover"),
    title = document.querySelector(".music-title h4"),
    audio = document.querySelector("audio"),
    musicInfo = document.querySelector(".music-info"),
    songs = ["gimme more", "muthuchippi", "oh baby girl"]
let currentSongIdex = 0;

//laod music
function loadMusic(){
    coverImage.src = `cover/${songs[currentSongIdex]}.jpg`;
    audio.src = `music/${songs[currentSongIdex]}.mp3`;
    title.textContent = songs[currentSongIdex];
}

//TODO : 2 add event listners
playBtn.addEventListener("click", playMusic);
forwardBtn.addEventListener("click", forward);
backwardBtn.addEventListener("click", backward);
audio.addEventListener("timeupdate", updatesong);
document.querySelector(".progress-container").addEventListener("click", updateProgress)
audio.addEventListener("ended", forward)

//TODO : 3  defining play music
function playMusic(){
    isPlaying = coverImage.classList.contains("play")
    if(!isPlaying){
        loadMusic();
        playBtn.classList.add("fa-pause")
        playBtn.classList.remove("fa-play");
        coverImage.classList.add("play");
        musicInfo.classList.add("visible");
        audio.play(); 
    }else{
        pauseMusic();
    }

}
//TODO : 4 fefining pauseMusic
function pauseMusic(){
    audio.pause();
    coverImage.classList.remove("play");
    musicInfo.classList.remove("visible");
    playBtn.classList.add("fa-play");
    playBtn.classList.remove("fa-pause")
}

//TODO : 5 defining forward
function forward(){
    currentSongIdex++;
    if(currentSongIdex > songs.length - 1){
        currentSongIdex = 0;
    }
    loadMusic();
    audio.play()
}

//TODO : 6 defining backward
function backward(){
    currentSongIdex--;
    if(currentSongIdex < 0){
        currentSongIdex = songs.length-1;
    }
    loadMusic();
    audio.play()
}

//TODO : 7 defining updateMusic
function updatesong(e){
    const {currentTime, duration} = e.srcElement;
    const percent = currentTime/duration * 100;
    document.querySelector(".progress-bar").style.width = `${percent}%`;
}
//TODO : 8 defining updateProgress
function updateProgress(e){
    const width =  this.clientWidth;
    const Xoffset = e.offsetX;
    const duration = audio.duration;
    audio.currentTime  = (Xoffset/width) * duration;
    document.querySelector(".progress-bar").style.width = `${(audio.currentTime/audio.duration)*100}%`
}