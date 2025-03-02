// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const accordionButtons = document.querySelectorAll('.accordion-button');
const serveDemoBtn = document.getElementById('serveDemoBtn');
const rallyDemoBtn = document.getElementById('rallyDemoBtn');
const scoringDemoBtn = document.getElementById('scoringDemoBtn');
const gameplayAnimation = document.getElementById('gameplayAnimation');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const findGamesBtn = document.getElementById('findGamesBtn');
const locationSearch = document.getElementById('locationSearch');
const gameResults = document.getElementById('gameResults');

// Navigation Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && !e.target.closest('#menuToggle') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Navigation active state based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Accordion functionality
accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;
        
        // Toggle the current accordion item
        button.classList.toggle('active');
        
        if (button.classList.contains('active')) {
            accordionContent.style.display = 'block';
            accordionContent.classList.add('active');
        } else {
            accordionContent.style.display = 'none';
            accordionContent.classList.remove('active');
        }
    });
});

// Gameplay animations
const animations = {
    serve: `
        <div class="animation-scene">
            <div class="court-animation">
                <div class="team-area team-a">Server</div>
                <div class="neutral-area neutral-1">Neutral</div>
                <div class="neutral-area neutral-2">Neutral</div>
                <div class="team-area team-b">Receiver</div>
            </div>
            <div class="ball"></div>
            <div class="player server-1"></div>
            <div class="player server-2"></div>
            <div class="player receiver-1"></div>
            <div class="player receiver-2"></div>
            <div class="animation-text">Server hits ball to bounce in nearest neutral area first</div>
        </div>
    `,
    rally: `
        <div class="animation-scene">
            <div class="court-animation">
                <div class="team-area team-a">Team A</div>
                <div class="neutral-area neutral-1">Neutral</div>
                <div class="neutral-area neutral-2">Neutral</div>
                <div class="team-area team-b">Team B</div>
            </div>
            <div class="ball rally"></div>
            <div class="player team-a-player1"></div>
            <div class="player team-a-player2"></div>
            <div class="player team-b-player1"></div>
            <div class="player team-b-player2"></div>
            <div class="animation-text">Ball must bounce in neutral zone before opponent can hit it</div>
        </div>
    `,
    scoring: `
        <div class="animation-scene">
            <div class="court-animation">
                <div class="team-area team-a">Team A</div>
                <div class="neutral-area neutral-1">Neutral</div>
                <div class="neutral-area neutral-2">Neutral</div>
                <div class="team-area team-b">Team B</div>
            </div>
            <div class="ball scoring"></div>
            <div class="player team-a-player1"></div>
            <div class="player team-a-player2"></div>
            <div class="player team-b-player1"></div>
            <div class="player team-b-player2"></div>
            <div class="score">+1 Point!</div>
            <div class="animation-text">Score when ball bounces twice after hitting neutral zone</div>
        </div>
    `
};

// Animation button handlers
serveDemoBtn.addEventListener('click', () => {
    showAnimation('serve');
    setActiveButton(serveDemoBtn);
});

rallyDemoBtn.addEventListener('click', () => {
    showAnimation('rally');
    setActiveButton(rallyDemoBtn);
});

scoringDemoBtn.addEventListener('click', () => {
    showAnimation('scoring');
    setActiveButton(scoringDemoBtn);
});

// Function to handle animation display
function showAnimation(type) {
    gameplayAnimation.innerHTML = animations[type];
    
    // Remove any existing animation style elements
    const existingStyles = document.querySelectorAll('.animation-styles');
    existingStyles.forEach(style => style.remove());
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.className = 'animation-styles';
    style.textContent = `
        .animation-scene {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: var(--secondary);
            border-radius: var(--border-radius);
            min-height: 300px;
        }
        
        .court-animation {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            position: absolute;
            bottom: 20px;
            left: 10px;
            right: 10px;
            height: 120px;
            grid-gap: 2px;
        }
        
        .court-animation > div {
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            color: var(--text-light);
        }
        
        .team-area {
            background-color: rgba(255, 209, 0, 0.2) !important;
        }
        
        .ball {
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: white;
            border-radius: 50%;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }
        
        .player {
            position: absolute;
            width: 30px;
            height: 30px;
            background-color: var(--primary);
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
        
        .animation-text {
            position: absolute;
            top: 20px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 0.9rem;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: var(--border-radius);
            color: var(--text-light);
            margin: 0 20px;
        }
        
        .score {
            position: absolute;
            color: var(--primary);
            font-weight: bold;
            font-size: 1.5rem;
            animation: fadeInOut 2s infinite;
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    
    // Add additional CSS specific to animation types
// For the serve case:
case 'serve':
    style.textContent += `
        .ball {
            top: 40%;
            left: 20%;
            animation: serveBall 4s infinite;
        }
        
        .server-1 {
            bottom: 50px;
            left: 30px;
            animation: serverMove 4s infinite;
        }
        
        .server-2 {
            bottom: 50px;
            left: 70px;
        }
        
        .receiver-1 {
            bottom: 50px;
            right: 30px;
        }
        
        .receiver-2 {
            bottom: 50px;
            right: 70px;
        }
        
        @keyframes serveBall {
            0% { top: 40%; left: 20%; }
            20% { top: 30%; left: 35%; }
            40% { top: 60%; left: 50%; } /* Bounce in neutral zone */
            60% { top: 40%; left: 65%; }
            80% { top: 60%; left: 80%; } /* Second bounce in receiver area */
            100% { top: 40%; left: 20%; }
        }
        
        @keyframes serverMove {
            0% { transform: translateY(0); }
            15% { transform: translateY(-20px); }
            30% { transform: translateY(0); }
            100% { transform: translateY(0); }
        }
    `;
    break;

// For the rally case:
case 'rally':
    style.textContent += `
        .ball.rally {
            animation: rallyBall 6s infinite;
        }
        
        .team-a-player1 {
            bottom: 50px;
            left: 30px;
            animation: teamA1Move 6s infinite;
        }
        
        .team-a-player2 {
            bottom: 50px;
            left: 70px;
            animation: teamA2Move 6s infinite;
        }
        
        .team-b-player1 {
            bottom: 50px;
            right: 30px;
            animation: teamB1Move 6s infinite;
        }
        
        .team-b-player2 {
            bottom: 50px;
            right: 70px;
            animation: teamB2Move 6s infinite;
        }
        
        @keyframes rallyBall {
            0% { top: 60%; left: 20%; }
            10% { top: 30%; left: 35%; }
            20% { top: 60%; left: 50%; } /* Bounce in first neutral zone */
            30% { top: 30%; left: 80%; }
            40% { top: 60%; left: 80%; } /* Bounce in team B area */
            50% { top: 30%; left: 65%; }
            60% { top: 60%; left: 50%; } /* Bounce in second neutral zone */
            70% { top: 30%; left: 35%; }
            80% { top: 60%; left: 20%; } /* Bounce in team A area */
            90% { top: 30%; left: 20%; }
            100% { top: 60%; left: 20%; }
        }
        
        @keyframes teamA1Move {
            0% { transform: translateX(0); }
            10% { transform: translateX(20px); }
            70% { transform: translateX(40px); }
            80% { transform: translateX(0); }
            100% { transform: translateX(0); }
        }
        
        @keyframes teamA2Move {
            0% { transform: translateX(0); }
            75% { transform: translateX(-20px); }
            85% { transform: translateX(0); }
            100% { transform: translateX(0); }
        }
        
        @keyframes teamB1Move {
            30% { transform: translateX(0); }
            40% { transform: translateX(-20px); }
            50% { transform: translateX(0); }
            100% { transform: translateX(0); }
        }
        
        @keyframes teamB2Move {
            20% { transform: translateX(0); }
            35% { transform: translateX(20px); }
            45% { transform: translateX(0); }
            100% { transform: translateX(0); }
        }
    `;
    break;

// For the scoring case:
case 'scoring':
    style.textContent += `
        .ball.scoring {
            animation: scoringBall 4s infinite;
        }
        
        .team-a-player1 {
            bottom: 50px;
            left: 30px;
        }
        
        .team-a-player2 {
            bottom: 50px;
            left: 70px;
            animation: teamAThrow 4s infinite;
        }
        
        .team-b-player1 {
            bottom: 50px;
            right: 30px;
            animation: missedBall 4s infinite;
        }
        
        .team-b-player2 {
            bottom: 50px;
            right: 70px;
            animation: missedBall2 4s infinite;
        }
        
        .score {
            top: 50%;
            right: 80px;
        }
        
        @keyframes scoringBall {
            0% { top: 40%; left: 20%; }
            20% { top: 30%; left: 35%; }
            40% { top: 60%; left: 50%; } /* First bounce in neutral zone */
            60% { top: 30%; left: 65%; }
            80% { top: 60%; left: 80%; } /* Second bounce in team B area - point scored */
            100% { top: 60%; left: 80%; opacity: 0; }
        }
        
        @keyframes teamAThrow {
            0% { transform: translateY(0); }
            15% { transform: translateY(-15px); }
            30% { transform: translateY(0); }
            100% { transform: translateY(0); }
        }
        
        @keyframes missedBall {
            0% { transform: translateX(0); }
            40% { transform: translateX(-25px); }
            60% { transform: translateX(-25px) rotate(5deg); }
            80% { transform: translateX(0) rotate(0); }
            100% { transform: translateX(0); }
        }
        
        @keyframes missedBall2 {
            0% { transform: translateX(0); }
            40% { transform: translateX(25px); }
            60% { transform: translateX(25px) rotate(-5deg); }
            80% { transform: translateX(0) rotate(0); }
            100% { transform: translateX(0); }
        }
    `;
    break;
    }
    
    // Add the style element to the document
    document.head.appendChild(style);
}

// Set active button
function setActiveButton(button) {
    // Remove active class from all buttons
    [serveDemoBtn, rallyDemoBtn, scoringDemoBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to the clicked button
    button.classList.add('active');
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('[name="name"]').value;
        const email = contactForm.querySelector('[name="email"]').value;
        const message = contactForm.querySelector('[name="message"]').value;
        
        // Simple form validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        setTimeout(() => {
            // Clear form fields
            contactForm.reset();
            
            // Show success message
            formSuccess.classList.add('active');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('active');
            }, 5000);
        }, 1000);
    });
}

// Find games functionality
if (findGamesBtn && locationSearch && gameResults) {
    findGamesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const location = locationSearch.value.trim();
        
        if (!location) {
            alert('Please enter a location to search for games.');
            return;
        }
        
        // Simulate loading
        gameResults.innerHTML = '<p class="loading">Searching for PLB games near ' + location + '...</p>';
        
        // Simulate API call with sample data
        setTimeout(() => {
            // Sample game data
            const sampleGames = [
                {
                    name: 'Community Center PLB',
                    location: 'Westside Community Center',
                    address: '123 Main St, ' + location,
                    day: 'Mondays',
                    time: '6:00 PM - 8:00 PM',
                    level: 'All levels',
                    contact: 'john@example.com'
                },
                {
                    name: 'Parking Lot League',
                    location: location + ' Mall - South Parking',
                    address: '456 Commerce Dr, ' + location,
                    day: 'Saturdays',
                    time: '10:00 AM - 2:00 PM',
                    level: 'Intermediate/Advanced',
                    contact: 'plbleague@example.com'
                },
                {
                    name: 'University PLB Club',
                    location: location + ' University',
                    address: 'University Campus, ' + location,
                    day: 'Thursdays',
                    time: '4:00 PM - 6:00 PM',
                    level: 'Beginners welcome',
                    contact: 'university@example.com'
                }
            ];
            
            // Create results HTML
            let resultsHTML = `
                <h4>PLB Games found near ${location}:</h4>
                <div class="games-list">
            `;
            
            sampleGames.forEach(game => {
                resultsHTML += `
                    <div class="game-card">
                        <h5>${game.name}</h5>
                        <p><strong>Location:</strong> ${game.location}</p>
                        <p><strong>Address:</strong> ${game.address}</p>
                        <p><strong>Schedule:</strong> ${game.day}, ${game.time}</p>
                        <p><strong>Level:</strong> ${game.level}</p>
                        <p><strong>Contact:</strong> ${game.contact}</p>
                    </div>
                `;
            });
            
            resultsHTML += `
                </div>
                <style>
                    .games-list {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                        gap: 20px;
                        margin-top: 20px;
                    }
                    
                    .game-card {
                        background-color: var(--secondary);
                        color: var(--text-light);
                        padding: 20px;
                        border-radius: var(--border-radius);
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    
                    .game-card h5 {
                        color: var(--primary);
                        margin-bottom: 10px;
                        font-size: 1.2rem;
                    }
                    
                    .game-card p {
                        margin-bottom: 8px;
                        font-size: 0.9rem;
                    }
                    
                    .loading {
                        text-align: center;
                        padding: 20px;
                        font-style: italic;
                    }
                </style>
            `;
            
            // Update results
            gameResults.innerHTML = resultsHTML;
        }, 1500);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Initialize the first animation by default
window.addEventListener('DOMContentLoaded', () => {
    showAnimation('serve');
    setActiveButton(serveDemoBtn);
    
    // Initialize any open accordions
    accordionButtons.forEach(button => {
        if (button.classList.contains('active')) {
            const accordionContent = button.nextElementSibling;
            accordionContent.style.display = 'block';
        }
    });
});
