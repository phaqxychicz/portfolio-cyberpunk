// BOOT SEQUENCE - NORMAL
const bootTexts = [
    "> ROG STRIX BIOS v.4012",
    "> Republic of Gamers - Cyberdeck Initiated",
    "> Scanning neural link... OK",
    "> Loading user profile: zamzami ... OK",
    "> Entering the void..."
    "> plenger man...
];

let bootIndex = 0;
const bootElement = document.getElementById('bootText');
const introLayer = document.getElementById('intro-layer');

function typeBootText() {
    if (bootIndex < bootTexts.length) {
        bootElement.innerHTML += bootTexts[bootIndex] + '<br>';
        bootIndex++;
        setTimeout(typeBootText, 500);
    } else {
        setTimeout(() => {
            introLayer.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                introLayer.style.display = 'none';
                document.getElementById('slide1').classList.add('active-slide');
                updateSlideIndicator(1);
                
                // 🔥 PASTIKAN NAVIGASI DIPANGGIL SETELAH SLIDE MUNCUL
                attachNavListeners();
                autoSkillBar();
                initProjects();
                initContactButtons();
            }, 500);
        }, 1000);
    }
}

// SLIDE NAVIGATION
let currentSlide = 1;
const totalSlides = 4;

function showSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) return;
    
    for (let i = 1; i <= totalSlides; i++) {
        const slide = document.getElementById(`slide${i}`);
        if (slide) slide.classList.remove('active-slide');
    }
    
    const targetSlide = document.getElementById(`slide${slideNumber}`);
    if (targetSlide) targetSlide.classList.add('active-slide');
    currentSlide = slideNumber;
    updateSlideIndicator(slideNumber);
}

function updateSlideIndicator(slideNumber) {
    const dots = document.querySelectorAll(`.slide-indicator .dot`);
    dots.forEach((dot, idx) => {
        if (idx + 1 === slideNumber) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function attachNavListeners() {
    console.log("Attaching navigation listeners...");
    
    // Tombol NEXT
    document.querySelectorAll('.next-slide-btn').forEach(btn => {
        btn.removeEventListener('click', handleNextClick);
        btn.addEventListener('click', handleNextClick);
    });
    
    // Tombol PREV
    document.querySelectorAll('.prev-slide-btn').forEach(btn => {
        btn.removeEventListener('click', handlePrevClick);
        btn.addEventListener('click', handlePrevClick);
    });
}

function handleNextClick(e) {
    const next = e.currentTarget.getAttribute('data-next');
    if (next) showSlide(parseInt(next));
}

function handlePrevClick(e) {
    const prev = e.currentTarget.getAttribute('data-prev');
    if (prev) showSlide(parseInt(prev));
}

// AUTO SKILL BAR
function autoSkillBar() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const percentText = card.querySelector('.skill-percent')?.textContent;
        const percent = parseInt(percentText);
        const barFill = card.querySelector('.skill-bar-fill');
        if (barFill && percent) {
            barFill.style.width = percent + '%';
        }
    });
}

// PROJECTS DATA
const projectsData = [
    {
        title: "Cyberpunk Poster Series",
        image: "images/project-1.jpg",
        desc: "Seri poster bertema cyberpunk dengan kombinasi neon dan glitch effect.",
        tech: "PixelLab, CorelDraw"
    },
    {
        title: "Brand Identity Project",
        image: "images/project-2.jpg",
        desc: "Desain identitas merek dengan sentuhan retro-futuristik.",
        tech: "Canva, CorelDraw"
    },
    {
        title: "Social Media Campaign",
        image: "images/project-3.jpg",
        desc: "Kampanye media sosial dengan visual berani dan tipografi eksperimental.",
        tech: "Canva, PixelLab"
    }
];

function initProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    projectsData.forEach((project) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/400x200/0a0a0f/00f3ff?text=No+Image'">
            <h4>${project.title}</h4>
            <p>${project.desc.substring(0, 55)}...</p>
        `;
        card.addEventListener('click', () => openModal(project));
        grid.appendChild(card);
    });
}

function openModal(project) {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalDesc').textContent = project.desc;
    document.getElementById('modalTech').innerHTML = `<strong>Tech:</strong> ${project.tech}`;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('projectModal').classList.add('hidden');
}

// CONTACT BUTTONS
function initContactButtons() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const btn = item.querySelector('.contact-btn');
        const type = item.getAttribute('data-type');
        const span = item.querySelector('span');
        const value = span.textContent;
        
        // Hapus listener lama biar tidak dobel
        btn.removeEventListener('click', handleContactClick);
        btn.addEventListener('click', () => handleContactClick(type, value));
    });
}

function handleContactClick(type, value) {
    let url = '';
    if (type === 'instagram') url = `https://instagram.com/${value.replace('@', '')}`;
    if (type === 'github') url = `https://github.com/${value.replace('@', '')}`;
    if (url) window.open(url, '_blank');
}

// MUSIC PLAYER
const playlist = [
    { src: "assets/music/music-1.mp3", title: "Dandelions" },
    { src: "assets/music/music-2.mp3", title: "Gak Pake Lama" },
    { src: "assets/music/music-3.mp3", title: "Ophelia" }
];

let currentTrack = 0;
let isPlaying = false;

const bgMusic = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const trackTitle = document.getElementById('trackTitle');

function loadTrack(index) {
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;
    currentTrack = index;
    bgMusic.src = playlist[currentTrack].src;
    trackTitle.textContent = playlist[currentTrack].title;
    
    if (isPlaying) {
        bgMusic.play().catch(e => console.log('Playback failed:', e));
    }
}

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            bgMusic.play().catch(e => console.log('Playback failed:', e));
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        loadTrack(currentTrack + 1);
        if (isPlaying) {
            bgMusic.play();
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        loadTrack(currentTrack - 1);
        if (isPlaying) {
            bgMusic.play();
        }
    });
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        bgMusic.volume = parseFloat(e.target.value);
    });
}

bgMusic.volume = 0.5;

bgMusic.addEventListener('ended', () => {
    loadTrack(currentTrack + 1);
    if (isPlaying) {
        bgMusic.play();
    }
});

loadTrack(0);

// MINIMIZE / EXPAND MUSIC PLAYER
const musicPlayer = document.getElementById('musicPlayer');
const minimizeBtn = document.getElementById('minimizeBtn');
const expandBtn = document.getElementById('expandBtn');

if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
        if (musicPlayer) musicPlayer.classList.add('minimized');
        if (expandBtn) expandBtn.classList.remove('hidden');
    });
}

if (expandBtn) {
    expandBtn.addEventListener('click', () => {
        if (musicPlayer) musicPlayer.classList.remove('minimized');
        if (expandBtn) expandBtn.classList.add('hidden');
    });
}

// MODAL
const modal = document.getElementById('projectModal');
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    const closeBtn = document.querySelector('.modal-close');
    const backBtn = document.querySelector('.modal-back-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backBtn) backBtn.addEventListener('click', closeModal);
}

// START
window.addEventListener('load', () => {
    typeBootText();
});
