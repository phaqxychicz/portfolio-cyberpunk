// ==================== BOOT SEQUENCE - VERSION MENTAH (PASTI JALAN) ====================
const bootTexts = [
    "> ROG STRIX BIOS v.4012<br>",
    "> Republic of Gamers - Cyberdeck Initiated<br>",
    "> Scanning neural link... OK<br>",
    "> Loading user profile: ZAMZAMI ... OK<br>",
    "> Entering the void...<br>",
    "> Load System ...<br>",
    "> ...[ COMPLETE ]...<br>"
];

const bootElement = document.getElementById('bootText');
const introLayer = document.getElementById('intro-layer');
let lineIndex = 0;

function showNextLine() {
    if (lineIndex < bootTexts.length) {
        bootElement.innerHTML += bootTexts[lineIndex];
        lineIndex++;
        setTimeout(showNextLine, 300); // setiap 300ms muncul 1 baris
    } else {
        // Selesai semua baris, tunggu 1 detik lalu sembunyikan intro
        setTimeout(() => {
            introLayer.style.opacity = '0';
            introLayer.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                introLayer.style.display = 'none';
                document.getElementById('slide1').classList.add('active-slide');
                updateSlideIndicator(1);
                
                // Panggil semua fungsi
                initNavigation();
                initSkillBar();
                initProjects();
                initContacts();
                initMusicPlayer();
                initMinimizePlayer();
                initModal();
            }, 500);
        }, 1000);
    }
}

// Mulai
window.addEventListener('load', () => {
    bootElement.innerHTML = '';
    showNextLine();
});
// ==================== SLIDE NAVIGATION ====================
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
    const dots = document.querySelectorAll('.slide-indicator .dot');
    dots.forEach((dot, idx) => {
        if (idx + 1 === slideNumber) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ==================== TOMBOL NAVIGASI ====================
function initNavigation() {
    const nextButtons = document.querySelectorAll('.next-slide-btn');
    nextButtons.forEach(btn => {
        btn.onclick = function() {
            const next = this.getAttribute('data-next');
            if (next) showSlide(parseInt(next));
        };
    });
    
    const prevButtons = document.querySelectorAll('.prev-slide-btn');
    prevButtons.forEach(btn => {
        btn.onclick = function() {
            const prev = this.getAttribute('data-prev');
            if (prev) showSlide(parseInt(prev));
        };
    });
}

// ==================== AUTO SKILL BAR ====================
function initSkillBar() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const percentSpan = card.querySelector('.skill-percent');
        const barFill = card.querySelector('.skill-bar-fill');
        if (percentSpan && barFill) {
            const percent = parseInt(percentSpan.textContent);
            barFill.style.width = percent + '%';
        }
    });
}

// ==================== PROJECTS ====================
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
        card.onclick = () => openModal(project);
        grid.appendChild(card);
    });
}

function openModal(project) {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').innerText = project.title;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalDesc').innerText = project.desc;
    document.getElementById('modalTech').innerHTML = `<strong>Tech:</strong> ${project.tech}`;
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.add('hidden');
}

// ==================== CONTACT BUTTONS ====================
function initContacts() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const btn = item.querySelector('.contact-btn');
        const type = item.getAttribute('data-type');
        const span = item.querySelector('span');
        const value = span.innerText;
        
        btn.onclick = () => {
            if (type === 'instagram') {
                window.open(`https://instagram.com/${value.replace('@', '')}`, '_blank');
            } else if (type === 'github') {
                window.open(`https://github.com/${value.replace('@', '')}`, '_blank');
            }
        };
    });
}

// ==================== MUSIC PLAYER ====================
const playlist = [
    { src: "assets/music/music-1.mp3", title: "music-1.mp3" },
    { src: "assets/music/music-2.mp3", title: "music-2.mp3" },
    { src: "assets/music/music-3.mp3", title: "music-3.mp3" }
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
    trackTitle.innerText = playlist[currentTrack].title;
    
    if (isPlaying) {
        bgMusic.play().catch(e => console.log('Playback failed:', e));
    }
}

function initMusicPlayer() {
    if (playPauseBtn) {
        playPauseBtn.onclick = () => {
            if (isPlaying) {
                bgMusic.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
            } else {
                bgMusic.play().catch(e => console.log('Playback failed:', e));
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = () => {
            loadTrack(currentTrack + 1);
            if (isPlaying) bgMusic.play();
        };
    }
    
    if (prevBtn) {
        prevBtn.onclick = () => {
            loadTrack(currentTrack - 1);
            if (isPlaying) bgMusic.play();
        };
    }
    
    if (volumeSlider) {
        volumeSlider.oninput = (e) => {
            bgMusic.volume = parseFloat(e.target.value);
        };
    }
    
    bgMusic.volume = 0.5;
    bgMusic.onended = () => {
        loadTrack(currentTrack + 1);
        if (isPlaying) bgMusic.play();
    };
    
    loadTrack(0);
}

// ==================== MINIMIZE MUSIC PLAYER ====================
function initMinimizePlayer() {
    const musicPlayer = document.getElementById('musicPlayer');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const expandBtn = document.getElementById('expandBtn');
    
    if (minimizeBtn) {
        minimizeBtn.onclick = () => {
            if (musicPlayer) musicPlayer.classList.add('minimized');
            if (expandBtn) expandBtn.classList.remove('hidden');
        };
    }
    
    if (expandBtn) {
        expandBtn.onclick = () => {
            if (musicPlayer) musicPlayer.classList.remove('minimized');
            if (expandBtn) expandBtn.classList.add('hidden');
        };
    }
}

// ==================== MODAL ====================
function initModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.modal-close');
    const backBtn = document.querySelector('.modal-back-btn');
    
    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };
    }
    if (closeBtn) closeBtn.onclick = closeModal;
    if (backBtn) backBtn.onclick = closeModal;
}

// ==================== START ====================
// Mulai animasi ngetik saat halaman load
window.addEventListener('load', () => {
    typeNextCharacter();
});
