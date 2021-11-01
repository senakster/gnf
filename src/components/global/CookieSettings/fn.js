import { google } from '_libs/_config/config.json'

export const fn = {
    googleAnalyticsConsent,
    googleAdConsent,
    gtagEvent,
    gtagPageView
}

function googleAnalyticsConsent (consent) {
    !window.gtag && console.error('gtag: ', window.gtag)
    window.gtag && window.gtag('consent', 'update', {
        'analytics_storage': consent ? 'granted' : 'denied'
    });
}
function googleAdConsent(consent) {
    !window.gtag && console.error('gtag: ', window.gtag)

    window.gtag && window.gtag('consent', 'update', {
        'ad_storage': consent ? 'granted' : 'denied'
    });
}

function gtagEvent(category, action, label= '', value=null) {
    // const { dataset, value} = e.target
    console.log();
    window.gtag && window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value
    })
}
function gtagPageView(pathname) {
    !window.gtag && console.error('gtag: ',window.gtag)

    window.gtag && window.gtag("config", `${google.gtag}`, {
        page_title: pathname,
        page_path: pathname,
    })
}

export default fn;