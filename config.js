// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Eden", "Sarah", "Mike"
    valentineName: "Eden",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Will You Be My Valentine? 💝",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓', '💗', '💕', '💘'], // More heart variety
        bears: ['🧸', '🐻'],
        cats: ['🐈', '😻', '😽'], // Added cats
        roses: ['🌹', '💐', '🌷']  // Added flowers/roses
    },

    // Questions and answers
    // Customize each question and its possible responses
    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Do you like me?",                                    // First interaction
            yesBtn: "Yes",                                             // Text for "Yes" button
            noBtn: "No",                                               // Text for "No" button
            secretAnswer: "I don't like you, I love you so much! ❤️"           // Secret hover message
        },
        second: {
            text: "How much do you love me Eden?",                          // For the love meter
            startText: "This much!",                                   // Text before the percentage
            nextBtn: "Next ❤️"                                         // Text for the next button
        },
        // New Kisses Game
        kisses: {
            text: "Give me 10 kisses! 💋",
            count: 10,
            btnText: "Send Kiss 💋"
        },
        // New Movie Question
        movie: {
            text: "Will you watch a movie with me? 🎬🍿",
            yesBtn: "Yes! 🎞️",
            noBtn: "No"
        },
        // New Promises Checklist
        promises: {
            text: "Promise me these things... 📜",
            items: [
                "I promise to give you unlimited cuddles",
                "I promise to give you unlimited kisses",
                "I promise to be the best Valentine ever",
                "I promise to always make time for us"
            ],
            btnText: "I Promise! 🤞"
        },
        third: {
            text: "Will you be my Valentine on February 14th, 2026? 🥰💖🌹", // The big question!
            yesBtn: "Yes!",                                             // Text for "Yes" button
            noBtn: "No"                                                 // Text for "No" button
        },
        // New Memories Section
        memories: {
            text: "Some of my favorite memories with you... 📸",
            btnText: "Such good times... 💕",
            items: [
                {
                    title: "Cooking together was so fun",
                    image: "https://res.cloudinary.com/dnytbujnc/image/upload/v1770207208/Screenshot_2026-02-04_081253_jvrbqv.png" // Replace with your actual image URL
                },
                {
                    title: "Best Marvel Rivals support",
                    image: "https://res.cloudinary.com/dnytbujnc/image/upload/v1770206760/206F4A1_r2pdm3.jpg"    // Replace with your actual image URL
                },
                {
                    title: "Goated DBD player, the legendary Eden",
                    image: "https://res.cloudinary.com/dnytbujnc/video/upload/v1770212466/video_project_2_p9jdr0.mp4"    // Replace with your actual image URL
                },
                {
                    title: "Another Goated Eden move",
                    image: "https://res.cloudinary.com/dnytbujnc/video/upload/v1770211745/Video_Project_ni1yho.mp4"    // Replace with your actual image URL
                }
            ]
        },
        // DEAD BY DAYLIGHT Skill Check
        dbd: {
            title: "DON'T BLOW THE GEN! 🩸",
            subtitle: "Hit the skill check or get hooked! 😏",
            successMsg: "GREAT SKILL CHECK! 🛠️",
            failMsg: "LMAO WASHED! 🗑️",
            btnText: "Repair Generator",
            startSound: "https://res.cloudinary.com/dnytbujnc/video/upload/v1770208839/dbd_check_start_lhqcwl.mp3",
            successSound: "https://res.cloudinary.com/dnytbujnc/video/upload/v1770209088/dbd-great-skill-check-skillcheck_vqhsjo.mp3",
            failSound: "https://res.cloudinary.com/dnytbujnc/video/upload/v1770210135/dbd-generator-explosion_rbvvja.mp3"
        }
    },

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",  // Shows when they go past 5000%
        high: "To go even further beyond! Ahhhhhhhhh!!!💝",              // Shows when they go past 1000%
        normal: "And beyond! 🥰"                           // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "Let's go! I'm the luckiest person in the world! 🎉💝💖💝💓",
        message: "Can't wait to cuddle and kiss!",
        emojis: "🎁💖🤗💝💋❤️💕"  // These will bounce around
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    colors: {
        backgroundStart: "#ffafbd",      // Gradient start (try pastel colors for a soft look)
        backgroundEnd: "#ffc3a0",        // Gradient end (should complement backgroundStart)
        buttonBackground: "#ff6b6b",     // Button color (should stand out against the background)
        buttonHover: "#ff8787",          // Button hover color (slightly lighter than buttonBackground)
        textColor: "#ff4757"             // Text color (make sure it's readable!)
    },

    // Animation settings
    // Adjust these if you want faster/slower animations
    animations: {
        floatDuration: "15s",           // How long it takes hearts to float up (10-20s recommended)
        floatDistance: "50px",          // How far hearts move sideways (30-70px recommended)
        bounceSpeed: "0.5s",            // Speed of bouncing animations (0.3-0.7s recommended)
        heartExplosionSize: 1.5         // Size of heart explosion effect (1.2-2.0 recommended)
    },

    // Background Music (Optional)
    // Add your own music URL after getting proper licenses
    music: {
        enabled: true,                     // Music feature is enabled
        autoplay: true,                    // Try to autoplay (note: some browsers may block this)
        musicUrl: "https://res.cloudinary.com/dnytbujnc/video/upload/v1770164274/Radiohead_-_Creep_-_Radiohead_g6bmpd.mp3", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.3                        // Volume level (0.0 to 1.0)
    },
    goku: {
        enabled: true,                     // Music feature is enabled
        autoplay: false,                    // Try to autoplay (note: some browsers may block this)
        gokuUrl: "https://res.cloudinary.com/dnytbujnc/video/upload/v1770171409/gokuyelling_dw9arm.mp3", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.05                       // Volume level (0.0 to 1.0)
    },

    // Heartfelt Love Message (appears after promises, before gallery)
    loveMessage: {
        title: "Eden, You Mean Everything to Me 💖",
        message: "From the moment we started talking, you've brought so much happiness and joy into my life. Even though we haven't met in person yet, I have just fallen so deeply in love with you.\n\nYour smile brightens my darkest days. Your cute giggle is my favorite sound. I just love spending every single day with you.\n\nYou're not just someone I like Eden. you're someone I truly, deeply love.\n\nI can't wait for the day we're finally together and spend the rest of my life with you. Until then, know that you're always in my heart. ❤️",
        typingSpeed: 10 // ms per character (faster, more natural typing)
    },

    // Choice Section (Rose vs Chocolate)
    choiceSection: {
        title: "Pick Your Reward! 🎁",
        subtitle: "Choose wisely... 😏",
        options: {
            chocolate: {
                emoji: "🍫",
                label: "Chocolate",
                result: "You chose chocolate! 🍫\n\nThat means I owe you a skin in your Marvel Rivals! 🎮\n\nPick whatever you want, it's yours! 💝"
            },
            rose: {
                emoji: "🌹",
                label: "Rose",
                result: "You chose the rose! 🌹\n\nThat means I have to do ANYTHING you want for atleast 1 whole hour! ⏰\n\nYour wish is my command! 💖"
            }
        }
    },

    // Cheeky "No" button messages
    noMessages: [
        "say yes now bitchhhh",
        "omg",
        "omg you bitch",
        "really? 😠",
        "okay bitchhh 😠",
        "fuck you 😡",
        "bitch ass bitch 😡",
        "why the hell are you still saying no? 😡"
    ],
    lastNoMessage: "You literally cannot say No 😇",

    // Question Game (Would You Rather)
    questionGame: {
        title: "Let's Play a Game... 😏",
        subtitle: "Choose honestly! 💕",
        questions: [
            {
                question: "Would you rather...",
                optionA: "Kiss me under the stars ✨",
                optionB: "Kiss me in the rain 🌧️"
            },
            {
                question: "Our first date should be...",
                optionA: "Fancy dinner & dancing 🍽️",
                optionB: "Cozy movie night at home 🎬"
            },
            {
                question: "I'd rather...",
                optionA: "Hold your hand all day 🤝",
                optionB: "Cuddle all night 🛏️"
            }
        ],
        result: "Compatibility: 100% 💯\n\nWe're a perfect match! Every answer just proves we're meant to be together. 🥰"
    },

    // Quiz Section
    quiz: {
        title: "How Well Do You Know Me? 🤔",
        subtitle: "Let's test it! (Be honest 😏)",
        questions: [
            {
                question: "What's my favorite thing about you?",
                options: ["Your smile", "Your laugh", "Your personality", "Everything"],
                correct: 3,
                wrongResponse: "Close! But it's actually EVERYTHING about you! 😍",
                rightResponse: "YES! I love absolutely everything about you! 💖"
            },
            {
                question: "What would I do first when we finally meet?",
                options: ["Give you flowers", "Hug you tight", "Just stare at you", "All of the above"],
                correct: 3,
                wrongResponse: "Mmm, try again! I'd do ALL of that! 🥰",
                rightResponse: "Exactly! I've been dreaming about that moment! 💕"
            },
            {
                question: "What's the first thing I think about in the morning?",
                options: ["Food", "Sleep", "You", "Gaming"],
                correct: 2,
                wrongResponse: "Nope! It's always YOU! 😘",
                rightResponse: "You got it! You're my first thought every day! ❤️"
            }
        ],
        perfectScore: "WOW! You know me perfectly! 🏆\n\nYou really pay attention to everything I say. That means the world to me! 🥹💕",
        goodScore: "Not bad! 😊\n\nBut I guess I need to tell you more about myself... over a date? 😏",
        lowScore: "Haha! Guess we need to spend more time together! 😅\n\nLucky for you, I'm planning on a lot more time with you! 💝"
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG; 
