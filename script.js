document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscribeMsg = document.getElementById('subscribeMsg');
    const emojiContainer = document.getElementById('emoji-container');

    // --- Countdown Timer ---
    const targetDate = new Date(2026, 2, 6, 23, 36, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            if (countdownElement) {
                countdownElement.innerHTML = "🎉 我们的幸福时刻已开启！ 🎉";
            }
            if(daysEl) daysEl.textContent = '';
            if(hoursEl) hoursEl.textContent = '';
            if(minutesEl) minutesEl.textContent = '';
            if(secondsEl) secondsEl.textContent = '';
            if(subscribeBtn) {
                subscribeBtn.textContent = "💖";
                subscribeBtn.disabled = true;
            }
            if(subscribeMsg) subscribeMsg.classList.add('hidden');
            if (timerInterval) clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(daysEl) daysEl.textContent = days;
        if(hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if(minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if(secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    let timerInterval;
    if (countdownElement) {
        timerInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // --- Subscription Button ---
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            subscribeBtn.textContent = '订阅成功!';
            subscribeBtn.disabled = true;
            if (subscribeMsg) {
                subscribeMsg.classList.remove('hidden');
                subscribeMsg.textContent = '订阅成功！倒计时结束后将会收到我写的信哦~';
            }
        });
    }

    // --- Random Text Pop-ups on Click ---
    const popWords = ["线线傻瓜", "线线笨笨", "小狗狗", "冒力大笨蛋", "我的宝", "小可爱", "mua!", "贴贴~"];
    document.addEventListener('click', (e) => {
        // Prevent pop-ups if clicking directly on a floating emoji or the subscribe button.
        if (e.target.closest('.floating-emoji') || e.target.closest('#subscribeBtn')) {
            return;
        }

        // Otherwise, create the pop-up. This allows clicks within #frosted-glass (that are not the button)
        // and clicks outside #frosted-glass to create pop-ups.
        const popup = document.createElement('div');
        popup.classList.add('popup-text');
        popup.textContent = popWords[Math.floor(Math.random() * popWords.length)];

        let x = e.clientX;
        let y = e.clientY;

        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        // This transform attempts to center the popup on the cursor and move it slightly up.
        // The exact values might need tweaking depending on the popup's average size.
        popup.style.transform = 'translate(-50%, -120%)';

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 1450);
    });

    // --- Floating Emojis Effect ---
    const emojis = ['🎁', '🎈', '💖', '✨', '🎉', '💌'];
    const emojiInterval = 800;

    function createFloatingEmoji() {
        if (!emojiContainer) return;

        const emojiEl = document.createElement('div');
        emojiEl.classList.add('floating-emoji');
        emojiEl.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const startX = Math.random() * 100;
        const endX = (Math.random() - 0.5) * 40;
        const rotateEnd = (Math.random() - 0.5) * 90;
        const animationDuration = 8 + Math.random() * 7;
        const emojiSize = 1.5 + Math.random() * 1.5;

        emojiEl.style.left = `${startX}vw`;
        emojiEl.style.fontSize = `${emojiSize}rem`;
        emojiEl.style.setProperty('--translateX-end', `${endX}vw`);
        emojiEl.style.setProperty('--rotate-end', `${rotateEnd}deg`);
        emojiEl.style.animationDuration = `${animationDuration}s`;
        emojiEl.style.animationDelay = `${Math.random() * 2}s`;

        emojiContainer.appendChild(emojiEl);

        setTimeout(() => {
            emojiEl.style.opacity = '0.7';
        }, 10);

        setTimeout(() => {
            emojiEl.remove();
        }, animationDuration * 1000 + 2000);
    }

    for(let i=0; i < 10; i++){
        setTimeout(createFloatingEmoji, Math.random() * 2000);
    }
    setInterval(createFloatingEmoji, emojiInterval);
});