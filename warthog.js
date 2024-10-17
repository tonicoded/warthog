document.addEventListener('DOMContentLoaded', function() {
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
// Easter egg: Random warthog sound on certain interaction
document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.icon-container img');
    const warthogSound = new Audio('warthog.mp3');
    
    icons.forEach(icon => {
      icon.addEventListener('click', () => {
        if (Math.random() > 0.7) { // Random chance of sound playing
          warthogSound.play();
        }
      });
    });
  });
  