(() => {
    const storageKey = 'lang_driver';
    const defaultLang = 'en';

    const phraseMap = {
        'Driver Dashboard - School Bus Tracking': 'لوحة السائق - تتبع الحافلات المدرسية',
        'Driver Portal': 'بوابة السائق',
        'Today Trip': 'رحلة اليوم',
        'Start / End Trip': 'بدء / إنهاء الرحلة',
        'Trip History': 'سجل الرحلات',
        'Driver Requests': 'طلبات السائقين',
        'Bus Status': 'حالة الحافلة',
        'Ready to Start': 'جاهز للانطلاق',
        'Students Today': 'طلاب اليوم',
        'Current Speed (km/h)': 'السرعة الحالية (كم/س)',
        'Present Students': 'الطلاب الحاضرون',
        'Route Progress': 'تقدم المسار',
        'Quick Actions': 'إجراءات سريعة',
        'Start Trip': 'بدء الرحلة',
        'Pause Trip': 'إيقاف مؤقت',
        'End Trip': 'إنهاء الرحلة',
        'Send Alert': 'إرسال تنبيه',
        'Send Emergency Alert': 'إرسال تنبيه طوارئ',
        "Today's Schedule": 'جدول اليوم',
        "Today's Trip Schedule": 'جدول رحلات اليوم',
        'Bus Info': 'معلومات الحافلة',
        'Bus Number': 'رقم الحافلة',
        'Assigned Route': 'المسار المخصص',
        'Pickup / Drop-off': 'الاستلام / التوصيل',
        'Students List': 'قائمة الطلاب',
        'Route Map': 'خريطة المسار',
        'Stop List': 'قائمة المحطات',
        'Alert Type': 'نوع التنبيه',
        'Select type': 'اختر النوع',
        'Short Note': 'ملاحظة قصيرة',
        'Emergency': 'طوارئ',
        'Immediate': 'فوري',
        'General': 'عام',
        'Medical': 'طبي',
        'Breakdown': 'عطل',
        'Accident': 'حادث',
        'Delay': 'تأخير',
        'Active': 'نشط',
        'Completed': 'مكتمل',
        'Upcoming': 'قادم',
        'Present:': 'الحضور:',
        'Absent:': 'الغياب:',
        'Dashboard': 'لوحة التحكم',
        'Notifications': 'الإشعارات',
        'Students': 'الطلاب',
        'Route': 'المسار',
        'Logout': 'تسجيل الخروج',
        'Dark': 'داكن'
    };

    const wordMap = {
        'Dashboard': 'لوحة التحكم',
        'Today': 'اليوم',
        'Trip': 'رحلة',
        'Trips': 'رحلات',
        'Students': 'الطلاب',
        'Student': 'طالب',
        'Route': 'المسار',
        'Start': 'بدء',
        'End': 'إنهاء',
        'Notifications': 'الإشعارات',
        'History': 'السجل',
        'Requests': 'طلبات',
        'Logout': 'تسجيل الخروج',
        'Bus': 'الحافلة',
        'Status': 'الحالة',
        'Ready': 'جاهز',
        'Speed': 'السرعة',
        'Current': 'الحالية',
        'Present': 'الحاضرون',
        'Progress': 'التقدم',
        'Complete': 'مكتمل',
        'Stops': 'محطات',
        'Quick': 'سريعة',
        'Actions': 'إجراءات',
        'Pause': 'إيقاف مؤقت',
        'Send': 'إرسال',
        'Alert': 'تنبيه',
        'Emergency': 'طوارئ',
        'Immediate': 'فوري',
        'Type': 'نوع',
        'Select': 'اختر',
        'General': 'عام',
        'Medical': 'طبي',
        'Breakdown': 'عطل',
        'Accident': 'حادث',
        'Delay': 'تأخير',
        'Short': 'قصيرة',
        'Note': 'ملاحظة',
        'Schedule': 'الجدول',
        'Morning': 'صباحي',
        'Afternoon': 'مسائي',
        'Active': 'نشط',
        'Completed': 'مكتمل',
        'Upcoming': 'قادم',
        'Bus': 'الحافلة',
        'Info': 'معلومات',
        'Number': 'رقم',
        'Capacity': 'السعة',
        'Assigned': 'مخصص',
        'Pickup': 'استلام',
        'Drop-off': 'توصيل',
        'List': 'قائمة',
        'Map': 'خريطة',
        'Stop': 'محطة',
        'Dark': 'داكن'
    };

    const attrNames = ['placeholder', 'title', 'aria-label'];
    const originalTextMap = new WeakMap();
    const originalAttrMap = new WeakMap();
    let currentLang = defaultLang;
    let observer = null;

    const patternRules = [
        { regex: /(\d+)%\s*Complete/i, replace: 'مكتمل $1%' },
        { regex: /(\d+)\/(\d+)\s*Stops/i, replace: '$1/$2 محطات' },
        { regex: /(\d+(?:\.\d+)?)\s*km\b/i, replace: '$1 كم' },
        { regex: /(\d+(?:\.\d+)?)\s*mins?/i, replace: '$1 دقيقة' },
        { regex: /Starts in\s*(\d+)h\s*(\d+)m/i, replace: 'يبدأ خلال $1س $2د' },
        { regex: /Completed at\s*([0-9:]+\s*(?:AM|PM))/i, replace: 'اكتمل عند $1' }
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
