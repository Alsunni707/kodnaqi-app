
// --- كود اعتراض طلبات التحاليل للعمل أوفلاين 100% ---
(function() {
    const originalFetch = window.fetch;
    window.fetch = async function(url, options) {
        if (typeof url === 'string' && (url.includes('comprehensive_tests.json') || url.includes('tests.json'))) {
            console.ج("intercepted fetch for tests, serving from IndexedDB...");
            try {
                // محاولة جلب الفحوصات من قاعدة البيانات المحلية
                let tests = await dbGetAll('tests');
                if (tests && tests.length > 0) {
                    return new Response(JSON.stringify(tests), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
            } catch (err) {
                console.error('Error serving tests from IndexedDB in fetch intercept:', err);
            }
        }
        return originalFetch.apply(this, arguments);
    };
})();
