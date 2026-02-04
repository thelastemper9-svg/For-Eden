// Initialize configuration
let config = window.VALENTINE_CONFIG;

// Safety check for configuration
if (!config) {
    console.error("VALENTINE_CONFIG not found! Make sure config.js is loaded before script.js");
}

// Validate configuration
function validateConfig() {
    const warnings = [];

    // Check required fields
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    // Validate colors
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    // Log warnings if any
    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}

// Set page title (will be handled inside DOMContentLoaded to be safe)
// document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Refresh config reference in case it was loaded late
    config = window.VALENTINE_CONFIG;
    if (!config) return;

    // Set page title
    document.title = config.pageTitle;

    // Validate configuration first
    validateConfig();

    // Set texts from config
    document.getElementById('valentineTitle').textContent = config.valentineName;

    // Set first question texts
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;

    // Set second question texts
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;

    // Set third question texts
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    // Set Kisses Game texts
    document.getElementById('kissesText').textContent = config.questions.kisses.text;
    document.getElementById('kissTarget').textContent = config.questions.kisses.count;
    document.getElementById('sendKissBtn').textContent = config.questions.kisses.btnText;

    // Set Movie Question texts
    document.getElementById('movieText').textContent = config.questions.movie.text;
    document.getElementById('movieYesBtn').textContent = config.questions.movie.yesBtn;
    document.getElementById('movieNoBtn').textContent = config.questions.movie.noBtn;

    // Set Promises texts
    document.getElementById('promisesText').textContent = config.questions.promises.text;
    document.getElementById('promisesBtn').textContent = config.questions.promises.btnText;

    // Set Love Message title (message will be typed out)
    document.getElementById('loveMessageTitle').textContent = config.loveMessage.title;

    // Set Choice Section texts
    document.getElementById('choiceTitle').textContent = config.choiceSection.title;
    document.getElementById('choiceSubtitle').textContent = config.choiceSection.subtitle;

    // Set Game texts
    document.getElementById('gameTitle').textContent = config.questionGame.title;
    document.getElementById('gameSubtitle').textContent = config.questionGame.subtitle;

    // Set Quiz texts
    document.getElementById('quizTitle').textContent = config.quiz.title;
    document.getElementById('quizSubtitle').textContent = config.quiz.subtitle;

    // Set Memories texts
    document.getElementById('memoriesText').textContent = config.questions.memories.text;
    document.getElementById('memoriesBtn').textContent = config.questions.memories.btnText;

    // Initialize systems
    setupPromises();
    createFloatingElements();
    setupMusicPlayer();
    setInitialPosition();
});

// Question Game Logic
let gameQuestionIndex = 0;
function setupQuestionGame() {
    gameQuestionIndex = 0;
    showGameQuestion();
}

function showGameQuestion() {
    const container = document.getElementById('gameContainer');
    const question = config.questionGame.questions[gameQuestionIndex];

    container.innerHTML = `
        <div class="game-question">
            <h3 style="font-size: 1.8rem; margin-bottom: 30px;">${question.question}</h3>
            <div class="game-options">
                <div class="game-option-card" onclick="answerGame('A')">
                    <p>${question.optionA}</p>
                </div>
                <div class="game-option-card" onclick="answerGame('B')">
                    <p>${question.optionB}</p>
                </div>
            </div>
        </div>
    `;
}

function answerGame(choice) {
    gameQuestionIndex++;
    if (gameQuestionIndex < config.questionGame.questions.length) {
        showGameQuestion();
    } else {
        // Show result
        document.getElementById('gameContainer').style.display = 'none';
        document.getElementById('gameSubtitle').style.display = 'none';
        const result = document.getElementById('gameResult');
        document.getElementById('gameResultText').textContent = config.questionGame.result;
        result.classList.remove('hidden');
    }
}

// Quiz Logic
let quizQuestionIndex = 0;
let quizScore = 0;

function setupQuiz() {
    quizQuestionIndex = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    const container = document.getElementById('quizContainer');
    const question = config.quiz.questions[quizQuestionIndex];

    container.innerHTML = `
        <div class="quiz-question">
            <h3 style="font-size: 1.6rem; margin-bottom: 30px;">${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option-card" onclick="answerQuiz(${index})">
                        <p>${option}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function answerQuiz(answerIndex) {
    const question = config.quiz.questions[quizQuestionIndex];
    const isCorrect = answerIndex === question.correct;

    if (isCorrect) {
        quizScore++;
        alert(question.rightResponse);
    } else {
        alert(question.wrongResponse);
    }

    quizQuestionIndex++;
    if (quizQuestionIndex < config.quiz.questions.length) {
        showQuizQuestion();
    } else {
        // Show result
        document.getElementById('quizContainer').style.display = 'none';
        document.getElementById('quizSubtitle').style.display = 'none';
        const result = document.getElementById('quizResult');

        const totalQuestions = config.quiz.questions.length;
        document.getElementById('quizScoreDisplay').textContent = `${quizScore}/${totalQuestions} Correct!`;

        let resultText;
        if (quizScore === totalQuestions) {
            resultText = config.quiz.perfectScore;
        } else if (quizScore >= totalQuestions / 2) {
            resultText = config.quiz.goodScore;
        } else {
            resultText = config.quiz.lowScore;
        }

        document.getElementById('quizResultText').textContent = resultText;
        result.classList.remove('hidden');
    }
}

// Choice Section Logic
function makeChoice(choice) {
    const choiceCards = document.querySelectorAll('.choice-card');
    const choiceContainer = document.querySelector('.choice-container');
    const resultDiv = document.getElementById('choiceResult');
    const resultEmoji = document.getElementById('resultEmoji');
    const resultText = document.getElementById('resultText');

    const selectedOption = config.choiceSection.options[choice];

    // Hide choice cards with fade out
    choiceContainer.style.opacity = '0';
    choiceContainer.style.transform = 'scale(0.8)';

    setTimeout(() => {
        choiceContainer.style.display = 'none';
        document.getElementById('choiceSubtitle').style.display = 'none';

        // Show result
        resultEmoji.textContent = selectedOption.emoji;
        resultText.textContent = selectedOption.result;
        resultDiv.classList.remove('hidden');

        // Animate in
        setTimeout(() => {
            resultDiv.style.opacity = '1';
            resultDiv.style.transform = 'scale(1)';
        }, 100);
    }, 400);
}

// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    const targetCount = 120; // Increased density as requested

    // Combine all arrays for maximum variety
    const allEmojis = [
        ...config.floatingEmojis.hearts,
        ...config.floatingEmojis.bears,
        ...config.floatingEmojis.cats,
        ...config.floatingEmojis.roses
    ];

    // Create target elements
    for (let i = 0; i < targetCount; i++) {
        // Create a wrapper for the upward movement
        const wrapper = document.createElement('div');
        wrapper.className = 'floating-wrapper';

        // Create the emoji element for the visual/pulse
        const emoji = document.createElement('div');
        emoji.innerHTML = allEmojis[Math.floor(Math.random() * allEmojis.length)];
        emoji.className = 'floating-emoji';

        // Add pulse effect to some (30% chance)
        if (Math.random() > 0.7) {
            emoji.classList.add('pulse');
        }

        wrapper.appendChild(emoji);
        setRandomPosition(wrapper);
        container.appendChild(wrapper);
    }
}

// Set random position for floating elements
function setRandomPosition(element) {
    // Random horizontal position
    element.style.left = Math.random() * 100 + 'vw';

    // Set base top to 100vh so they all theoretically start from bottom
    element.style.top = '100vh';

    // Random animation duration for variety
    const duration = 15 + Math.random() * 20; // 15-35 seconds
    element.style.animationDuration = duration + 's';

    // CRITICAL: Negative delay ensures they are scattered vertically AT START
    // This makes the browser think the animation has been running for X seconds
    const delay = -Math.random() * duration;
    element.style.animationDelay = delay + 's';
}

// Function to show next question
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));

    let targetId = `question${questionNumber}`;
    const section = document.getElementById(targetId);

    if (section) {
        section.classList.remove('hidden');

        // Update Title based on section
        if (questionNumber === 'LoveMessage') {
            document.getElementById('valentineTitle').textContent = "My darling...";
        } else if (['Choice', 'QuestionGame', 'Quiz', 3].includes(questionNumber)) {
            document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;
        } else if (questionNumber === 2) {
            document.getElementById('valentineTitle').textContent = config.valentineName;
        }

        // Trigger logic for specific sections
        if (questionNumber === 'LoveMessage') {
            setTimeout(() => typeLoveMessage(), 500);
        } else if (questionNumber === 'QuestionGame') {
            setupQuestionGame();
        } else if (questionNumber === 'Quiz') {
            setupQuiz();
        } else if (questionNumber === 'Memories') {
            setupMemories();
        } else if (questionNumber === 'DBD') {
            setupDBD();
        }
    }
}

// Love Message Typewriter
function typeLoveMessage() {
    const text = config.loveMessage.message;
    const speed = config.loveMessage.typingSpeed || 160;
    const element = document.getElementById('loveMessageText');
    const btn = document.getElementById('loveMessageBtn');

    element.innerHTML = ''; // Clear
    btn.classList.add('hidden'); // Hide button initially

    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => btn.classList.remove('hidden'), 500);
        }
    }
    type();
}

// Function to move the button when clicked
let noClickCount = 0;
function moveButton(button) {
    // Check if it's a "No" button (by ID or class)
    const isNoButton = button.id.toLowerCase().includes('no');

    if (isNoButton) {
        // Special case for final proposal "No" button
        if (button.id === 'noBtn3') {
            button.textContent = config.lastNoMessage;
        } else {
            // Increase click count ONLY for other No button text logic
            noClickCount++;

            // Update button text after a few clicks
            if (noClickCount >= 3) {
                const index = Math.min(noClickCount - 3, config.noMessages.length - 1);
                button.textContent = config.noMessages[index];
            }
        }
    }

    // Both Yes and No buttons move around constantly when clicked
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Love meter functionality
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');
let gokuAudioPlayed = false;
let gokuAudio = null;

// Initialize Goku audio on first user interaction with the slider
function initGokuAudio() {
    if (config.goku && config.goku.enabled && !gokuAudio) {
        gokuAudio = new Audio(config.goku.gokuUrl);
        gokuAudio.volume = config.goku.volume;
        // 'Pre-load' by playing and pausing immediately to unlock audio context in some browsers
        gokuAudio.play().then(() => gokuAudio.pause()).catch(() => { });
    }
}

// Add init listener
loveMeter.addEventListener('mousedown', initGokuAudio, { once: true });
loveMeter.addEventListener('touchstart', initGokuAudio, { once: true });

function setInitialPosition() {
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';
}

loveMeter.addEventListener('input', () => {
    const value = parseInt(loveMeter.value);
    loveValue.textContent = value;

    if (value > 100) {
        extraLove.classList.remove('hidden');
        const overflowPercentage = (value - 100) / 9900;
        const extraWidth = overflowPercentage * window.innerWidth * 0.8;
        loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
        loveMeter.style.transition = 'width 0.3s';

        // Show different messages based on the value
        if (value >= 5000) {
            extraLove.classList.add('super-love');
            extraLove.textContent = config.loveMessages.extreme;
        } else if (value > 1000) {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.high;


            // Trigger Goku audio ONLY once when it hits > 1000
            // Check if audio exists, hasn't been played, and isn't currently playing
            if (gokuAudio && !gokuAudioPlayed && gokuAudio.paused) {
                gokuAudio.currentTime = 0; // Reset to start
                gokuAudio.play().catch(e => console.log("Audio play failed:", e));
                gokuAudioPlayed = true;
            }
        } else {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.normal;
        }
    } else {
        extraLove.classList.add('hidden');
        extraLove.classList.remove('super-love');
        loveMeter.style.width = '100%';
    }
});

// Set initial meter position
setInitialPosition();

// Celebration function
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');

    // Set celebration messages
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    // Create heart explosion effect
    createHeartExplosion();
}

// Create heart explosion animation
function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'floating-emoji';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}

// Music Player Setup
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    // Only show controls if music is enabled in config
    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    // Set music source and volume
    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    // Try autoplay if enabled
    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented by browser");
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}

// Kisses Game Logic
let kissesCount = 0;
function sendKiss() {
    kissesCount++;
    document.getElementById('kissCounter').textContent = kissesCount;
    const target = config.questions.kisses.count;

    // Create floating kiss animation from button
    const btn = document.getElementById('sendKissBtn');
    const rect = btn.getBoundingClientRect();
    const kiss = document.createElement('div');
    kiss.classList.add('floating-kiss');
    kiss.textContent = '💋';
    kiss.style.left = (rect.left + rect.width / 2) + 'px';
    kiss.style.top = (rect.top) + 'px';
    document.body.appendChild(kiss);

    // Remove after animation
    setTimeout(() => kiss.remove(), 1500);

    if (kissesCount >= target) {
        // Success! Move to next question after a short delay
        setTimeout(() => {
            showNextQuestion('Movie');
        }, 1000);
    }
}

// Promises Checklist Logic
function setupPromises() {
    const list = document.getElementById('promisesList');
    list.innerHTML = ''; // Clear existing

    config.questions.promises.items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'checklist-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `promise${index}`;

        const label = document.createElement('label');
        label.htmlFor = `promise${index}`;
        label.textContent = item;
        label.style.cursor = 'pointer';

        div.appendChild(checkbox);
        div.appendChild(label);

        // Toggle check on div click
        div.onclick = (e) => {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            }
        };

        // Handle change
        checkbox.onchange = () => {
            if (checkbox.checked) {
                div.classList.add('checked');
            } else {
                div.classList.remove('checked');
            }
            checkPromises();
        };

        list.appendChild(div);
    });
}

function checkPromises() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    const btn = document.getElementById('promisesBtn');

    if (allChecked) {
        btn.classList.remove('disabled');
        btn.disabled = false;
    } else {
        btn.classList.add('disabled');
        btn.disabled = true;
    }
}

// Memories Section Logic
let currentMemoryIndex = 0;

function setupMemories() {
    currentMemoryIndex = 0;
    updateMemoryDisplay();
}

function updateMemoryDisplay() {
    const list = document.getElementById('memoriesList');
    const btn = document.getElementById('memoriesBtn');
    const items = config.questions.memories.items;
    const currentMemory = items[currentMemoryIndex];

    // Fade out
    list.style.opacity = '0';

    setTimeout(() => {
        list.innerHTML = '';

        const div = document.createElement('div');
        div.className = 'memory-card single-memory';

        // Detect if media is a video
        const isVideo = currentMemory.image.match(/\.(mp4|webm|ogg|mov)$/i) || currentMemory.image.includes('video');

        let media;
        if (isVideo) {
            media = document.createElement('video');
            media.src = currentMemory.image;
            media.autoplay = true;
            media.loop = true;
            media.muted = true;
            media.playsInline = true;
            media.className = 'memory-img';
        } else {
            media = document.createElement('img');
            media.src = currentMemory.image;
            media.alt = currentMemory.title;
            media.className = 'memory-img';
        }

        const title = document.createElement('h3');
        title.textContent = currentMemory.title;
        title.className = 'memory-title';

        div.appendChild(media);
        div.appendChild(title);
        list.appendChild(div);

        // Update button text
        if (currentMemoryIndex < items.length - 1) {
            btn.textContent = "Next Memory ❤️";
        } else {
            btn.textContent = config.questions.memories.btnText;
        }

        // Fade in
        list.style.opacity = '1';
    }, 300);
}

function nextMemory() {
    const items = config.questions.memories.items;

    if (currentMemoryIndex < items.length - 1) {
        currentMemoryIndex++;
        updateMemoryDisplay();
    } else {
        showNextQuestion('DBD');
    }
}

// DBD Skill Check Logic
let dbdPulsing = false;
let dbdRotation = 0;
let dbdTargetStart = 0;
let dbdTargetEnd = 0;
let dbdAnimationId = null;
let dbdAudioStart = null;
let dbdAudioSuccess = null;
let dbdAudioFail = null;

function setupDBD() {
    const title = document.getElementById('dbdTitle');
    const subtitle = document.getElementById('dbdSubtitle');
    const feedback = document.getElementById('dbdFeedback');
    const btn = document.getElementById('dbdBtn');

    title.textContent = config.questions.dbd.title;
    subtitle.textContent = config.questions.dbd.subtitle;
    btn.textContent = config.questions.dbd.btnText;
    feedback.classList.add('hidden');

    // Setup Audio
    if (!dbdAudioStart) dbdAudioStart = new Audio(config.questions.dbd.startSound);
    if (!dbdAudioSuccess) dbdAudioSuccess = new Audio(config.questions.dbd.successSound);
    if (!dbdAudioFail) dbdAudioFail = new Audio(config.questions.dbd.failSound);

    resetSkillCheck();
}

function resetSkillCheck() {
    const target = document.getElementById('dbdTarget');
    const needle = document.getElementById('dbdNeedle');

    // Play start sound (the "ding" notification)
    dbdAudioStart.currentTime = 0;
    dbdAudioStart.play();

    // Random target position (between 80 and 280 degrees)
    dbdTargetStart = 100 + Math.random() * 150;
    dbdTargetEnd = dbdTargetStart + 25; // 25 degree window

    target.style.transform = `rotate(${dbdTargetStart}deg)`;
    dbdRotation = 0;
    dbdPulsing = true;

    animateNeedle();
}

function animateNeedle() {
    if (!dbdPulsing) return;

    const needle = document.getElementById('dbdNeedle');
    dbdRotation += 4; // Speed
    if (dbdRotation >= 360) dbdRotation = 0;

    needle.style.transform = `rotate(${dbdRotation}deg)`;
    dbdAnimationId = requestAnimationFrame(animateNeedle);
}

function trySkillCheck() {
    if (!dbdPulsing) {
        resetSkillCheck();
        return;
    }

    dbdPulsing = false;
    cancelAnimationFrame(dbdAnimationId);

    const feedback = document.getElementById('dbdFeedback');
    const container = document.querySelector('.dbd-skill-check-container');

    // Normalize rotation values to 0-360 for consistent checking
    const normalizedRotation = dbdRotation % 360;
    const normalizedTarget = dbdTargetStart % 360;

    // Calculate shortest distance between needle and target center
    let diff = Math.abs(normalizedRotation - normalizedTarget);
    if (diff > 180) diff = 360 - diff;

    // The white zone (border-top) is exactly 90 degrees total (45 on each side of center)
    // We'll set a tolerance of 50 degrees to make it feel fair even with click latency (100 total window)
    if (diff <= 50) {
        // SUCCESS
        dbdAudioSuccess.currentTime = 0; // Reset audio
        dbdAudioSuccess.play();
        feedback.textContent = config.questions.dbd.successMsg;
        feedback.style.color = "#ffffff";
        feedback.classList.remove('hidden');

        // Visual hype
        container.style.boxShadow = '0 0 80px rgba(255, 255, 255, 0.6)';
        container.style.borderColor = '#ffffff';

        setTimeout(() => {
            showNextQuestion('Promises');
        }, 1500);
    } else {
        // FAIL
        dbdAudioFail.currentTime = 0; // Reset audio
        dbdAudioFail.play();
        feedback.textContent = config.questions.dbd.failMsg;
        feedback.style.color = "#ff4757";
        feedback.classList.remove('hidden');

        // Shake effect
        container.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => container.style.animation = '', 500);

        setTimeout(() => {
            feedback.classList.add('hidden');
            resetSkillCheck();
        }, 1500);
    }
}

// Add Spacebar listener for DBD
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        const dbdSection = document.getElementById('questionDBD');
        if (dbdSection && !dbdSection.classList.contains('hidden')) {
            e.preventDefault();
            trySkillCheck();
        }
    }
});