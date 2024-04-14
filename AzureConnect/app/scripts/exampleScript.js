document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('background-video');
    var playButton = document.getElementById('play-button');

    playButton.addEventListener('click', function () {
        video.play();
        smoothPlayback(video, 5); // Start with a faster playback rate
        playButton.style.display = 'none'; // Hide the button after clicking
    });
});

function smoothPlayback(video, initialPlaybackRate) {
    var duration = video.duration;
    var decreaseFactor = 0.15; // Rate of decrease per time interval
    var intervalDuration = 100; // Milliseconds between adjustments
    var currentPlaybackRate = initialPlaybackRate;

    var interval = setInterval(function () {
        // Gradually decrease playback rate as video approaches end
        if (video.currentTime > duration - 10) { // Adjust the duration as needed
            currentPlaybackRate -= decreaseFactor;
            if (currentPlaybackRate <= 1) {
                currentPlaybackRate = 1; // Ensure playback rate doesn't go below 1
            }
            video.playbackRate = currentPlaybackRate;
        }
    }, intervalDuration);

    // Clear interval when the video ends
    video.addEventListener('ended', function () {
        clearInterval(interval);
    });
}