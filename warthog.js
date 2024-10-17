document.addEventListener('DOMContentLoaded', function() {
    // Function to play the sound on user interaction
    function playWarthogSound() {
        const warthogSound = new Audio('warthog.mp3');
        warthogSound.play().catch(function() {
            console.log('Audio playback prevented by browser autoplay policy');
        });
    }

    // Detect any user interaction: click, keypress, or scroll
    function handleUserInteraction() {
        playWarthogSound();
        document.removeEventListener('click', handleUserInteraction); // Play only once
        document.removeEventListener('scroll', handleUserInteraction);
        document.removeEventListener('keypress', handleUserInteraction);
    }

    // Listen for first interaction (click, scroll, or keypress)
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('keypress', handleUserInteraction);

    // GIF Background Logic
    const gifContainer = document.querySelector('.gif-container');
    const gifs = [
        'gifs/1.gif', 
        'gifs/2.gif', 
        'gifs/3.gif', 
        'gifs/4.gif', 
        'gifs/5.gif', 
        'gifs/6.gif'
    ];

    function fillBackground() {
        gifContainer.innerHTML = ''; // Clear previous content
        const tileSize = window.innerWidth <= 768 ? 100 : 200; // Use smaller tiles for mobile
        const rows = Math.ceil(window.innerHeight / tileSize); // Adjust for tile height
        const columns = Math.ceil(window.innerWidth / tileSize); // Adjust for tile width
        const totalTiles = rows * columns;

        for (let i = 0; i < totalTiles; i++) {
            const gifDiv = document.createElement('div');
            gifDiv.classList.add('gif');
            gifDiv.style.backgroundSize = `${tileSize}px ${tileSize}px`; // Ensure background size fits
            const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
            gifDiv.style.backgroundImage = `url(${randomGif})`;
            gifContainer.appendChild(gifDiv);
        }
    }

    fillBackground(); // Initial call to fill the background

    window.addEventListener('resize', fillBackground); // Refill background on window resize
});
