// ==========================================
// ELEMENTS
// ==========================================

const loader = document.getElementById("loader");

const home = document.getElementById("home");
const sharePage = document.getElementById("sharePage");
const giftPage = document.getElementById("giftPage");
const letterPage = document.getElementById("letterPage");
const galleryPage = document.getElementById("galleryPage");
const messagePage = document.getElementById("messagePage");
const finalPage = document.getElementById("finalPage");

const startBtn = document.getElementById("startBtn");
const shareBtn = document.getElementById("shareBtn");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const backHomeBtn = document.getElementById("backHomeBtn");
const giftBox = document.getElementById("giftBox");
const envelope = document.getElementById("envelope");

const nextBtn = document.getElementById("nextBtn");
const galleryBtn = document.getElementById("galleryBtn");
const finalBtn = document.getElementById("finalBtn");
const restartBtn = document.getElementById("restartBtn");

const typing = document.getElementById("typing");
const qrCode = document.getElementById("qrCode");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const urlParams = new URLSearchParams(window.location.search);
const autoStart = urlParams.get("open") === "1";

// ==========================================
// LOADER
// ==========================================

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

            if (autoStart) {
                openSurpriseFlow();
            }

        }, 800);

    }, 2000);

});

// ==========================================
// MUSIC
// ==========================================

let playing = false;

musicBtn.onclick = () => {

    if (playing) {

        music.pause();

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-xmark"></i>';

    } else {

        music.play().catch(()=>{});

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-high"></i>';

    }

    playing = !playing;

};

// ==========================================
// PAGE HELPER
// ==========================================

function hideAllPages(){

    home.style.display="none";
    sharePage.style.display="none";
    giftPage.style.display="none";
    letterPage.style.display="none";
    galleryPage.style.display="none";
    messagePage.style.display="none";
    finalPage.style.display="none";

}

function showPage(page){

    hideAllPages();

    page.style.display="flex";

    page.style.opacity="0";

    setTimeout(()=>{

        page.style.opacity="1";

    },50);

}

// ==========================================
// START
// ==========================================

function openSurpriseFlow(){

    showPage(giftPage);

    giftBox.classList.add("open");

    setTimeout(()=>{

        showPage(letterPage);

    },1000);

}

let sharedUrl = "";

const shareUrlInput = document.getElementById("shareUrlInput");
const shareWarning = document.getElementById("shareWarning");

function createQRCode(){

    sharedUrl = `${window.location.origin}${window.location.pathname}?open=1`;

    qrCode.innerHTML = "";

    new QRCode(qrCode, {
        text: sharedUrl,
        width: 200,
        height: 200,
        colorDark: "#111",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    if (shareUrlInput) {
        shareUrlInput.value = sharedUrl;
    }

    if (shareWarning) {
        const hostname = window.location.hostname;
        if (hostname === "127.0.0.1" || hostname === "localhost" || hostname === "::1") {
            shareWarning.textContent = "Warning: this link only works on this computer unless you host the page on a public or network-accessible address.";
        } else {
            shareWarning.textContent = "This link can be opened from other devices if the address is reachable.";
        }
    }
}

startBtn.addEventListener("click",()=>{

    showPage(giftPage);

});

shareBtn.addEventListener("click",()=>{

    showPage(sharePage);

});

backHomeBtn.addEventListener("click",()=>{

    showPage(home);

});

copyLinkBtn.addEventListener("click",()=>{

    if(!sharedUrl) return;

    navigator.clipboard.writeText(sharedUrl).then(()=>{
        const originalText = copyLinkBtn.textContent;
        copyLinkBtn.textContent = "Link Copied!";
        setTimeout(()=>{
            copyLinkBtn.textContent = originalText;
        },2000);
    }).catch(()=>{
        alert("Copy failed. Please use the QR code instead.");
    });

});

window.addEventListener("DOMContentLoaded", createQRCode);


// ==========================================
// GIFT OPEN
// ==========================================

giftBox.addEventListener("click",()=>{

    giftBox.classList.add("open");

    setTimeout(()=>{

        showPage(letterPage);

    },1000);

});

// ==========================================
// TYPEWRITER MESSAGE
// ==========================================

const message = `Happy Girlfriend Day ❤️

You are the most beautiful part of my life.

Every smile of yours makes my day brighter.

Thank you for always loving me,
supporting me,
and making my world beautiful.

No matter what happens,

I will always choose you.

I Love You Forever ❤️`;

let index = 0;
let typingStarted = false;

function typeWriter(){

    if(index < message.length){

        typing.innerHTML += message.charAt(index);

        index++;

        setTimeout(typeWriter,35);

    }

}

// ==========================================
// ENVELOPE
// ==========================================

envelope.addEventListener("click",()=>{

    if(typingStarted) return;

    typingStarted = true;

    envelope.classList.add("open");

    setTimeout(()=>{

        typeWriter();

    },700);

});

// ==========================================
// LETTER -> GALLERY
// ==========================================

nextBtn.addEventListener("click",()=>{

    showPage(galleryPage);

});

// ==========================================
// GALLERY -> MESSAGE
// ==========================================

galleryBtn.addEventListener("click",()=>{

    showPage(messagePage);

});

// ==========================================
// MESSAGE -> FINAL
// ==========================================

finalBtn.addEventListener("click",()=>{

    showPage(finalPage);

    startHeartRain();

    startButterflies();

    startSparkles();

    startPetals();

    startConfetti();

});

// ==========================================
// REPLAY
// ==========================================

restartBtn.addEventListener("click",()=>{

    location.reload();

});


// ==========================================
// HEARTS
// ==========================================

const heartContainer = document.getElementById("heartContainer");

function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    const emoji=[
        "❤️",
        "💖",
        "💕",
        "💗",
        "💞",
        "💓"
    ];

    heart.innerHTML=emoji[Math.floor(Math.random()*emoji.length)];

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(20+Math.random()*25)+"px";

    heart.style.animationDuration=(4+Math.random()*4)+"s";

    heartContainer.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },8000);

}

function startHeartRain(){

    setInterval(createHeart,250);

}

// ==========================================
// BUTTERFLIES
// ==========================================

const butterflyContainer=document.getElementById("butterflyContainer");

function createButterfly(){

    const butterfly=document.createElement("div");

    butterfly.className="butterfly";

    butterfly.style.top=Math.random()*100+"vh";

    butterfly.style.left="-80px";

    butterfly.style.animationDuration=(8+Math.random()*5)+"s";

    butterflyContainer.appendChild(butterfly);

    setTimeout(()=>{

        butterfly.remove();

    },12000);

}

function startButterflies(){

    setInterval(createButterfly,1800);

}

// ==========================================
// PETALS
// ==========================================

const petalContainer=document.getElementById("petalContainer");

function createPetal(){

    const petal=document.createElement("div");

    petal.className="petal";

    petal.style.left=Math.random()*100+"vw";

    petal.style.animationDuration=(5+Math.random()*4)+"s";

    petalContainer.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },9000);

}

function startPetals(){

    setInterval(createPetal,500);

}

// ==========================================
// SPARKLES
// ==========================================

const sparkleContainer=document.getElementById("sparkleContainer");

function createSparkle(){

    const sparkle=document.createElement("div");

    sparkle.className="sparkle";

    sparkle.innerHTML="✨";

    sparkle.style.left=Math.random()*100+"vw";

    sparkle.style.top=Math.random()*100+"vh";

    sparkle.style.fontSize=(10+Math.random()*20)+"px";

    sparkleContainer.appendChild(sparkle);

    setTimeout(()=>{

        sparkle.remove();

    },2000);

}

function startSparkles(){

    setInterval(createSparkle,300);

}

// ==========================================
// SIMPLE CONFETTI
// ==========================================

function startConfetti(){

    for(let i=0;i<120;i++){

        const conf=document.createElement("div");

        conf.style.position="fixed";

        conf.style.width="10px";
        conf.style.height="10px";

        conf.style.background=
        ["#ff4d94","#ffffff","#ffd1e8","#ff99cc"]
        [Math.floor(Math.random()*4)];

        conf.style.left=Math.random()*100+"vw";

        conf.style.top="-20px";

        conf.style.borderRadius="50%";

        conf.style.pointerEvents="none";

        conf.style.transition="5s linear";

        document.body.appendChild(conf);

        setTimeout(()=>{

            conf.style.transform=
            `translateY(${window.innerHeight+100}px)
             rotate(720deg)`;

            conf.style.opacity="0";

        },100);

        setTimeout(()=>{

            conf.remove();

        },5200);

    }

}

// ==========================================
// AUTO MUSIC
// ==========================================

document.body.addEventListener("click",()=>{

    if(music.paused){

        music.play().catch(()=>{});

        playing=true;

    }

},{once:true});