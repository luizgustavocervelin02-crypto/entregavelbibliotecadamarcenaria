// Tab Switching Logic
function switchTab(tabId) {
    // Update active tab link
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick').includes(tabId)) {
            item.classList.add('active');
        }
    });

    // Update active section
    const sections = document.querySelectorAll('.tab-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    // Update titles
    const titles = {
        'aulas': { title: 'Minhas Aulas', sub: 'Assista e domine a arte da marcenaria.' },
        'renda': { title: 'Renda Extra', sub: 'Transforme seu conhecimento em faturamento.' },
        'pack': { title: 'Super Pack', sub: 'Baixe seus projetos e comece a criar.' },
        'bonus': { title: 'Conteúdo Bônus', sub: 'Vantagens exclusivas para alunos premium.' },
        'certificado': { title: 'Certificado de Conclusão', sub: 'Valide seu conhecimento técnico.' }
    };

    document.getElementById('pageTitle').innerText = titles[tabId].title;
    document.getElementById('pageSubtitle').innerText = titles[tabId].sub;

    // Refresh countdown if switching to certificate tab
    if (tabId === 'certificado') {
        updateCertificateStatus();
    }
}

// Login Modal Logic
function closeLogin() {
    const nameInput = document.getElementById('studentName');
    const studentName = nameInput.value.trim() || "Marceneiro(a)";

    document.getElementById('loginModal').style.display = 'none';

    // Save info to localStorage
    localStorage.setItem('student_name', studentName);

    if (!localStorage.getItem('first_access_date')) {
        const joinDate = new Date().getTime();
        localStorage.setItem('first_access_date', joinDate);
    }
    updateCertificateStatus();
}

// Certificate 7-day Logic
function updateCertificateStatus() {
    const firstAccess = localStorage.getItem('first_access_date');
    const studentName = localStorage.getItem('student_name') || "Marceneiro(a)";

    // Update name display
    const nameDisplay = document.getElementById('studentNameDisplay');
    if (nameDisplay) nameDisplay.innerText = studentName;

    if (!firstAccess) return;

    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    const timePassed = now - parseInt(firstAccess);
    const timeRemaining = sevenDaysInMs - timePassed;

    const certLocked = document.getElementById('certLocked');
    const certUnlocked = document.getElementById('certUnlocked');
    const timerDisplay = document.getElementById('countdownTimer');

    if (timeRemaining <= 0) {
        if (certLocked) certLocked.style.display = 'none';
        if (certUnlocked) certUnlocked.style.display = 'flex';
    } else {
        if (certLocked) certLocked.style.display = 'flex';
        if (certUnlocked) certUnlocked.style.display = 'none';

        // Calculate days, hours, minutes
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

        if (timerDisplay) timerDisplay.innerText = `${days}d ${hours}h ${minutes}m restantes`;
    }
}

// Initial Call
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is "logged in" (modal closed before)
    // For demo purposes, we always show modal if not dismissed in session
    if (sessionStorage.getItem('modal_dismissed')) {
        document.getElementById('loginModal').style.display = 'none';
    } else {
        sessionStorage.setItem('modal_dismissed', 'true');
    }

    updateCertificateStatus();
});
