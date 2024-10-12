// src/utils/dates.js

const dates = {
    formatTime: (time) => {
        const date = new Date(time);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    },

    formatRemainingTime: (remaining) => {
        const { years, months, days } = remaining;

        // If all values are negative, the event has passed
        if (years < 0 || months < 0 || days < 0) {
            return `Event passed ${Math.abs(years)} years, ${Math.abs(months)} months, and ${Math.abs(days)} days ago`;
        }

        // If future event
        return `${years} years, ${months} months, and ${days} days remaining`;
    },

    formatNegativeTimeRemaining: (remainingTime, eventId) => {
        if (remainingTime.includes('passed')) {
            document.getElementById(`remaining-${eventId}`).style.color = 'red';
        }
    }
}

export default dates;
