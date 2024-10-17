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

    const quotes = [
        "Oink oink, get wild!", 
        "Warthogs rule the savanna!", 
        "Don't mess with a wild hog!",
        "Feeling hog-tastic today!",
        "Squeal if you love $WARTHOG!",
        "Hog life is the best life!",
        "Charge ahead, hog style!",
        "Warthogs never back down!",
        "Born to hog, live to squeal!",
        "Wild and snouty, that's $WARTHOG!",
        "Savanna-born, hog-strong!",
        "Snouts out, it's warthog time!",
        "Hog the fun, rule the savanna!",
        "Ready to squeal with $WARTHOG!",
        "Savanna kings, hog it up!",
        "Snout to snout, we're wild!",
        "Roaring with the warthogs!",
        "Oink loud, oink proud!",
        "Warthog vibes, untamed power!",
        "Join the stampede with $WARTHOG!",
        "Get wild, get hoggy!",
        "Savanna spirit, warthog heart!",
        "Ruling the wild, warthog style!",
        "Squeal and conquer with $WARTHOG!",
        "Hogs on the loose, snouts up!",
        "Warthog energy, unstoppable force!",
        "No fear, just warthogs here!",
        "Snouts high, wild and free!",
        "Hog the day with $WARTHOG!",
        "Feel the squeal, feel the power!",
        "Warthogs unite, let's charge!"
    ];
    
    function showRandomQuote() {
        const quote = document.createElement('div');
        quote.classList.add('quote');
        quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];
        document.body.appendChild(quote);
    
        // Get quote dimensions after it's added to the DOM
        const quoteRect = quote.getBoundingClientRect();
    
        // Calculate max positions to keep the quote within viewport
        const maxLeft = window.innerWidth - quoteRect.width;
        const maxTop = window.innerHeight - quoteRect.height;
    
        // Ensure the position is within the viewport
        const leftPosition = Math.random() * maxLeft;
        const topPosition = Math.random() * maxTop;
    
        quote.style.left = `${leftPosition}px`;
        quote.style.top = `${topPosition}px`;
    
        // Remove the quote after a few seconds
        setTimeout(() => {
            quote.remove();
        }, 3000); // 3 seconds
    }
    
    // Start showing quotes after the page has loaded
    window.addEventListener('load', () => {
        showRandomQuote(); // Show one immediately
        setInterval(showRandomQuote, 5000); // Show a new quote every 5 seconds
    });
    
    
});
