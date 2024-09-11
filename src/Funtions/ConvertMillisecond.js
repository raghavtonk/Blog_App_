export default function convertMilliseconds(ms) {
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day; // Approximation: 1 month = 30 days
    const year = 12 * month; // 1 year = 12 months

    if (ms < hour) {
        const minutes = Math.floor(ms / minute);
        return `${minutes} min${minutes !== 1 ? 's' : ''}`;
    } else if (ms < day) {
        const hours = Math.floor(ms / hour);
        return `${hours} hr${hours !== 1 ? 's' : ''}`;
    } else if (ms < week) {
        const days = Math.floor(ms / day);
        return `${days} d${days !== 1 ? 'ays' : 'ay'}`;
    } else if (ms < month) {
        const weeks = Math.floor(ms / week);
        return `${weeks} w${weeks !== 1 ? 'eeks' : 'eek'}`;
    } else if (ms < year) {
        const months = Math.floor(ms / month);
        return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
        const years = Math.floor(ms / year);
        return `${years} year${years !== 1 ? 's' : ''}`;
    }
}