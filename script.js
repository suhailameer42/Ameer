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
const backHomeBtn = document.getElementById("backHomeBtn");
const giftBox = document.getElementById("giftBox");
const envelope = document.getElementById("envelope");

const nextBtn = document.getElementById("nextBtn");
const galleryBtn = document.getElementById("galleryBtn");
const finalBtn = document.getElementById("finalBtn");
const restartBtn = document.getElementById("restartBtn");

const typing = document.getElementById("typing");
const qrCode = document.getElementById("qrCode");
const shareUrlInput = document.getElementById("shareUrlInput");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const downloadQrBtn = document.getElementById("downloadQrBtn");

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
window.publicShareUrl = "https://suhailameer42.github.io/Ameer/";

const isLocalHost = window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const shareHost = isLocalHost ? window.publicShareUrl : `${window.location.origin}${window.location.pathname}`;
const shareLink = `${shareHost.replace(/\/index\.html$|\/$/, "")}?open=1`;

function getLocalNetworkIp(){

    return new Promise((resolve) => {
        if (!window.RTCPeerConnection) {
            resolve(null);
            return;
        }

        const ips = new Set();
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }]
        });

        pc.createDataChannel("");

        pc.onicecandidate = (event) => {
            if (!event.candidate) {
                pc.close();
                for (const ip of ips) {
                    if (!ip.startsWith("127.") && !ip.startsWith("169.254.")) {
                        resolve(ip);
                        return;
                    }
                }
                resolve(null);
                return;
            }

            const candidate = event.candidate.candidate;
            const match = candidate.match(/([0-9]{1,3}(?:\.[0-9]{1,3}){3})/);
            if (match) {
                ips.add(match[1]);
            }
        };

        pc.createOffer()
            .then((offer) => pc.setLocalDescription(offer))
            .catch(() => resolve(null));
    });
}

function createShareQRCode(){
    if (!qrCode) return;
    qrCode.innerHTML = "";

    new QRCode(qrCode, {
        text: shareLink,
        width: 220,
        height: 220,
        colorDark: "#ff2f7b",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    if (shareUrlInput) {
        shareUrlInput.value = shareLink;
    }
}

function downloadQRCode(){
    if (!qrCode) return;
    const img = qrCode.querySelector("img");
    const canvas = qrCode.querySelector("canvas");
    let dataUrl = null;

    if (img) {
        dataUrl = img.src;
    } else if (canvas) {
        dataUrl = canvas.toDataURL("image/png");
    }

    if (!dataUrl) return;

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "ameer-surprise-qr.png";
    link.click();
}

if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", ()=>{
        navigator.clipboard.writeText(shareLink).then(() => {
            alert("Surprise link copied to clipboard!");
        }).catch(() => {
            prompt("Copy the surprise link:", shareLink);
        });
    });
}

if (downloadQrBtn) {
    downloadQrBtn.addEventListener("click", downloadQRCode);
}

createShareQRCode();


startBtn.addEventListener("click",()=>{

    showPage(giftPage);

});

shareBtn.addEventListener("click",()=>{

    showPage(sharePage);

});

backHomeBtn.addEventListener("click",()=>{

    showPage(home);

});


window.addEventListener("DOMContentLoaded", () => {
    // no QR code generation needed
});


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

    } else {

        nextBtn.disabled = false;

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
// LIGHTBOX - CLICK TO ENLARGE IMAGES
// ==========================================

const lightboxModal = document.getElementById("lightboxModal");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const photoImages = document.querySelectorAll(".photo img");

// Open lightbox when image is clicked
photoImages.forEach(img => {
    img.addEventListener("click", (e) => {
        lightboxImage.src = e.target.src;
        lightboxModal.classList.add("active");
    });
});

// Close lightbox when X is clicked
lightboxClose.addEventListener("click", () => {
    lightboxModal.classList.remove("active");
});

// Close lightbox when clicking outside the image
lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
        lightboxModal.classList.remove("active");
    }
});

// Close lightbox on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        lightboxModal.classList.remove("active");
    }
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