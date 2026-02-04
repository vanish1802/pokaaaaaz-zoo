document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const btnFine = document.getElementById('btn-fine');
    const btnValentineYes = document.getElementById('btn-valentine-yes');
    
    const modal = document.getElementById('no-modal');
    const questionText = document.getElementById('main-question');
    const initialButtons = document.getElementById('initial-buttons');
    const finalButtons = document.getElementById('final-buttons');
    const body = document.body;
    const successScreen = document.getElementById('success-screen');

    // 1. Handle "No" Click
    btnNo.addEventListener('click', () => {
        modal.classList.add('visible');
        modal.classList.remove('hidden');
    });

    // 2. Handle "Fine, I'll say yes" Click (Closes modal and triggers Yes flow)
    btnFine.addEventListener('click', () => {
        modal.classList.remove('visible');
        setTimeout(() => {
            triggerValentineMode();
        }, 300);
    });

    // 3. Handle "Yes" Click
    btnYes.addEventListener('click', () => {
        triggerValentineMode();
    });

    // Function to transform UI to Valentine Mode
    function triggerValentineMode() {
        // Fade out buttons first
        initialButtons.style.opacity = '0';
        questionText.style.opacity = '0';

        setTimeout(() => {
            // Change text
            questionText.textContent = "Will you be my Valentine?";
            questionText.style.color = "#D32F2F"; // A deeper red/pink
            questionText.style.fontSize = "1.8rem";
            
            // Switch buttons
            initialButtons.classList.add('hidden');
            finalButtons.classList.remove('hidden');
            
            // Warm up background
            body.classList.add('valentine-mode');

            // Fade back in
            questionText.style.opacity = '1';
            
            // Create some sparkles/hearts effect (simple CSS classes or JS particles could go here)
            createFloatingHearts();

        }, 500);
    }

    // 4. Handle Final "Yes"
    btnValentineYes.addEventListener('click', () => {
        successScreen.classList.remove('hidden');
        setTimeout(() => {
            successScreen.classList.add('visible');
            confettiEffect();
        }, 50);
    });

    function createFloatingHearts() {
        // Simple visual effect - could adding elements
        for(let i=0; i<10; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.opacity = '0.6';
            heart.style.transition = 'all 4s ease';
            heart.style.zIndex = '500';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.top = '-100px';
                heart.style.left = `calc(${heart.style.left} + ${Math.random() * 100 - 50}px)`;
            }, 100);
            
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }
    }

    function confettiEffect() {
        // A simple Burst of emojis
        const emojis = ['🎉', '❤️', '🐯', '🐘', '🦒', '🐒'];
        const container = document.querySelector('.success-content');
        
        setInterval(() => {
            const el = document.createElement('div');
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.position = 'fixed';
            el.style.left = Math.random() * 100 + 'vw';
            el.style.top = '-50px';
            el.style.fontSize = '2rem';
            el.style.zIndex = '3000';
            el.style.transition = 'top 3s linear, opacity 3s ease';
            document.body.appendChild(el);

            setTimeout(() => {
                el.style.top = '110vh';
                el.style.opacity = '0';
            }, 100);

            setTimeout(() => {
                el.remove();
            }, 3000);
        }, 300);
    }
});
