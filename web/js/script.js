// Navigation
const navLinks = document.querySelectorAll('.nav-link:not(.logout):not(.external-link)');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const themeToggleBtn = document.getElementById('themeToggle');
const THEME_STORAGE_KEY = 'safestep-theme';
const BROADCAST_STORAGE_KEY = 'safestep-broadcasts';
const MOBILE_BREAKPOINT = 768;
const sidebarOverlay = document.createElement('div');
sidebarOverlay.className = 'sidebar-overlay';
document.body.appendChild(sidebarOverlay);

let toastCount = 0;
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.style.top = `${20 + (toastCount * 12)}px`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'triangle-exclamation' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="toast-close" type="button"><i class="fas fa-times"></i></button>
    `;
    document.body.appendChild(toast);
    toastCount += 1;

    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
        toastCount = Math.max(0, toastCount - 1);
    });

    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
            toastCount = Math.max(0, toastCount - 1);
        }
    }, 4000);
}

function isMobileView() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
}

function setMenuToggleIcon(isOpen) {
    if (!menuToggle) return;
    const icon = menuToggle.querySelector('i');
    if (!icon) return;
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-times', isOpen);
}

function setMobileSidebarState(isOpen) {
    if (!sidebar) return;

    if (!isMobileView()) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        setMenuToggleIcon(false);
        return;
    }

    sidebar.classList.toggle('active', isOpen);
    sidebarOverlay.classList.toggle('active', isOpen);
    document.body.classList.toggle('sidebar-open', isOpen);
    if (menuToggle) menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    setMenuToggleIcon(isOpen);
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = isDark
        ? '<i class="fas fa-sun"></i><span>Light</span>'
        : '<i class="fas fa-moon"></i><span>Dark</span>';
}

function initThemeToggle() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    applyTheme(savedTheme);
    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
    });
}

initThemeToggle();

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        pages.forEach(page => page.classList.remove('active'));
        
        const pageId = link.getAttribute('data-page');
        const targetPage = document.getElementById(pageId);
        
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        pageTitle.textContent = link.querySelector('span').textContent;
        
        if (pageId === 'tracking') {
            initMap();
            initGpsMap();
            startGpsUpdates();
        } else if (pageId === 'attendance') {
            renderAttendanceTable();
            updateAttendanceSummary();
        } else if (pageId === 'payments') {
            renderPaymentsTable();
            renderPaymentDiscounts();
            renderPackagesAndFeaturesFromPrice();
            renderFamilyOffers();
            initFamilySavingsCalculator();
        } else if (pageId === 'trip-history') {
            renderTripHistory();
        } else if (pageId === 'emergency-alerts') {
            renderEmergencyAlerts();
        } else if (pageId === 'profile-settings') {
            initProfileSettings();
        }
        
        if (isMobileView()) setMobileSidebarState(false);
    });
});

// Logout functionality
document.querySelector('.nav-link.logout').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Logging out...');
    // Add actual logout logic here
});

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        setMobileSidebarState(!sidebar.classList.contains('active'));
    });
}

sidebarOverlay.addEventListener('click', () => setMobileSidebarState(false));

window.addEventListener('resize', () => {
    if (!isMobileView()) setMobileSidebarState(false);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMobileSidebarState(false);
});

setMobileSidebarState(false);

// Simulate real-time updates
let simulatedEta = 8;

function updateDashboardData() {
    const etaElement = document.getElementById('etaTime');
    if (etaElement) {
        simulatedEta = simulatedEta > 1 ? simulatedEta - 1 : 8;
        etaElement.textContent = simulatedEta + ' mins';
    }
    
    const speedElement = document.getElementById('busSpeed');
    const randomSpeed = Math.floor(Math.random() * 20) + 35;
    if (speedElement) {
        speedElement.textContent = randomSpeed;
    }

    const distanceElement = document.getElementById('distanceText');
    if (distanceElement) {
        const distance = (simulatedEta * 0.3 + Math.random()).toFixed(1);
        distanceElement.textContent = `${distance} km away`;
    }
    
    const trackingSpeed = document.getElementById('trackingSpeed');
    if (trackingSpeed) {
        trackingSpeed.textContent = randomSpeed + ' km/h';
    }
    
    const trackingEta = document.getElementById('trackingEta');
    if (trackingEta) {
        trackingEta.textContent = simulatedEta + ' mins';
    }
}

updateDashboardData();
setInterval(updateDashboardData, 10000);

// Children Page Data (default; overridden by API if available)
let childrenData = [
    {
        name: 'Farida Mohamed',
        grade: 'Grade 5 - Section A',
        avatar: 'https://source.unsplash.com/300x300/?egyptian,girl,portrait&sig=21',
        status: 'On Bus',
        statusClass: 'on-bus',
        pickupLocation: 'Khaled Ibn El-Walid St, Sidi Bishr, Alexandria',
        pickupTime: '7:45 AM',
        dropLocation: 'Al-Iqbal National School',
        dropTime: '8:15 AM',
        busNumber: 'Bus #42',
        driver: 'Omer mohamed',
        attendance: [true, true, true, true, true, false, true]
    },
    {
        name: 'Saif Mohamed',
        grade: 'Grade 3 - Section B',
        avatar: 'https://source.unsplash.com/300x300/?egyptian,child,portrait&sig=22',
        status: 'On Bus',
        statusClass: 'on-bus',
        pickupLocation: 'Khaled Ibn El-Walid St, Sidi Bishr, Alexandria',
        pickupTime: '7:45 AM',
        dropLocation: 'Al-Iqbal National School',
        dropTime: '8:15 AM',
        busNumber: 'Bus #42',
        driver: 'Omer mohamed',
        attendance: [true, true, true, true, true, false, true]
    }
];

function getChildAttendanceSummary(childName) {
    const records = attendanceData.filter(record => record.child === childName);
    const present = records.filter(record => record.status === 'Present').length;
    const absent = records.filter(record => record.status === 'Absent').length;
    const totalSchoolDays = 180;
    const remaining = Math.max(totalSchoolDays - (present + absent), 0);
    return { present, absent, remaining };
}

function getAttendanceWeekMarkup(attendance) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return attendance.map((present, index) => `
        <div class="attendance-day ${present ? 'present' : 'absent'}">
            <div class="day-name">${days[index]}</div>
            <div class="day-icon">
                <i class="fas fa-${present ? 'check-circle' : 'times-circle'}"></i>
            </div>
        </div>
    `).join('');
}

function notifyDriverAboutAbsence(child) {
    const driverAlert = {
        type: 'warning',
        icon: 'fa-user-clock',
        title: 'Child Absent Today',
        message: `${child.name} will not go to school today. Driver has been notified.`,
        time: 'Just now'
    };

    notifications.unshift(driverAlert);
    renderNotifications();

    const today = new Date().toISOString().slice(0, 10);
    const exists = attendanceData.some(record => record.child === child.name && record.date === today);
    if (!exists) {
        attendanceData.unshift({
            date: today,
            child: child.name,
            status: 'Absent',
            pickupTime: '-',
            dropTime: '-'
        });
    }

    // Shared signal for driver dashboard/session
    localStorage.setItem('driver_absence_alert', JSON.stringify({
        child: child.name,
        date: today,
        message: `${child.name} is absent today`
    }));

    renderAttendanceTable();
    renderChildrenSections();
}

function markChildAbsentToday(index) {
    const child = childrenData[index];
    if (!child) return;

    if (!confirm(`Confirm that ${child.name} will not go today?`)) return;

    child.status = 'Absent Today';
    child.statusClass = 'absent';
    notifyDriverAboutAbsence(child);
}

function renderChildrenSections() {
    const container = document.getElementById('childrenSectionsContainer');
    if (!container) return;

    container.innerHTML = childrenData.map((child, index) => {
        const summary = getChildAttendanceSummary(child.name);
        return `
            <div class="card child-info-card child-section-card">
                <div class="child-header">
                    <div class="child-avatar">
                        <img src="${child.avatar}" alt="${child.name}">
                    </div>
                    <div class="child-basic-info">
                        <h2>${child.name}</h2>
                        <p>${child.grade}</p>
                    </div>
                    <div class="child-status-badge ${child.statusClass}">
                        <i class="fas fa-bus"></i>
                        <span>${child.status}</span>
                    </div>
                </div>
                <div class="child-details-grid">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div><label>Pickup</label><p>${child.pickupLocation}</p></div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <div><label>Pickup Time</label><p>${child.pickupTime}</p></div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-pin"></i>
                        <div><label>Drop Location</label><p>${child.dropLocation}</p></div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-stopwatch"></i>
                        <div><label>Drop Time</label><p>${child.dropTime}</p></div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-user-tie"></i>
                        <div><label>Driver</label><p>${child.driver}</p></div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-bus"></i>
                        <div><label>Bus</label><p>${child.busNumber}</p></div>
                    </div>
                </div>
                <div class="attendance-section">
                    <h4>Attendance Snapshot</h4>
                    <div class="child-attendance-metrics">
                        <div class="metric-chip present"><i class="fas fa-check-circle"></i> Present: ${summary.present}</div>
                        <div class="metric-chip absent"><i class="fas fa-times-circle"></i> Absent: ${summary.absent}</div>
                        <div class="metric-chip remaining"><i class="fas fa-calendar-day"></i> Remaining: ${summary.remaining} days</div>
                    </div>
                    <div class="attendance-grid">
                        ${getAttendanceWeekMarkup(child.attendance)}
                    </div>
                    <div class="child-actions-row">
                        <button class="btn-secondary child-action-btn" type="button" onclick="markChildAbsentToday(${index})">
                            <i class="fas fa-user-slash"></i> Not Going Today
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Children sections are initialized after attendance data is ready.

// Recent Activity (default; overridden by API if available)
let recentEvents = [
    {
        type: 'success',
        icon: 'fa-check',
        colorClass: 'green',
        title: 'Farida Mohamed picked up',
        time: 'Today at 7:45 AM'
    },
    {
        type: 'success',
        icon: 'fa-check',
        colorClass: 'green',
        title: 'Saif Mohamed picked up',
        time: 'Today at 7:47 AM'
    },
    {
        type: 'info',
        icon: 'fa-info',
        colorClass: 'blue',
        title: 'Bus departed from terminal',
        time: 'Today at 7:30 AM'
    }
];

function renderRecentActivity() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    activityList.innerHTML = '';
    recentEvents.forEach(event => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon ${event.colorClass}">
                <i class="fas ${event.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${event.title}</p>
                <span>${event.time}</span>
            </div>
        `;
        activityList.appendChild(item);
    });
}

// Notifications Data (default; overridden by API if available)
let notifications = [
    {
        id: 1001,
        type: 'success',
        icon: 'fa-check-circle',
        title: 'Child Picked Up',
        message: 'Emma Johnson has been picked up successfully',
        time: '5 minutes ago'
    },
    {
        id: 1005,
        type: 'message',
        icon: 'fa-comment-dots',
        title: 'New Message from Support',
        message: 'We received your inquiry and are ready to help. How can we assist you further?',
        time: 'Just now',
        canReply: true
    },
    {
        id: 1002,
        type: 'success',
        icon: 'fa-check-circle',
        title: 'Child Picked Up',
        message: 'Lucas Johnson has been picked up successfully',
        time: '5 minutes ago'
    },
    {
        id: 1003,
        type: 'info',
        icon: 'fa-info-circle',
        title: 'Bus Departed',
        message: 'Bus #42 has departed from terminal',
        time: '30 minutes ago'
    },
    {
        id: 1004,
        type: 'warning',
        icon: 'fa-exclamation-triangle',
        title: 'Slight Delay',
        message: 'Bus is running 3 minutes behind schedule due to traffic',
        time: '1 hour ago'
    }
];

function getBroadcastIcon(type) {
    if (type === 'emergency') return 'fa-triangle-exclamation';
    if (type === 'delay') return 'fa-clock';
    if (type === 'route-change') return 'fa-route';
    return 'fa-info-circle';
}

function loadBroadcastNotifications(role) {
    try {
        const raw = localStorage.getItem(BROADCAST_STORAGE_KEY);
        if (!raw) return;
        const broadcasts = JSON.parse(raw);
        if (!Array.isArray(broadcasts)) return;

        const existingIds = new Set(notifications.map(n => n.id));
        broadcasts
            .filter(b => b.target === role)
            .forEach(b => {
                if (existingIds.has(b.id)) return;
                notifications.unshift({
                    id: b.id,
                    type: b.type === 'emergency' ? 'warning' : b.type === 'delay' ? 'warning' : 'info',
                    icon: getBroadcastIcon(b.type),
                    title: b.title,
                    message: b.message,
                    time: new Date(b.createdAt).toLocaleString()
                });
            });
    } catch (err) {
        console.warn('Failed to load broadcast notifications', err);
    }
}

function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = '';
    
    notifications.forEach(notification => {
        const isMessage = notification.type === 'message' || notification.kind === 'message' || notification.category === 'message' || notification.canReply === true;
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'notification-item ' + notification.type + (isMessage ? ' message' : '');
        const replyMarkup = isMessage ? `
            <div class="notification-reply">
                <label class="sr-only" for="reply-${notification.id}">Reply</label>
                <textarea class="form-control reply-input" id="reply-${notification.id}" rows="2" placeholder="Write a reply..."></textarea>
                <div class="reply-actions">
                    <button class="btn-secondary btn-reply-cancel" type="button" data-id="${notification.id}">Clear</button>
                    <button class="btn-primary btn-reply-send" type="button" data-id="${notification.id}">
                        <i class="fas fa-paper-plane"></i> Send
                    </button>
                    <span class="reply-status" id="reply-status-${notification.id}" aria-live="polite"></span>
                </div>
            </div>
        ` : '';
        notificationDiv.innerHTML = `
            <div class="notification-icon-wrapper">
                <i class="fas ${notification.icon}"></i>
            </div>
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <span class="time">${notification.time}</span>
                ${replyMarkup}
            </div>
        `;
        notificationsList.appendChild(notificationDiv);
    });
}

const notificationsList = document.getElementById('notificationsList');
if (notificationsList) {
    notificationsList.addEventListener('click', (event) => {
        const sendBtn = event.target.closest('.btn-reply-send');
        const clearBtn = event.target.closest('.btn-reply-cancel');
        if (!sendBtn && !clearBtn) return;

        const id = (sendBtn || clearBtn).getAttribute('data-id');
        const input = document.getElementById(`reply-${id}`);
        const status = document.getElementById(`reply-status-${id}`);
        if (!input) return;

        if (clearBtn) {
            input.value = '';
            if (status) status.textContent = '';
            return;
        }

        const message = input.value.trim();
        if (!message) {
            if (status) status.textContent = 'Please write a reply first.';
            return;
        }

        input.value = '';
        if (status) status.textContent = 'Reply sent.';
        setTimeout(() => { if (status) status.textContent = ''; }, 2000);
    });
}

// Add test notification
document.getElementById('addNotificationBtn').addEventListener('click', () => {
    const testNotifications = [
        {
            type: 'success',
            icon: 'fa-check-circle',
            title: 'Test Notification',
            message: 'This is a test success notification',
            time: 'Just now'
        },
        {
            type: 'info',
            icon: 'fa-info-circle',
            title: 'Information',
            message: 'This is a test information notification',
            time: 'Just now'
        },
        {
            type: 'warning',
            icon: 'fa-exclamation-triangle',
            title: 'Warning',
            message: 'This is a test warning notification',
            time: 'Just now'
        }
    ];
    
    const randomNotification = testNotifications[Math.floor(Math.random() * testNotifications.length)];
    notifications.unshift(randomNotification);
    renderNotifications();
});

// Initialize notifications
loadBroadcastNotifications('parent');
renderNotifications();

async function syncNotificationsFromApi() {
    try {
        const response = await fetch('http://localhost:4000/api/notifications');
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data) && data.length) {
            notifications = data;
            renderNotifications();
        }
    } catch (err) {
        console.warn('Failed to load notifications from API, using local data.', err);
    }
}

syncNotificationsFromApi();

// Tracking Map Animation + GPS
let busPosition = { x: 50, y: 400 };
let animationFrame;
let gpsMap;
let gpsMarker;
let gpsUpdateInterval = null;

async function initGpsMap() {
    const container = document.getElementById('gpsMap');
    if (!container || typeof L === 'undefined') return;

    if (!gpsMap) {
        gpsMap = L.map('gpsMap').setView([31.21564, 29.95527], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(gpsMap);

        gpsMarker = L.marker([31.21564, 29.95527]).addTo(gpsMap)
            .bindPopup('School Bus');
    }

    await updateGpsFromApi();
}

async function updateGpsFromApi() {
    try {
        const res = await fetch('http://localhost:4000/api/tracking');
        if (!res.ok) return;
        const data = await res.json();

        const { lat, lng, speedKmh, etaMinutes } = data;

        if (gpsMarker) {
            gpsMarker.setLatLng([lat, lng]);
            if (gpsMap) {
                gpsMap.setView([lat, lng], gpsMap.getZoom());
            }
        }

        const trackingSpeed = document.getElementById('trackingSpeed');
        const trackingEta = document.getElementById('trackingEta');
        if (trackingSpeed && typeof speedKmh !== 'undefined') {
            trackingSpeed.textContent = `${speedKmh} km/h`;
        }
        if (trackingEta && typeof etaMinutes !== 'undefined') {
            trackingEta.textContent = `${etaMinutes} mins`;
        }
    } catch (err) {
        console.warn('GPS API error', err);
    }
}

function startGpsUpdates() {
    if (gpsUpdateInterval) return;
    gpsUpdateInterval = setInterval(updateGpsFromApi, 10000);
}

function stopGpsUpdates() {
    if (gpsUpdateInterval) {
        clearInterval(gpsUpdateInterval);
        gpsUpdateInterval = null;
    }
}

function initMap() {
    const canvas = document.getElementById('mapCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Route coordinates (simplified)
    const route = [
        { x: 50, y: 400 },
        { x: 150, y: 350 },
        { x: 250, y: 300 },
        { x: 350, y: 250 },
        { x: 450, y: 200 },
        { x: 550, y: 150 },
        { x: 650, y: 100 }
    ];
    
    let currentPoint = 0;
    let progress = 0;
    
    function drawMap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw route
        ctx.strokeStyle = '#4A90E2';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(route[0].x, route[0].y);
        for (let i = 1; i < route.length; i++) {
            ctx.lineTo(route[i].x, route[i].y);
        }
        ctx.stroke();
        
        // Draw route points
        route.forEach((point, index) => {
            ctx.fillStyle = index === 0 ? '#2ECC71' : (index === route.length - 1 ? '#E74C3C' : '#4A90E2');
            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Calculate bus position
        if (currentPoint < route.length - 1) {
            const start = route[currentPoint];
            const end = route[currentPoint + 1];
            
            busPosition.x = start.x + (end.x - start.x) * progress;
            busPosition.y = start.y + (end.y - start.y) * progress;
            
            progress += 0.01;
            
            if (progress >= 1) {
                progress = 0;
                currentPoint++;
                if (currentPoint >= route.length - 1) {
                    currentPoint = 0;
                }
            }
        }
        
        // Draw bus
        ctx.save();
        ctx.translate(busPosition.x, busPosition.y);
        
        // Bus shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(-18, 7, 36, 20);
        
        // Bus body
        ctx.fillStyle = '#F39C12';
        ctx.fillRect(-15, -15, 30, 30);
        
        // Bus windows
        ctx.fillStyle = '#3498DB';
        ctx.fillRect(-12, -12, 10, 10);
        ctx.fillRect(2, -12, 10, 10);
        
        // Bus icon
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🚌', 0, 0);
        
        ctx.restore();
        
        animationFrame = requestAnimationFrame(drawMap);
    }
    
    drawMap();
}

// Stop animation when leaving tracking page
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (link.getAttribute('data-page') !== 'tracking' && animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        if (link.getAttribute('data-page') !== 'tracking') {
            stopGpsUpdates();
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (document.getElementById('tracking').classList.contains('active')) {
        const canvas = document.getElementById('mapCanvas');
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    }
});

// Call driver button
const callButtons = document.querySelectorAll('.btn-call');
callButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Calling Omer Mohamed at +20 100 123 4567...');
    });
});

// Contact Driver button in tracking
const contactDriverBtns = document.querySelectorAll('.tracking-footer .btn-secondary');
if (contactDriverBtns.length > 0) {
    contactDriverBtns[0].addEventListener('click', () => {
        alert('Calling driver Omer Mohamed...\n\nPhone: +20 100 123 4567');
    });
}

// Share Location button in tracking
const shareLocationBtns = document.querySelectorAll('.tracking-footer .btn-primary');
if (shareLocationBtns.length > 0) {
    shareLocationBtns[0].addEventListener('click', () => {
        const shareText = 'Check my child\'s location: ' + window.location.href;
        if (navigator.share) {
            navigator.share({ title: 'Child Location', text: shareText });
        } else {
            navigator.clipboard.writeText(shareText);
            alert('Location link copied to clipboard!');
        }
    });
}

// Support buttons
const supportButtons = document.querySelectorAll('.support-card .btn-primary');
supportButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (index === 0) {
            // Call Now
            alert('Calling support team...\n\nPhone: +20 2 1234 5678');
        } else if (index === 1) {
            // Live Chat
            alert('Opening live chat...\n\nWe are online and ready to help!');
        } else if (index === 2) {
            // Email
            alert('Opening email client...\n\nTo: support@bustracker.com\nSubject: Support Request');
        }
    });
});

// Make Payment button
const makePaymentBtn = document.getElementById('makePaymentBtn');
if (makePaymentBtn) {
    makePaymentBtn.addEventListener('click', () => {
        window.location.href = 'pay.html';
    });
}

// Notification icon click
const notificationIcon = document.querySelector('.notification-icon');
if (notificationIcon) {
    notificationIcon.addEventListener('click', () => {
        const notificationsLink = document.querySelector('.nav-link[data-page="notifications"]');
        if (notificationsLink) {
            notificationsLink.click();
        }
    });
}

// Attendance Data
const attendanceData = [
    { date: '2024-02-19', child: 'Farida Mohamed', status: 'Present', pickupTime: '7:45 AM', dropTime: '8:15 AM' },
    { date: '2024-02-18', child: 'Farida Mohamed', status: 'Present', pickupTime: '7:43 AM', dropTime: '8:12 AM' },
    { date: '2024-02-17', child: 'Farida Mohamed', status: 'Present', pickupTime: '7:47 AM', dropTime: '8:18 AM' },
    { date: '2024-02-16', child: 'Farida Mohamed', status: 'Absent', pickupTime: '-', dropTime: '-' },
    { date: '2024-02-15', child: 'Farida Mohamed', status: 'Present', pickupTime: '7:45 AM', dropTime: '8:15 AM' },
    { date: '2024-02-14', child: 'Saif Mohamed', status: 'Present', pickupTime: '7:45 AM', dropTime: '8:15 AM' },
    { date: '2024-02-13', child: 'Saif Mohamed', status: 'Present', pickupTime: '7:44 AM', dropTime: '8:14 AM' },
    { date: '2024-02-12', child: 'Saif Mohamed', status: 'Present', pickupTime: '7:46 AM', dropTime: '8:16 AM' }
];

function renderAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    if (attendanceData.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="5">No attendance records available.</td></tr>';
        updateAttendanceSummary();
        return;
    }
    attendanceData.forEach(record => {
        const tr = document.createElement('tr');
        const statusClass = record.status === 'Present' ? 'active' : 'inactive';
        tr.innerHTML = `
            <td>${new Date(record.date).toLocaleDateString()}</td>
            <td><strong>${record.child}</strong></td>
            <td><span class="status-badge ${statusClass}">${record.status}</span></td>
            <td>${record.pickupTime}</td>
            <td>${record.dropTime}</td>
        `;
        tbody.appendChild(tr);
    });
    updateAttendanceSummary();
}

function updateAttendanceSummary() {
    const missedPickupCount = attendanceData.filter(record => record.pickupTime === '-' || record.pickupTime === 'Missed').length;
    const missedDropoffCount = attendanceData.filter(record => record.dropTime === '-' || record.dropTime === 'Missed').length;
    const missedPickupEl = document.getElementById('missedPickupCount');
    const missedDropoffEl = document.getElementById('missedDropoffCount');
    if (missedPickupEl) missedPickupEl.textContent = missedPickupCount;
    if (missedDropoffEl) missedDropoffEl.textContent = missedDropoffCount;
}

renderChildrenSections();

// Payments Data
const paymentsData = [
    { date: '2024-02-15', amount: 'EGP 300', method: 'Cash', status: 'Paid', invoice: 'INV-001' },
    { date: '2024-01-15', amount: 'EGP 300', method: 'Bank Transfer', status: 'Paid', invoice: 'INV-002' },
    { date: '2023-12-15', amount: 'EGP 300', method: 'Cash', status: 'Paid', invoice: 'INV-003' },
    { date: '2024-03-15', amount: 'EGP 300', method: 'Credit Card', status: 'Pending', invoice: 'INV-004' }
];

const usageDiscounts = [
    {
        title: 'Full-Month Attendance Discount',
        percent: 10,
        note: 'No absences in current month',
        status: 'Applied'
    },
    {
        title: 'Sibling Discount',
        percent: 15,
        note: 'Two children on same route',
        status: 'Applied'
    },
    {
        title: 'Early Payment Discount',
        percent: 5,
        note: 'Pay before day 5 each month',
        status: 'Available'
    }
];

const familyOffers = [
    '7-day free trial for every family',
    '20% discount for 3 children or more',
    '25% discount on yearly payment'
];

function renderPaymentsTable() {
    const tbody = document.getElementById('paymentsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    paymentsData.forEach(payment => {
        const tr = document.createElement('tr');
        const statusClass = payment.status === 'Paid' ? 'active' : 'pending';
        tr.innerHTML = `
            <td>${new Date(payment.date).toLocaleDateString()}</td>
            <td><strong>${payment.amount}</strong></td>
            <td>${payment.method}</td>
            <td><span class="status-badge ${statusClass}">${payment.status}</span></td>
            <td><a href="#" class="view-all">${payment.invoice}</a></td>
        `;
        tbody.appendChild(tr);
    });
}

function exportTableToCsv(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return;
    const rows = Array.from(table.querySelectorAll('tr'));
    const csv = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => `"${cell.textContent.replace(/\s+/g, ' ').trim().replace(/"/g, '""')}"`).join(',');
    }).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename || 'export'}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportTableToPdf(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return;
    const rows = Array.from(table.querySelectorAll('tr'));
    const text = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => cell.textContent.replace(/\s+/g, ' ').trim()).join(' | ');
    }).join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename || 'export'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const tripHistoryData = [
    { date: '2024-02-19', bus: 'Bus #42', driver: 'Omer Mohamed', pickup: '7:45 AM', dropoff: '8:15 AM', route: 'Route A' },
    { date: '2024-02-18', bus: 'Bus #42', driver: 'Omer Mohamed', pickup: '7:43 AM', dropoff: '8:12 AM', route: 'Route A' },
    { date: '2024-02-17', bus: 'Bus #15', driver: 'Mohamed Ali', pickup: '7:50 AM', dropoff: '8:20 AM', route: 'Route B' },
    { date: '2024-02-16', bus: 'Bus #15', driver: 'Mohamed Ali', pickup: '7:55 AM', dropoff: '8:25 AM', route: 'Route B' }
];

function populateTripHistoryFilters() {
    const routeFilter = document.getElementById('tripHistoryRouteFilter');
    if (!routeFilter) return;
    const current = routeFilter.value || 'all';
    const routes = [...new Set(tripHistoryData.map(t => t.route))];
    routeFilter.innerHTML = ['<option value="all">All Routes</option>']
        .concat(routes.map(route => `<option value="${route}">${route}</option>`))
        .join('');
    routeFilter.value = routes.includes(current) ? current : 'all';
}

function renderTripHistory() {
    const tbody = document.getElementById('tripHistoryBody');
    if (!tbody) return;
    const dateFilter = document.getElementById('tripHistoryDateFilter')?.value || '';
    const routeFilter = document.getElementById('tripHistoryRouteFilter')?.value || 'all';
    populateTripHistoryFilters();

    const filtered = tripHistoryData.filter(item => {
        const dateMatch = !dateFilter || item.date === dateFilter;
        const routeMatch = routeFilter === 'all' || item.route === routeFilter;
        return dateMatch && routeMatch;
    });

    tbody.innerHTML = '';
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="6">No trip history available.</td></tr>';
        return;
    }
    filtered.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(item.date).toLocaleDateString()}</td>
            <td><strong>${item.bus}</strong></td>
            <td>${item.driver}</td>
            <td>${item.pickup}</td>
            <td>${item.dropoff}</td>
            <td>${item.route}</td>
        `;
        tbody.appendChild(tr);
    });
}

const emergencyAlertsData = [
    { id: 1, bus: 'Bus #42', driver: 'Omer Mohamed', location: 'Sidi Bishr, Alexandria', type: 'delay', time: '08:12 AM', notes: 'Traffic congestion' },
    { id: 2, bus: 'Bus #15', driver: 'Mohamed Ali', location: 'Sporting, Alexandria', type: 'medical', time: '08:20 AM', notes: 'Student felt dizzy' }
];

function updateEmergencyBadge() {
    const badge = document.getElementById('emergencyAlertsBadge');
    if (!badge) return;
    badge.textContent = `${emergencyAlertsData.length} Active`;
}

function renderEmergencyAlerts() {
    const tbody = document.getElementById('emergencyAlertsBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (emergencyAlertsData.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="6">No emergency alerts available.</td></tr>';
        updateEmergencyBadge();
        return;
    }
    emergencyAlertsData.forEach(alert => {
        const tr = document.createElement('tr');
        if (alert.type === 'medical' || alert.type === 'accident') {
            tr.classList.add('emergency-critical');
        }
        tr.innerHTML = `
            <td><strong>${alert.bus}</strong></td>
            <td>${alert.driver}</td>
            <td>${alert.location}</td>
            <td><span class="status-badge ${alert.type === 'delay' ? 'delay' : 'emergency'}">${alert.type}</span></td>
            <td>${alert.time}</td>
            <td>${alert.notes}</td>
        `;
        tbody.appendChild(tr);
    });
    updateEmergencyBadge();
}

const PARENT_SETTINGS_KEY = 'parent-dashboard-settings';
let profileSettingsInitialized = false;

function setFieldError(input, message) {
    if (!input) return;
    const group = input.closest('.form-group');
    if (!group) return;
    let error = group.querySelector('.error-text');
    if (!error) {
        error = document.createElement('p');
        error.className = 'error-text';
        group.appendChild(error);
    }
    input.classList.toggle('field-error', Boolean(message));
    error.textContent = message || '';
}

function validateParentField(input) {
    if (!input) return true;
    const value = input.value.trim();
    let message = '';

    if (input.id === 'parentName' && value.length < 2) {
        message = 'Please enter a full name.';
    }

    if (input.id === 'parentPhone') {
        const phoneOk = /^\+?[\d\s()-]{7,}$/.test(value);
        if (!phoneOk) message = 'Please enter a valid phone number.';
    }

    if (input.id === 'parentEmail') {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!emailOk) message = 'Please enter a valid email address.';
    }

    if (input.id === 'parentPassword' && value.length > 0 && value.length < 6) {
        message = 'Password must be at least 6 characters.';
    }

    setFieldError(input, message);
    return message === '';
}

function initProfileSettings() {
    const nameInput = document.getElementById('parentName');
    const phoneInput = document.getElementById('parentPhone');
    const emailInput = document.getElementById('parentEmail');
    const passwordInput = document.getElementById('parentPassword');
    const emailAlerts = document.getElementById('emailAlerts');
    const smsAlerts = document.getElementById('smsAlerts');

    if (!nameInput || !phoneInput || !emailInput) return;

    if (!profileSettingsInitialized) {
        [nameInput, phoneInput, emailInput, passwordInput].filter(Boolean).forEach(input => {
            input.addEventListener('input', () => validateParentField(input));
            input.addEventListener('blur', () => validateParentField(input));
        });
        profileSettingsInitialized = true;
    }

    const saved = localStorage.getItem(PARENT_SETTINGS_KEY);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.name) nameInput.value = data.name;
            if (data.phone) phoneInput.value = data.phone;
            if (data.email) emailInput.value = data.email;
            if (typeof data.emailAlerts === 'boolean' && emailAlerts) emailAlerts.checked = data.emailAlerts;
            if (typeof data.smsAlerts === 'boolean' && smsAlerts) smsAlerts.checked = data.smsAlerts;
        } catch (error) {
            // ignore corrupted settings
        }
    }
}

function saveParentSettings() {
    const nameInput = document.getElementById('parentName');
    const phoneInput = document.getElementById('parentPhone');
    const emailInput = document.getElementById('parentEmail');
    const passwordInput = document.getElementById('parentPassword');
    const emailAlerts = document.getElementById('emailAlerts');
    const smsAlerts = document.getElementById('smsAlerts');

    const fields = [nameInput, phoneInput, emailInput, passwordInput].filter(Boolean);
    const isValid = fields.every(field => validateParentField(field));
    if (!isValid) {
        showToast('Please fix the highlighted fields before saving.', 'warning');
        return;
    }

    const settings = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim(),
        emailAlerts: emailAlerts ? emailAlerts.checked : true,
        smsAlerts: smsAlerts ? smsAlerts.checked : true
    };

    localStorage.setItem(PARENT_SETTINGS_KEY, JSON.stringify(settings));

    const profileName = document.querySelector('.topbar .profile span');
    if (profileName) profileName.textContent = settings.name;

    if (passwordInput) passwordInput.value = '';
    showToast('Profile settings saved successfully.', 'success');
}

function bindTripHistoryFilters() {
    const dateFilter = document.getElementById('tripHistoryDateFilter');
    const routeFilter = document.getElementById('tripHistoryRouteFilter');
    if (dateFilter) dateFilter.addEventListener('change', renderTripHistory);
    if (routeFilter) routeFilter.addEventListener('change', renderTripHistory);
}

let emergencyAlertId = emergencyAlertsData.length + 1;
function simulateEmergencyAlert() {
    if (Math.random() < 0.65) return;
    const types = ['delay', 'medical', 'accident'];
    const type = types[Math.floor(Math.random() * types.length)];
    const newAlert = {
        id: emergencyAlertId++,
        bus: 'Bus #42',
        driver: 'Omer Mohamed',
        location: 'Khaled Ibn El-Walid St, Alexandria',
        type,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notes: type === 'delay' ? 'Traffic slowdown reported' : 'Immediate attention required'
    };
    emergencyAlertsData.unshift(newAlert);
    emergencyAlertsData.splice(6);
    updateEmergencyBadge();
    if (document.getElementById('emergency-alerts')?.classList.contains('active')) {
        renderEmergencyAlerts();
    }
    showToast(`Emergency alert: ${type.toUpperCase()} on ${newAlert.bus}`, type === 'delay' ? 'warning' : 'error');
}

bindTripHistoryFilters();
updateEmergencyBadge();
setInterval(simulateEmergencyAlert, 45000);

function renderPaymentDiscounts() {
    const container = document.getElementById('paymentDiscountsList');
    if (!container) return;

    container.innerHTML = usageDiscounts.map(discount => `
        <div class="discount-item">
            <div class="discount-main">
                <h4>${discount.title}</h4>
                <p>${discount.note}</p>
            </div>
            <div class="discount-meta">
                <span class="discount-percent">-${discount.percent}%</span>
                <span class="status-badge ${discount.status === 'Applied' ? 'active' : 'pending'}">${discount.status}</span>
            </div>
        </div>
    `).join('');
}

renderPaymentDiscounts();

function renderFamilyOffers() {
    const list = document.getElementById('familyOffersList');
    if (!list) return;

    list.innerHTML = familyOffers.map(offer => `<li>${offer}</li>`).join('');
}

async function renderPackagesAndFeaturesFromPrice() {
    const container = document.getElementById('packagesFeaturesContainer');
    if (!container) return;

    try {
        const response = await fetch('price.html');
        if (!response.ok) throw new Error('Failed to load price page');

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const featuresItems = Array.from(doc.querySelectorAll('.pricing-card .features li'))
            .map(item => item.textContent.trim())
            .filter(Boolean);

        const packageCards = Array.from(doc.querySelectorAll('.pricing-cards .card')).map(card => {
            const name = card.querySelector('h2')?.textContent.trim() || '';
            const price = card.querySelector('h3')?.textContent.trim() || '';
            const subtitle = card.querySelector('.price')?.textContent.trim() || '';
            const perks = Array.from(card.querySelectorAll('ul li'))
                .map(item => item.textContent.trim())
                .filter(Boolean)
                .slice(0, 5);
            return { name, price, subtitle, perks };
        }).filter(pkg => pkg.name);

        if (!featuresItems.length && !packageCards.length) {
            throw new Error('No packages/features found in price page');
        }

        container.innerHTML = `
            <div class="packages-layout">
                <div class="features-column">
                    <h4>Included Features</h4>
                    <ul>
                        ${featuresItems.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="plans-column">
                    ${packageCards.map(pkg => `
                        <div class="mini-plan-card">
                            <h5>${pkg.name}</h5>
                            <p class="plan-price">${pkg.price} EGP</p>
                            <p class="plan-subtitle">${pkg.subtitle}</p>
                            <ul>
                                ${pkg.perks.map(perk => `<li>${perk}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `
            <div class="packages-layout">
                <div class="features-column">
                    <h4>Included Features</h4>
                    <ul>
                        <li>Live GPS tracking on map</li>
                        <li>Pickup and drop-off notifications</li>
                        <li>Dedicated Parent and Supervisor applications</li>
                        <li>Reports and export dashboards</li>
                    </ul>
                </div>
                <div class="plans-column">
                    <div class="mini-plan-card">
                        <h5>Smart Plan</h5>
                        <p class="plan-price">450 EGP</p>
                        <p class="plan-subtitle">/ month / per child</p>
                    </div>
                    <div class="mini-plan-card">
                        <h5>Premium Plan</h5>
                        <p class="plan-price">650 EGP</p>
                        <p class="plan-subtitle">/ month / per child</p>
                    </div>
                    <div class="mini-plan-card">
                        <h5>Private VIP</h5>
                        <p class="plan-price">950 EGP</p>
                        <p class="plan-subtitle">/ month / per child</p>
                    </div>
                </div>
            </div>
        `;
    }
}

renderPackagesAndFeaturesFromPrice();

let familyCalcInitialized = false;
function calculateFamilySavings() {
    const childrenInput = document.getElementById('calcChildrenCount');
    const currentCostInput = document.getElementById('calcCurrentCost');
    const planPriceInput = document.getElementById('calcPlanPrice');
    const paymentModeInput = document.getElementById('calcPaymentMode');
    const savingValue = document.getElementById('familySavingValue');
    const currentTotalEl = document.getElementById('familyCurrentTotal');
    const schoolTotalEl = document.getElementById('familySchoolTotal');

    if (!childrenInput || !currentCostInput || !planPriceInput || !paymentModeInput || !savingValue || !currentTotalEl || !schoolTotalEl) return;

    const childrenCount = Math.max(1, Number(childrenInput.value) || 1);
    const currentCost = Math.max(0, Number(currentCostInput.value) || 0);
    const planPrice = Math.max(0, Number(planPriceInput.value) || 0);

    const mode = paymentModeInput.value;
    let multiplier = 1;
    if (mode === 'quarterly') multiplier = 0.9;
    if (mode === 'yearly') multiplier = 0.75;

    const currentTotal = childrenCount * currentCost;
    const schoolTotal = childrenCount * planPrice * multiplier;
    const savings = Math.max(0, currentTotal - schoolTotal);

    savingValue.textContent = `${savings.toFixed(0)} EGP`;
    currentTotalEl.textContent = `${currentTotal.toFixed(0)} EGP`;
    schoolTotalEl.textContent = `${schoolTotal.toFixed(0)} EGP`;
}

function initFamilySavingsCalculator() {
    const controls = [
        document.getElementById('calcChildrenCount'),
        document.getElementById('calcCurrentCost'),
        document.getElementById('calcPlanPrice'),
        document.getElementById('calcPaymentMode')
    ].filter(Boolean);

    if (!controls.length) return;

    if (!familyCalcInitialized) {
        controls.forEach(control => control.addEventListener('input', calculateFamilySavings));
        familyCalcInitialized = true;
    }

    calculateFamilySavings();
}

renderFamilyOffers();
initFamilySavingsCalculator();

console.log('🚌 Parent Dashboard initialized successfully!');

