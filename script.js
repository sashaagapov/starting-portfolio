// Console styling
console.log("%c", "background: #2d8007; color: #fff; font-size: 20px; padding: 10px; border-radius: 5px;");

// Перемикач світло/темна тема
const themeBtn = document.querySelector('#theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeBtn.innerText = " Light Mode";
        } else {
            themeBtn.innerText = " Dark Mode";
        }
    });
}

// Обробка відправки форми контакту
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const button = document.getElementById('submit-btn');
        const data = new FormData(event.target);

        if (button) {
            button.innerText = "Sending...";
            button.disabled = true;
        }

        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                if (button) {
                    button.innerText = "Sent Successfully! ";
                    button.style.backgroundColor = "#1e7e34";
                }
                form.reset();
            } else {
                throw new Error();
            }
        } catch (error) {
            if (button) {
                button.innerText = "Error ";
                button.style.backgroundColor = "red";
            }
        }
        
        setTimeout(() => {
            if (button) {
                button.disabled = false;
                button.innerText = "Send Message";
                button.style.backgroundColor = "#2d8007";
            }
        }, 3000);
    });
}

// Логіка вступного екрану - після натиску показуємо портфоліо
const intro = document.getElementById('intro-overlay');
const startBtn = document.getElementById('start-btn');
const mainContent = document.querySelector('.container');

if (startBtn) {
    startBtn.addEventListener('click', function() {
        if (intro) intro.classList.add('hidden');
        if (themeBtn) themeBtn.style.display = "inline-block";
        setTimeout(() => {
            if (mainContent) mainContent.classList.add('visible');
        }, 300);
    });
}
