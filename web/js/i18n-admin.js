(() => {
    const storageKey = 'lang_admin';
    const defaultLang = 'en';

    const phraseMap = {
        'Dashboard Overview': 'نظرة عامة على لوحة التحكم',
        'Trips / Routes': 'الرحلات / المسارات',
        'Live Tracking': 'التتبع المباشر',
        'Bus Fleet Status': 'حالة أسطول الحافلات',
        'Recent Activity': 'النشاط الأخير',
        'View All': 'عرض الكل',
        'Activity Timeline': 'الجدول الزمني للنشاط',
        "Today's Trips": 'رحلات اليوم',
        'Active Trips': 'الرحلات النشطة',
        'Pending Requests': 'الطلبات المعلقة',
        'Complaints Today': 'شكاوى اليوم',
        'Trips Overview': 'نظرة عامة على الرحلات',
        'Last 7 Days': 'آخر 7 أيام',
        'Last 30 Days': 'آخر 30 يومًا',
        'Last 90 Days': 'آخر 90 يومًا',
        'New parent registered': 'تسجيل ولي أمر جديد',
        'Trip completed': 'اكتمال رحلة',
        'Maintenance alert': 'تنبيه صيانة',
        'Driver approved': 'تمت الموافقة على السائق',
        'On Route': 'على الخط',
        'No change': 'لا تغيير',
        'Fleet steady': 'الأسطول مستقر',
        'Running now': 'يعمل الآن',
        'Waiting review': 'بانتظار المراجعة',
        '100% on schedule': '100% حسب الجدول',
        'Total Parents': 'إجمالي أولياء الأمور',
        'Total Drivers': 'إجمالي السائقين',
        'Active Buses': 'الحافلات النشطة',
        'Total Students': 'إجمالي الطلاب',
        'Total Buses': 'إجمالي الحافلات',
        'Parents Management': 'إدارة أولياء الأمور',
        'Add Parent': 'إضافة ولي أمر',
        'Drivers Management': 'إدارة السائقين',
        'Add Driver': 'إضافة سائق',
        'Bus Fleet Management': 'إدارة أسطول الحافلات',
        'Add Bus': 'إضافة حافلة',
        'Emergency Logs': 'سجلات الطوارئ',
        'Emergency Alerts': 'تنبيهات الطوارئ',
        'Users & Roles': 'المستخدمون والأدوار',
        'System Settings': 'إعدادات النظام',
        'General Settings': 'الإعدادات العامة',
        'Notification Settings': 'إعدادات الإشعارات',
        'Email Notifications': 'إشعارات البريد الإلكتروني',
        'Send notifications via email': 'إرسال الإشعارات عبر البريد الإلكتروني',
        'Default Language': 'اللغة الافتراضية',
        'System Name': 'اسم النظام',
        'System Description': 'وصف النظام',
        'Date Format': 'تنسيق التاريخ',
        'Last saved: Today at 10:30 AM': 'آخر حفظ: اليوم الساعة 10:30 صباحًا',
        'Quick Access': 'وصول سريع',
        'Favorite Pages': 'الصفحات المفضلة',
        'Notifications': 'الإشعارات',
        'Tasks': 'المهام',
        'Reports': 'التقارير',
        '3 new this month': '3 جديدة هذا الشهر',
        '12% from last month': '12% مقارنة بالشهر الماضي',
        '8 new enrollments': '8 تسجيلات جديدة',
        'Pending Requests': 'الطلبات المعلقة',
        'All': 'الكل',
        'Active': 'نشط',
        'Inactive': 'غير نشط',
        'Nonactive': 'غير نشط',
        'Pending': 'قيد الانتظار',
        'Approved': 'تمت الموافقة',
        'Rejected': 'مرفوض',
        'Open': 'مفتوح',
        'Closed': 'مغلق',
        'Resolved': 'تم الحل',
        'In Progress': 'قيد التنفيذ',
        'In-progress': 'قيد التنفيذ',
        'Sent': 'تم الإرسال',
        'Failed': 'فشل',
        'All Types': 'كل الأنواع',
        'All Status': 'كل الحالات',
        'All Buses': 'كل الحافلات',
        'All Drivers': 'كل السائقين',
        'All Districts': 'كل الأحياء',
        'All Modules': 'كل الوحدات',
        'All Roles': 'كل الأدوار',
        'All Periods': 'كل الفترات',
        'All Actions': 'كل الإجراءات',
        'Dashboard': 'لوحة التحكم',
        'Parents': 'أولياء الأمور',
        'Drivers': 'السائقون',
        'Buses': 'الحافلات',
        'Requests': 'الطلبات',
        'Financials': 'المالية',
        'Maintenance': 'الصيانة',
        'Students': 'الطلاب',
        'Notifications': 'الإشعارات',
        'Complaints': 'الشكاوى',
        'Schools': 'المدارس',
        'Settings': 'الإعدادات',
        'Activity Logs': 'سجلات النشاط',
        'Logout': 'تسجيل الخروج',
        'Dark': 'داكن',
        'Search...': 'بحث...',
        'Status': 'الحالة',
        'Date': 'التاريخ',
        'Type': 'النوع',
        'Role': 'الدور',
        'Priority': 'الأولوية',
        'Subject': 'الموضوع',
        'Description': 'الوصف',
        'Actions': 'الإجراءات',
        'Add': 'إضافة',
        'Edit': 'تعديل',
        'Delete': 'حذف',
        'View Details': 'عرض التفاصيل',
        'Name': 'الاسم',
        'Phone': 'الهاتف',
        'Email': 'البريد الإلكتروني',
        'Application Date': 'تاريخ التقديم',
        'Join Date': 'تاريخ الانضمام',
        'Assigned Bus': 'الحافلة المخصصة',
        'Experience': 'الخبرة',
        'Bus Number': 'رقم الحافلة',
        'Plate Number': 'رقم اللوحة',
        'Route': 'المسار',
        'Capacity': 'السعة',
        'Emergency Type': 'نوع الطوارئ',
        'Location': 'الموقع',
        'Time': 'الوقت',
        'Notes': 'الملاحظات',
        'Recipients': 'المستلمون',
        'Sent Date': 'تاريخ الإرسال',
        'Reply': 'رد',
        'Emergency': 'طوارئ',
        'Breakdown': 'عطل',
        'Accident': 'حادث',
        'Delay': 'تأخير',
        'Medical': 'طبي',
        'General': 'عام',
        'Export Excel': 'تصدير إكسل',
        'Export PDF': 'تصدير PDF',
        'Export': 'تصدير',
        'Prev': 'السابق',
        'Next': 'التالي',
        'Page': 'صفحة',
        'of': 'من',
        'per page': 'لكل صفحة'
    };

    const wordMap = {
        'Admin': 'المشرف',
        'Dashboard': 'لوحة التحكم',
        'Overview': 'نظرة عامة',
        'Parent': 'ولي أمر',
        'Parents': 'أولياء الأمور',
        'Driver': 'سائق',
        'Drivers': 'السائقون',
        'Bus': 'حافلة',
        'Buses': 'الحافلات',
        'Report': 'تقرير',
        'Reports': 'التقارير',
        'Request': 'طلب',
        'Requests': 'الطلبات',
        'Financials': 'المالية',
        'Maintenance': 'الصيانة',
        'Live': 'مباشر',
        'Tracking': 'التتبع',
        'QR': 'QR',
        'Generate': 'توليد',
        'Download': 'تنزيل',
        'Copy': 'نسخ',
        'Payload': 'حمولة',
        'Optional': 'اختياري',
        'Note': 'ملاحظة',
        'Zone': 'منطقة',
        'Region': 'إقليم',
        'Zone/Region': 'منطقة/إقليم',
        'Builder': 'منشئ',
        'Select': 'اختيار',
        'Student': 'طالب',
        'Students': 'الطلاب',
        'Trip': 'رحلة',
        'Trips': 'الرحلات',
        'Route': 'مسار',
        'Routes': 'المسارات',
        'Notification': 'إشعار',
        'Notifications': 'الإشعارات',
        'Emergency': 'طوارئ',
        'Logs': 'السجلات',
        'Complaint': 'شكوى',
        'Complaints': 'الشكاوى',
        'School': 'مدرسة',
        'Schools': 'المدارس',
        'Users': 'المستخدمون',
        'Roles': 'الأدوار',
        'Settings': 'الإعدادات',
        'Activity': 'النشاط',
        'Logout': 'تسجيل الخروج',
        'Dark': 'داكن',
        'Search': 'بحث',
        'Total': 'إجمالي',
        'Active': 'نشط',
        'Inactive': 'غير نشط',
        'Pending': 'قيد الانتظار',
        'Completed': 'مكتمل',
        'Upcoming': 'قادم',
        'New': 'جديد',
        'Add': 'إضافة',
        'Edit': 'تعديل',
        'Delete': 'حذف',
        'View': 'عرض',
        'Details': 'التفاصيل',
        'Actions': 'الإجراءات',
        'Status': 'الحالة',
        'Type': 'النوع',
        'Date': 'التاريخ',
        'Time': 'الوقت',
        'Phone': 'الهاتف',
        'Email': 'البريد الإلكتروني',
        'Name': 'الاسم',
        'Application': 'التقديم',
        'Join': 'الانضمام',
        'Assigned': 'مخصص',
        'Capacity': 'السعة',
        'Experience': 'الخبرة',
        'Bus': 'حافلة',
        'Number': 'رقم',
        'Plate': 'لوحة',
        'Location': 'الموقع',
        'Priority': 'الأولوية',
        'Subject': 'الموضوع',
        'Description': 'الوصف',
        'Recipients': 'المستلمون',
        'Sent': 'مرسل',
        'Reply': 'رد',
        'General': 'عام',
        'Medical': 'طبي',
        'Breakdown': 'عطل',
        'Accident': 'حادث',
        'Delay': 'تأخير',
        'Export': 'تصدير',
        'Excel': 'إكسل',
        'PDF': 'PDF',
        'Prev': 'السابق',
        'Next': 'التالي',
        'Page': 'صفحة',
        'of': 'من',
        'per': 'لكل',
        'All': 'الكل',
        'Last': 'آخر',
        'Today': 'اليوم'
    };

    const attrNames = ['placeholder', 'title', 'aria-label'];
    const originalTextMap = new WeakMap();
    const originalAttrMap = new WeakMap();
    let currentLang = defaultLang;
    let observer = null;

    const patternRules = [
        { regex: /(\d+)\s+minutes?\s+ago/i, replace: 'منذ $1 دقيقة' },
        { regex: /(\d+)\s+hours?\s+ago/i, replace: 'منذ $1 ساعة' },
        { regex: /Today at\s+([0-9:]+\s*(?:AM|PM))/i, replace: 'اليوم الساعة $1' },
        { regex: /(\d+(?:\.\d+)?)\s*km\s*away/i, replace: 'يبعد $1 كم' },
        { regex: /(\d+(?:\.\d+)?)\s*km\/h/i, replace: '$1 كم/س' },
        { regex: /(\d+)%\s*Complete/i, replace: 'مكتمل $1%' }
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
            const translated = translateString(original, 'ar');
            node.nodeValue = translated;
        } else {
            node.nodeValue = originalTextMap.get(node) || node.nodeValue;
        }
    }

    function applyAttributes(el) {
        if (!el || !el.getAttribute) return;
        if (!originalAttrMap.has(el)) {
            originalAttrMap.set(el, {});
        }
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

        if (el.tagName === 'INPUT') {
            const type = (el.getAttribute('type') || '').toLowerCase();
            if (type === 'button' || type === 'submit' || type === 'reset') {
                const value = el.getAttribute('value');
                if (value) {
                    if (!('value' in originalAttrs)) originalAttrs.value = value;
                    el.setAttribute('value', currentLang === 'ar' ? translateString(originalAttrs.value, 'ar') : originalAttrs.value);
                }
            }
        }
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
            root.querySelectorAll('[placeholder],[title],[aria-label],input[type=\"button\"],input[type=\"submit\"],input[type=\"reset\"]').forEach(applyAttributes);
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
        // This avoids heavy CPU usage on dashboards that update time/counters continuously.
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
