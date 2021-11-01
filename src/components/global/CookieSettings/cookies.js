const UnclassifiedDeclarations = [

]
const PreferencesDeclarations = [

]
const MarketingDeclarations = [

]

const NecessaryDeclarations = [
    {
        "Name": "cookieConsent",
        "Domain": ".omstilmig.nu",
        "Expiration": { "key": "monthWithCount", "count": 1, "fallback": "1 month" },
        "Description": "This cookie name is associated with Google Universal Analytics - which is a significant update to Google's more commonly used analytics service. This cookie is used to distinguish unique users by assigning a randomly generated number as a client identifier. It is included in each page request in a site and used to calculate visitor, session and campaign data for the sites analytics reports. By default it is set to expire after 2 years, although this is customisable by website owners."
    }
]
const StatisticsDeclarations = [
    {
        "Name": "_ga",
        "Domain": ".omstilmig.nu",
        "Expiration": { "key": "yearWithCount", "count": 2, "fallback": "2 years" },
        "Description": "This cookie name is associated with Google Universal Analytics - which is a significant update to Google's more commonly used analytics service. This cookie is used to distinguish unique users by assigning a randomly generated number as a client identifier. It is included in each page request in a site and used to calculate visitor, session and campaign data for the sites analytics reports. By default it is set to expire after 2 years, although this is customisable by website owners."
    },
    // {
    //     "Name": "_ga_EWGX64GD4S",
    //     "Domain": ".omstilmig.nu",
    //     "Expiration": { "key": "yearWithCount", "count": 2, "fallback": "2 years" },
    //     "Description": "This cookie name is associated with Google Universal Analytics - which is a significant update to Google's more commonly used analytics service. This cookie is used to distinguish unique users by assigning a randomly generated number as a client identifier. It is included in each page request in a site and used to calculate visitor, session and campaign data for the sites analytics reports. By default it is set to expire after 2 years, although this is customisable by website owners."
    // },
    {
        "Name": "_ga_XMMKETRZDE",
        "Domain": ".omstilmig.nu",
        "Expiration": { "key": "yearWithCount", "count": 2, "fallback": "2 years" },
        "Description": "This cookie name is associated with Google Universal Analytics - which is a significant update to Google's more commonly used analytics service. This cookie is used to distinguish unique users by assigning a randomly generated number as a client identifier. It is included in each page request in a site and used to calculate visitor, session and campaign data for the sites analytics reports. By default it is set to expire after 2 years, although this is customisable by website owners."
    },
    // {
    //     "Name": "_gat",
    //     "Domain": ".omstilmig.nu",
    //     "Expiration": { "key": "minuteWithCount", "count": 1, "fallback": "1 minute" },
    //     "Description": "This cookie name is associated with Google Universal Analytics - which is a significant update to Google's more commonly used analytics service. This cookie is used to distinguish unique users by assigning a randomly generated number as a client identifier. It is included in each page request in a site and used to calculate visitor, session and campaign data for the sites analytics reports. By default it is set to expire after 2 years, although this is customisable by website owners."
    // },
    // {
    //     "Name": "_gid",
    //     "Domain": ".omstilmig.nu",
    //     "Expiration": { "key": "dayWithCount", "count": 1, "fallback": "1 day" },
    //     "Description": "This cookie name is associated with Google Universal Analytics - which is a significant update to Google's more commonly used analytics service. This cookie is used to distinguish unique users by assigning a randomly generated number as a client identifier. It is included in each page request in a site and used to calculate visitor, session and campaign data for the sites analytics reports. By default it is set to expire after 2 years, although this is customisable by website owners."
    // }
]

const cookies = {
    about: "Cookies are small text files that are placed on your computer by websites that you visit. Websites use cookies to help users navigate efficiently and perform certain functions. Cookies that are required for the website to operate properly are allowed to be set without your permission. All other cookies need to be approved before they can be set in the browser. You can change your consent to cookie usage at any time on our Cookie Settings page",
    privacyPolicy: "https://www.termsfeed.com/live/bf49c4f9-7b35-406d-a87e-ec27b65221e6",
    cookies: [
        {
            "category": "Strictly Necessary",
            "optional": false,
            "defaultvalue": true,
            "declarations": [
                ...NecessaryDeclarations,
            ]
        },
        {
            "category": "Statistics",
            "optional": true,
            "defaultvalue": false,
            "declarations": [
                ...StatisticsDeclarations
            ]
        },
        {
            "category": "Marketing",
            "optional": true,
            "defaultvalue": false,
            "declarations": [
                ...MarketingDeclarations
            ]
        },
        {
            "category": "Preferences",
            "optional": true,
            "defaultvalue": false,
            "declarations": [
                ...PreferencesDeclarations
            ]
        },
        {
            "category": "Unclassified",
            "optional": true,
            "defaultvalue": false,
            "declarations": [
                ...UnclassifiedDeclarations
            ]
        }
    ]
}
export default cookies;

export const allDeclarations = [
    ...UnclassifiedDeclarations,
    ...PreferencesDeclarations,
    ...MarketingDeclarations,
    ...NecessaryDeclarations,
    ...StatisticsDeclarations
]
