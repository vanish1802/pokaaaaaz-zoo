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

    // Checkboxes
    const check1 = document.getElementById('check1');
    const check2 = document.getElementById('check2');
    const check3 = document.getElementById('check3');
    const checkboxes = [check1, check2, check3];

    // Initial State: Disable buttons
    toggleButtons(false);

    // Event listener for checkboxes
    checkboxes.forEach(box => {
        box.addEventListener('change', () => {
            const allChecked = checkboxes.every(box => box.checked);
            toggleButtons(allChecked);
        });
    });

    function toggleButtons(enabled) {
        btnNo.disabled = !enabled;
        btnYes.disabled = !enabled;
    }

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
        // initialButtons.style.opacity = '0'; // WE DO NOT FADE OUT CONTAINER ANYMORE
        btnNo.style.display = 'none'; // HIDE NO BUTTON

        questionText.style.opacity = '0';

        setTimeout(() => {
            // Change text
            questionText.textContent = "Will you be my Valentine?";
            questionText.style.color = "#D32F2F"; // A deeper red/pink
            questionText.style.fontSize = "1.8rem";

            // Switch buttons (Hide old ones, we don't show new one for this prank flow)
            // initialButtons.classList.add('hidden'); // WE KEEP YES BUTTON VISIBLE
            // finalButtons.classList.remove('hidden'); // HIDDEN FOR PRANK MODE

            // Warm up background
            body.classList.add('valentine-mode');

            // Fade back in
            questionText.style.opacity = '1';

            // Create some sparkles/hearts effect
            createFloatingHearts();

            // PRANK LOGIC: Auto-trigger success after 3 seconds (Reading time)
            setTimeout(() => {
                triggerSuccess();
            }, 3000);

        }, 500);
    }

    // 4. Handle Final "Yes" (Fallback, mainly unused now)
    btnValentineYes.addEventListener('click', () => {
        triggerSuccess();
    });

    function triggerSuccess() {
        successScreen.classList.remove('hidden');
        setTimeout(() => {
            successScreen.classList.add('visible');
            confettiEffect();
        }, 50);
    }

    function createFloatingHearts() {
        // Simple visual effect - could adding elements
        for (let i = 0; i < 10; i++) {
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
