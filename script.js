document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote');
    const authorText = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const quoteContainer = document.querySelector('.quote-container');
    const yearSpan = document.getElementById('year');
    const musicControlButton = document.getElementById('music-control');
    const volumeSlider = document.getElementById('volume-slider'); // Volume slider input
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;

    async function fetchQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            quoteText.textContent = `"${data.content}"`;
            authorText.textContent = `- ${data.author}`;
            // Trigger the bounce animation
            quoteContainer.classList.add('bounce');
            setTimeout(() => {
                quoteContainer.classList.remove('bounce');
            }, 500);
        } catch (error) {
            quoteText.textContent = "An error occurred. Please try again.";
            authorText.textContent = "";
        }
    }

    newQuoteButton.addEventListener('click', fetchQuote);

    musicControlButton.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicControlButton.textContent = "Play Music";
        } else {
            backgroundMusic.play();
            musicControlButton.textContent = "Pause Music";
        }
        isMusicPlaying = !isMusicPlaying;
    });

    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value / 100; // Convert volume to a value between 0 and 1
        backgroundMusic.volume = volume; // Set the volume of the audio element
    });

    // Set the src attribute of the audio element to background-music.mp3
    backgroundMusic.src = 'background-music.mp3';

    // Fetch a quote when the page loads
    fetchQuote();

    // Set the current year in the footer
    yearSpan.textContent = new Date().getFullYear();
});
