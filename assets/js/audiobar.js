// Get the audio element
const audio = document.getElementById("audio");

// Get the volume control input
const volumeControl = document.getElementById("volumeControl");

// Set initial volume based on the value of the volume control
audio.volume = volumeControl.value;

// Update the volume when the user changes the volume control
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});
