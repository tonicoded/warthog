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
        "Stay wild, stay hoggy!",
        "Rootin' around for $WARTHOG!",
        "In the hog we trust!",
        "Warthogs always charge forward!",
        "Get hog-wild or get left behind!",
        "Wallow in the glory of $WARTHOG!",
        "It's a hog-eat-hog world!",
        "No tusk, no glory!",
        "Born to be wild, bred to $WARTHOG!",
        "Not all heroes wear capes, some grow tusks!",
        "The hog revolution has begun!",
        "Time to go hog-wild with $WARTHOG!",
        "Squealin' and dealin' in the savanna!",
        "Snout to the moon with $WARTHOG!",
        "Hoggin' the spotlight, one coin at a time!",
        "When in doubt, go full warthog!",
        "Keep calm and hog on!",
        "$WARTHOG to the moon, one tusk at a time!",
        "Don’t just dream it, squeal it!",
        "Snout out of trouble and into $WARTHOG!",
        "When the going gets tough, the hogs get going!",
        "Root for the $WARTHOG, squeal for the future!",
        "Wild tusks, wilder gains!",
        "The savanna's calling, and so is $WARTHOG!",
        "It's a hog’s life for me!",
        "Oink loud, oink proud!",
        "Got tusks? Get $WARTHOG!",
        "Join the herd, embrace the wild!",
        "Tusk up, snout out, it's $WARTHOG time!",
        "Runnin' wild, makin' gains!",
        "Warthog warriors never back down!",
        "Piggy banks? No thanks, we're tuskin' it!",
        "Charge ahead with $WARTHOG in your tusks!",
        "Hogs of the savanna, unite!",
        "The savanna never sleeps, and neither does $WARTHOG!",
        "Tusk it till you make it!",
        "Hog the limelight with $WARTHOG!",
        "Tusk-tastic times ahead with $WARTHOG!",
        "Pigs might fly, but warthogs soar!",
        "Tusks up for $WARTHOG!",
        "Wallow in success, wallow in $WARTHOG!",
        "Oink your way to the top!",
        "Run wild, run free, run with $WARTHOG!",
        "The tusk is real, the gains are too!",
        "Warthog wonder, tusk thunder!"
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
