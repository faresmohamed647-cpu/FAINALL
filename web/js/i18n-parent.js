(() => {
    const storageKey = 'lang_parent';
    const defaultLang = 'en';

    const phraseMap = {
        'Parent Dashboard - School Bus Tracking': 'لوحة ولي الأمر - تتبع الحافلات المدرسية',
        'Skip to content': 'تخطي إلى المحتوى',
        'Live Tracking': 'التتبع المباشر',
        'Trip History': 'سجل الرحلات',
        'Emergency Alerts': 'تنبيهات الطوارئ',
        'Profile & Settings': 'الملف الشخصي والإعدادات',
        'Parent Requests': 'طلبات أولياء الأمور',
        'Bus Status': 'حالة الحافلة',
        'On the Way': 'في الطريق',
        'Estimated Arrival Time': 'وقت الوصول المتوقع',
        'Driver Information': 'معلومات السائق',
        'Call Driver': 'اتصال بالسائق',
        'Total Children': 'إجمالي الأطفال',
        'Today Attendance': 'حضور اليوم',
        'Bus Speed (km/h)': 'سرعة الحافلة (كم/س)',
        'Total Distance': 'إجمالي المسافة',
        'Recent Activity': 'النشاط الأخير',
        'picked up': 'تم الصعود',
        'Bus departed from terminal': 'انطلقت الحافلة من المحطة',
        'Bus is on the way': 'الحافلة في الطريق',
        'Map Loading...': 'جاري تحميل الخريطة...',
        'Last seen: --': 'آخر ظهور: --',
        'Follow': 'متابعة',
        'Locate Child': 'تحديد موقع الطفل',
        'Center Bus': 'توسيط الحافلة',
        'Share': 'مشاركة',
        'Contact Driver': 'تواصل مع السائق',
        'Share Location': 'مشاركة الموقع',
        'Test Notification': 'تنبيه تجريبي',
        'Attendance Records': 'سجلات الحضور',
        'Overall Attendance': 'إجمالي الحضور',
        'Days Present': 'أيام الحضور',
        'Days Absent': 'أيام الغياب',
        'Missed Pickups': 'مواعيد صعود فائتة',
        'Missed Drop-offs': 'مواعيد نزول فائتة',
        'Payment History': 'سجل المدفوعات',
        'Make Payment': 'إجراء الدفع',
        'Total Paid': 'إجمالي المدفوعات',
        'Pending Payment': 'دفعة معلقة',
        'Export Excel': 'تصدير إكسل',
        'Export PDF': 'تصدير PDF',
        'Export': 'تصدير',
        'Prev': 'السابق',
        'Next': 'التالي',
        'Children': 'الأطفال',
        'Attendance': 'الحضور',
        'Notifications': 'الإشعارات',
        'Payments': 'المدفوعات',
        'Support': 'الدعم',
        'Dashboard': 'لوحة التحكم',
        'Logout': 'تسجيل الخروج',
        'Dark': 'داكن'
    };

    const wordMap = {
        'Dashboard': 'لوحة التحكم',
        'Live': 'مباشر',
        'Tracking': 'التتبع',
        'Children': 'الأطفال',
        'Attendance': 'الحضور',
        'Notifications': 'الإشعارات',
        'Payments': 'المدفوعات',
        'Support': 'الدعم',
        'Trip': 'رحلة',
        'History': 'السجل',
        'Export': 'تصدير',
        'Excel': 'إكسل',
        'PDF': 'PDF',
        'Prev': 'السابق',
        'Next': 'التالي',
        'Emergency': 'طوارئ',
        'Alerts': 'تنبيهات',
        'Profile': 'الملف الشخصي',
        'Settings': 'الإعدادات',
        'Parent': 'ولي أمر',
        'Requests': 'طلبات',
        'Bus': 'الحافلة',
        'Status': 'الحالة',
        'On': 'على',
        'Way': 'الطريق',
        'Estimated': 'المقدر',
        'Arrival': 'الوصول',
        'Time': 'الوقت',
        'Driver': 'السائق',
        'Information': 'المعلومات',
        'Call': 'اتصال',
        'Total': 'إجمالي',
        'Today': 'اليوم',
        'Speed': 'السرعة',
        'Distance': 'المسافة',
        'Recent': 'الأخير',
        'Activity': 'النشاط',
        'Last': 'آخر',
        'seen': 'ظهور',
        'Follow': 'متابعة',
        'Locate': 'تحديد موقع',
        'Child': 'الطفل',
        'Center': 'توسيط',
        'Share': 'مشاركة',
        'Contact': 'تواصل',
        'Location': 'الموقع',
        'Test': 'تجريبي',
        'Notification': 'تنبيه',
        'Records': 'السجلات',
        'Overall': 'إجمالي',
        'Days': 'أيام',
        'Present': 'الحضور',
        'Absent': 'الغياب',
        'Missed': 'فائتة',
        'Pickups': 'الصعود',
        'Drop-offs': 'النزول',
        'Payment': 'دفع',
        'Paid': 'مدفوع',
        'Pending': 'معلق',
        'Dark': 'داكن',
        'Logout': 'تسجيل الخروج'
    };

    const attrNames = ['placeholder', 'title', 'aria-label'];
    const originalTextMap = new WeakMap();
    const originalAttrMap = new WeakMap();
    let currentLang = defaultLang;
    let observer = null;

    const patternRules = [
        { regex: /Today at\s+([0-9:]+\s*(?:AM|PM))/i, replace: 'اليوم الساعة $1' },
        { regex: /ETA:\s*([0-9:]+\s*(?:AM|PM|mins|minutes)?)/i, replace: 'وقت الوصول المتوقع: $1' },
        { regex: /(\d+(?:\.\d+)?)\s*km\s*away/i, replace: 'يبعد $1 كم' },
        { regex: /(\d+(?:\.\d+)?)\s*km\/h/i, replace: '$1 كم/س' },
        { regex: /(\d+(?:\.\d+)?)\s*km\b/i, replace: '$1 كم' },
        { regex: /(\d+)\s*mins?/i, replace: '$1 دقيقة' }
    ];

    function applyPatterns(text) {
        let out = text;
        patternRules.forEach(rule => {
            out = out.replace(rule.regex, rule.replace);
        });
        return out;
    }

    function translateWords(text) {
        return text.replace(/\b[A-Za-z][A-Za-z\-\/]*\b/g, (match) => {
            const key = match.trim();
            const lower = key.toLowerCase();
            const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);
            const mapped = wordMap[key] || wordMap[lower] || wordMap[capitalized] || wordMap[key.toUpperCase()];
            return mapped || match;
        });
    }

    function translateString(text, lang) {
        if (lang !== 'ar') return text;
        const trimmed = text.trim();
        if (!trimmed) return text;
        if (phraseMap[trimmed]) {
            return text.replace(trimmed, phraseMap[trimmed]);
        }
        const withPatterns = applyPatterns(text);
        const afterPhrase = phraseMap[withPatterns.trim()] || withPatterns;
        return translateWords(afterPhrase);
    }

    function applyTextNode(node) {
        if (!node || !node.nodeValue) return;
        const parent = node.parentElement;
        if (!parent) return;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return;

        if (!originalTextMap.has(node)) {
            originalTextMap.set(node, node.nodeValue);
        }

        if (currentLang === 'ar') {
            const original = originalTextMap.get(node) || node.nodeValue;
            node.nodeValue = translateString(original, 'ar');
        } else {
            node.nodeValue = originalTextMap.get(node) || node.nodeValue;
        }
    }

    function applyAttributes(el) {
        if (!el || !el.getAttribute) return;
        if (!originalAttrMap.has(el)) originalAttrMap.set(el, {});
        const originalAttrs = originalAttrMap.get(el);

        attrNames.forEach(attr => {
            const value = el.getAttribute(attr);
            if (!value) return;
            if (!(attr in originalAttrs)) originalAttrs[attr] = value;
            if (currentLang === 'ar') {
                el.setAttribute(attr, translateString(originalAttrs[attr], 'ar'));
            } else {
                el.setAttribute(attr, originalAttrs[attr]);
            }
        });
    }

    const NodeFilterRef = window.NodeFilter || { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2 };

    function applyTree(root) {
        if (!root) return;
        if (root.nodeType === 3) {
            applyTextNode(root);
            return;
        }
        if (root.nodeType === 1) {
            applyAttributes(root);
        }

        const walker = document.createTreeWalker(root, NodeFilterRef.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilterRef.FILTER_REJECT;
                return NodeFilterRef.FILTER_ACCEPT;
            }
        });

        let node = walker.nextNode();
        while (node) {
            applyTextNode(node);
            node = walker.nextNode();
        }

        if (root.querySelectorAll) {
            root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(applyAttributes);
        }
    }

    function updateToggleLabel() {
        const toggle = document.getElementById('langToggle');
        if (!toggle) return;
        const label = currentLang === 'ar' ? 'EN' : 'AR';
        toggle.querySelector('span').textContent = label;
        toggle.setAttribute('aria-label', currentLang === 'ar' ? 'Switch language to English' : 'Switch language to Arabic');
    }

    function applyLanguage(lang) {
        currentLang = lang;
        if (!document.documentElement.dataset.i18nTitle) {
            document.documentElement.dataset.i18nTitle = document.title;
        }
        document.title = currentLang === 'ar'
            ? translateString(document.documentElement.dataset.i18nTitle, 'ar')
            : document.documentElement.dataset.i18nTitle;
        if (!document.body) return;
        applyTree(document.body);
        updateToggleLabel();
    }

    function observeChanges() {
        if (observer) return;
        observer = new MutationObserver((mutations) => {
            if (currentLang !== 'ar') return;
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => applyTree(node));
                }
            });
        });
        // Only handle added nodes; don't re-translate on every text update.
        observer.observe(document.body, { childList: true, subtree: true });
    }

    const safeStorage = {
        get(key) {
            try { return localStorage.getItem(key); } catch { return null; }
        },
        set(key, value) {
            try { localStorage.setItem(key, value); } catch { /* ignore */ }
        }
    };

    function toggleLanguage() {
        const nextLang = currentLang === 'ar' ? 'en' : 'ar';
        safeStorage.set(storageKey, nextLang);
        applyLanguage(nextLang);
    }

    function bindToggle() {
        const toggle = document.getElementById('langToggle');
        if (toggle && !toggle.dataset.langBound) {
            toggle.addEventListener('click', toggleLanguage);
            toggle.dataset.langBound = 'true';
        }
    }

    function init() {
        const saved = safeStorage.get(storageKey);
        const initial = saved || defaultLang;
        applyLanguage(initial);
        observeChanges();

        bindToggle();
        setTimeout(bindToggle, 50);
        setTimeout(bindToggle, 200);
    }

    window.toggleLanguage = toggleLanguage;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
