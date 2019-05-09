export const convertTimestampToDate = (timestamp: Date) => {
    let monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    let date = new Date(timestamp);
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let month = monthNames[monthIndex];
    return `${month} ${day}`;
};

export const convertTimestampToTime = (timestamp: Date) => {
    let date = new Date(timestamp);
    let hours = date.getHours() || 0;
    let cleanHours;
    if (hours === 0) {
        cleanHours = 12; // if timestamp is between midnight and 1am, show 12:XX am
    } else {
        cleanHours = hours > 12 ? hours - 12 : hours; // else show proper am/pm -- todo: support 24hr time
    }
    let minutes = date.getMinutes() as  string | number
    minutes = minutes >= 10 ? minutes : '0' + minutes.toString(); // turns 4 minutes into 04 minutes
    let ampm = hours >= 12 ? 'pm' : 'am'; // todo: support 24hr time
    return `${cleanHours}:${minutes}${ampm}`;
};

export function isMobile() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (
        /windows phone/i.test(userAgent) ||
        /android/i.test(userAgent) ||
        (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
    ) {
        return true;
    }

    return false;
}

export function timeDifference(current: any, previous: any) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return 'Just now';
    } else if (elapsed < msPerHour) {
        const now = Math.round(elapsed / msPerMinute);
        if (now === 1) {
            return `1 minute ago`;
        } else {
            return `${now} minutes ago`;
        }
    } else if (elapsed < msPerDay) {
        const now = Math.round(elapsed / msPerHour);
        if (now === 1) {
            return `1 hour ago`;
        } else {
            return `${now} hours ago`;
        }
    } else if (elapsed < msPerMonth) {
        const now = Math.round(elapsed / msPerDay);
        if (now === 1) {
            return `Yesterday`;
        } else if (now >= 7 && now <= 13) {
            return '1 week ago';
        } else if (now >= 14 && now <= 20) {
            return '2 weeks ago';
        } else if (now >= 21 && now <= 28) {
            return '3 weeks ago';
        } else {
            return `${now} days ago`;
        }
    } else if (elapsed < msPerYear) {
        const now = Math.round(elapsed / msPerMonth);
        if (now === 1) {
            return `1 month ago`;
        } else {
            return `${now} months ago`;
        }
    } else {
        const now = Math.round(elapsed / msPerYear);
        if (now === 1) {
            return `1 year ago`;
        } else {
            return `${now} years ago`;
        }
    }
}

export function timeDifferenceShort(current: any, previous: any) {
    const msPerSecond = 1000;
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        const now = Math.round(elapsed / msPerSecond);
        return `${now}s`;
    } else if (elapsed < msPerHour) {
        const now = Math.round(elapsed / msPerMinute);
        return `${now}m`;
    } else if (elapsed < msPerDay) {
        const now = Math.round(elapsed / msPerHour);
        return `${now}h`;
    } else if (elapsed < msPerYear) {
        const now = Math.round(elapsed / msPerDay);
        return `${now}d`;
    } else {
        const now = Math.round(elapsed / msPerYear);
        return `${now}y`;
    }
}


export const throttle = (func, threshhold, scope) => {
    threshhold || (threshhold = 250);
    let last, deferTimer;
    return function () {
        let context = scope || this;

        let now = +new Date(),
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                func.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            func.apply(context, args);
        }
    };
};

// Truncate a string nicely to a certain length
export const truncate = (str, length) => {
    if (str.length <= length) {
        return str;
    }
    const subString = str.substr(0, length);
    return subString.substr(0, subString.lastIndexOf(' ')) + '…';
};

function quick_Sort(origArray) {
    // console.log('origArray',origArray)
    // return 'ok'
    if (origArray.length <= 1) {
        return origArray
    } else {

        var left = [];
        var right = [];
        var newArray = [];
        var pivot = origArray.pop();
        var length = origArray.length;

        for (var i = 0; i < length; i++) {
            if (origArray[i].count <= pivot.count) {
                // left.push(origArray[i]);
            } else {
                // right.push(origArray[i]);
            }
        }

        return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
    }
}
import escapeRegExp from 'lodash/escapeRegExp';
export function buildRegExpFromDelimiters(delimiters) {
    const delimiterChars = delimiters
      .map((delimiter) => {
        // See: http://stackoverflow.com/a/34711175/1463681
        const chrCode = delimiter - 48 * Math.floor(delimiter / 48);
        return String.fromCharCode(96 <= delimiter ? chrCode : delimiter);
      })
      .join('');
    const escapedDelimiterChars = escapeRegExp(delimiterChars);
    return new RegExp(`[${escapedDelimiterChars}]+`);
  }