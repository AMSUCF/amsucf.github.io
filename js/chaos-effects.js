// CHAOS EFFECTS - Reject sparkles, embrace ASCII chaos
// Chaotic cursor trail with block characters

let trailElements = [];
const symbols = ['▓', '▒', '░', '█', '▀', '▄', '▌', '▐', '◢', '◣', '◤', '◥', '●', '○', '◆', '◇'];
const colors = ['#d4520a', '#c1ff00', '#8b4000', '#e8ff00', '#8b0000', '#5a7247', '#536872'];

document.addEventListener('mousemove', function(e) {
    if (Math.random() < 0.15) {
        createTrail(e.clientX, e.clientY);
    }
});

function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    trail.style.position = 'fixed';
    trail.style.left = (x + (Math.random() * 20 - 10)) + 'px';
    trail.style.top = (y + (Math.random() * 20 - 10)) + 'px';
    trail.style.pointerEvents = 'none';
    trail.style.fontSize = (Math.random() * 20 + 10) + 'px';
    trail.style.zIndex = '9999';
    trail.style.color = colors[Math.floor(Math.random() * colors.length)];
    trail.style.fontFamily = 'Courier New, monospace';
    trail.style.fontWeight = '900';
    trail.style.animation = 'trailChaos 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards';
    trail.style.textShadow = '2px 2px 0 rgba(0,0,0,0.5)';

    document.body.appendChild(trail);
    trailElements.push(trail);

    if (trailElements.length > 30) {
        const oldTrail = trailElements.shift();
        if (oldTrail.parentNode) {
            oldTrail.parentNode.removeChild(oldTrail);
        }
    }

    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 800);
}

// Add CSS for trail animation if not already present
if (!document.getElementById('chaos-trail-styles')) {
    const style = document.createElement('style');
    style.id = 'chaos-trail-styles';
    style.textContent = `
        @keyframes trailChaos {
            0% {
                opacity: 0.9;
                transform: scale(1) rotate(0deg);
            }
            50% {
                opacity: 0.6;
                transform: scale(1.5) rotate(${Math.random() * 360}deg);
            }
            100% {
                opacity: 0;
                transform: scale(0.5) rotate(${Math.random() * 720}deg) translateY(20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Add page glitch effect on click
document.addEventListener('click', function(e) {
    if (Math.random() < 0.1) {
        createGlitchEffect(e.clientX, e.clientY);
    }
});

function createGlitchEffect(x, y) {
    const glitch = document.createElement('div');
    glitch.innerHTML = '[CLICK]';
    glitch.style.position = 'fixed';
    glitch.style.left = x + 'px';
    glitch.style.top = y + 'px';
    glitch.style.pointerEvents = 'none';
    glitch.style.fontSize = '24px';
    glitch.style.zIndex = '9999';
    glitch.style.color = '#e8ff00';
    glitch.style.fontFamily = 'Courier New, monospace';
    glitch.style.fontWeight = '900';
    glitch.style.animation = 'glitchPulse 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards';
    glitch.style.textShadow = '3px 3px 0 #8b0000, -3px -3px 0 #c1ff00';

    document.body.appendChild(glitch);

    setTimeout(() => {
        if (glitch.parentNode) {
            glitch.parentNode.removeChild(glitch);
        }
    }, 500);
}

// Add glitch animation
if (!document.getElementById('chaos-glitch-styles')) {
    const glitchStyle = document.createElement('style');
    glitchStyle.id = 'chaos-glitch-styles';
    glitchStyle.textContent = `
        @keyframes glitchPulse {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.7;
                transform: scale(1.5) rotate(5deg);
            }
            100% {
                opacity: 0;
                transform: scale(2) rotate(-5deg);
            }
        }
    `;
    document.head.appendChild(glitchStyle);
}

// Random element slight rotations on scroll
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(currentScroll - lastScroll) > 100) {
        const cards = document.querySelectorAll('.card, .research-card, .book-card, .content-card');
        cards.forEach(card => {
            const randomRot = (Math.random() - 0.5) * 3;
            card.style.transform = `rotate(${randomRot}deg)`;
        });
        lastScroll = currentScroll;
    }
});

// MOTION TOGGLE FUNCTIONALITY
(function() {
    // Check if motion is disabled in localStorage
    const motionDisabled = localStorage.getItem('chaosMotionDisabled') === 'true';

    // Apply motion disabled state on page load
    if (motionDisabled) {
        document.body.classList.add('motion-disabled');
    }

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const motionToggle = document.getElementById('motionToggle');

        if (!motionToggle) return;

        // Update button appearance based on state
        function updateToggleButton(isDisabled) {
            const icon = motionToggle.querySelector('.chaos-motion-toggle-icon');
            const text = motionToggle.querySelector('.chaos-motion-toggle-text');

            if (isDisabled) {
                motionToggle.classList.add('motion-off');
                icon.textContent = '⏸';
                text.textContent = 'MOTION OFF';
            } else {
                motionToggle.classList.remove('motion-off');
                icon.textContent = '▶';
                text.textContent = 'MOTION ON';
            }
        }

        // Initialize button state
        updateToggleButton(motionDisabled);

        // Toggle functionality
        motionToggle.addEventListener('click', function() {
            const isCurrentlyDisabled = document.body.classList.contains('motion-disabled');

            if (isCurrentlyDisabled) {
                // Enable motion
                document.body.classList.remove('motion-disabled');
                localStorage.setItem('chaosMotionDisabled', 'false');
                updateToggleButton(false);
                console.log('%c[MOTION ENABLED]', 'color: #c1ff00; font-size: 16px; font-weight: 900; font-family: Courier New;');
            } else {
                // Disable motion
                document.body.classList.add('motion-disabled');
                localStorage.setItem('chaosMotionDisabled', 'true');
                updateToggleButton(true);
                console.log('%c[MOTION DISABLED]', 'color: #8b0000; font-size: 16px; font-weight: 900; font-family: Courier New;');
            }
        });
    });
})();

console.log('%c[CHAOS MODE ACTIVATED]', 'color: #c1ff00; font-size: 20px; font-weight: 900; text-shadow: 3px 3px 0 #8b0000; font-family: Courier New;');
console.log('%cConventional design has left the building.', 'color: #d4520a; font-size: 14px; font-weight: 700; font-family: Courier New;');
