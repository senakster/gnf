import { history } from "./history";
// import {v4} from "uuid"
// import parse from 'html-react-parser'

/**
 * HTML REACT PARSER
 */
// export {parse}

const helpers = {
    navHome,
    navRoute,
    capitalize,
    // getUUID,
    swapPositions,
    canConnect,
    embedYT,
    isValidHttpUrl,
    // parse,
    throttle,
    truncate,
    sortObjectArray
}

export default helpers;
/**
 * USERFUNCTIONALITY
 */

/**
 * Navigates history to root for react-router
 * @returns {void}
 */
export function navHome(): void {
    history.push('/')
}

/**
 * Navigates through history for react-router
 * @param event
 * @returns {void} 
 */
export function nav(event: any): void {
    const destination = event.target?.value;
    console.log(destination)
    destination && history.push(destination)
}

export function navRoute(destination: string): void {
    history.push(destination)
}

export function throttle(fn: Function, wait: number = 300) {
    let inThrottle: boolean,
        lastFn: ReturnType<typeof setTimeout>,
        lastTime: number;
    return function (this: any) {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};

export function truncate(str: string, n: number, useWordBoundary?: boolean) {
    if (str.length <= n) { return str; }
    const subString = str.substr(0, n - 1); // the original check
    return (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(" "))
        : subString) + "&hellip;";
    // : subString) + "...";
};
/**
 * TEXT MANIPULATION
 */

/**
 * Capitalizes a string
 * @param text
 * @returns {string} capitalized string
 */
export function capitalize(text: string): string {
    return text && text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}

/**
 * Compares two strings insensitively
 * @param text
 * @returns {string} capitalized string
 */
export function compare(test: string, sub: string): boolean {
    // console.log('compare')
    return sub.localeCompare(test, undefined, { sensitivity: 'accent' }) === 0
}


/**
 * Calculates the max value of id key +1 (next id) from array of objects with id key
 * @param {array} AOO (array of objects)
 * @returns {number} id
 */
export function nextId(AOO: { id: number | string; }[]): number {
    const ids: number[] = AOO.map((o) => typeof o.id === 'string' ? parseInt(o.id) : o.id);
    const nid: number = Math.max(...ids, -1) + 1;
    return nid;
}

// /**
//  * returns universally unique identifier (UUID v4)
//  * https://www.sohamkamani.com/uuid-versions-explained/
//  * @returns {string} UUID
//  */
// export function getUUID(): string {
//     return v4();
// }


/**
 * DATA MANIPULATION
 */



/**
 * For use in Array.sort(sortObjectArray)
 * @param a string
 * @param b string
 * @param prop string
 * @returns {number}
 */
export function sortObjectArray(a: string, b: string) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

/**
 * 
 * Swaps two positions in an array
 * @param {array} array
 * @param {number} from 
 * @param {number} to
 * @returns {array}
 */
export function swapPositions(array: any[], from: number, to: number): any[] {
    // Make sure a valid array is provided
    const arr = [...array]
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        throw new Error('Please provide a valid array');
    }

    // Delete the item from it's current position
    var item = arr.splice(from, 1);

    // Make sure there's an item to move
    if (!item.length) {
        throw new Error('There is no item in the array at index ' + from);
    }

    // Move the item to its new position
    arr.splice(to, 0, item[0]);
    return arr;
}

/**
 * NETWORKING & VALIDATION
 */

/**
 * Ping remote server to test availability
 * @param {string} url
 * @returns {boolean}
 */
export async function canConnect(url: string): Promise<boolean> {
    const result = await fetch(url, { method: 'HEAD' });
    return result.ok;
}

/**
 * Fetches oembed from youtube
 * @param {string} url 
 * @returns {object} json
 */
export async function embedYT(url: string): Promise<any> {
    const ncUrl = url.replace(`//www.youtube.com/`, `//www.youtube-nocookie.com/`)
    const result = await fetch(`https://www.youtube-nocookie.com/oembed?url=${ncUrl}&format=json`);
    return result.json()
}
/**
 * is valid url
 * @param {string} string
 * @returns {boolean}
 */
export function isValidHttpUrl(string: string): boolean {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

/** 
 * is valid youtube html / string contains anything / not working
 * @param {string} url
 * @returns {boolean}
 */
export function isValidYTHTML(url: string): any {
    // const ytreg = '/<iframe\.*(?:\b|_).*?(?:\b|_)src=\"https:\/\/www.youtube.com\/(?:\b|_).*?(?:\b|_)iframe>$/'
    // const ytreg = new RegExp('/^<iframe.+?src="https?://www.youtube.com/embed/([a-zA-Z0-9_-]{11})"[^>]+?></iframe>$/')
    const ytreg = new RegExp('/*/')

    return ytreg.test(url)
}