const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist:'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (remix)',
        artist:'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist:'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (remix)',
        artist:'Metric/jacinto design',
    },
]

// Check if Playing
let isPlaying = true;

// Play 
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play-Pause Event listner
playBtn.addEventListener('click', () => { isPlaying ? pauseSong() : playSong() });
// playBtn.addEventListener('keypress', () => { console.log(Event) });


// update -dom
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// currnet song
let songIndex = 0;

// Prev song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
        
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}


// on-load -select first song
loadSong(songs[songIndex]);

// Time and progress bar update
function updateprogrssBar(e) {
    if (isPlaying) {
        // console.log(e);

        // update progressBar
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // console.log('seconds', durationSeconds);
        if (durationSeconds) 
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        

        // calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        
        if (currentSeconds) {
            currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

// set Progress Bar
function setProgressBar(e){
    console.log(e);
    const width = this.clientWidth;
    console.log('width', width);
    const clickX = e.offsetX;
    console.log('clickX', clickX);
    const { duration } = music;
    console.log(clickX / width);
    console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

// eventlistner for next -prev button
// prevBtn.addEventListener('click', prevSong);
// nextBtn.addEventListener('click', ()=> nextSong);
prevBtn.addEventListener('click', () => prevSong());
nextBtn.addEventListener('click', () => nextSong());
music.addEventListener('timeupdate', updateprogrssBar);
music.addEventListener('ended', nextSong);
// setProgressBar();
progressContainer.addEventListener('click', setProgressBar);