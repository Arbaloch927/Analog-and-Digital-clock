// updateClocks();
function updateClocks() {
    const clockBoxes = document.querySelectorAll(".clock-box, .clocks-box");

    clockBoxes.forEach((box) => {
        const timezone = box.getAttribute("data-timezone");
        const now = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));

        // Analog Clock
        const hours = now.getHours() % 12; // 12-hour format
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const hourDeg = (hours + minutes / 60) * 30;
        const minuteDeg = (minutes + seconds / 60) * 6;
        const secondDeg = seconds * 6;

        const analogClock = box.querySelector(".analog-clock");
        if (analogClock) {
            const hourHand = analogClock.querySelector(".hour");
            const minuteHand = analogClock.querySelector(".minute");
            const secondHand = analogClock.querySelector(".second");

            if (hourHand && minuteHand && secondHand) {
                hourHand.style.transform = `rotate(${hourDeg}deg)`;
                minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
                secondHand.style.transform = `rotate(${secondDeg}deg)`;
            }
        }

        // Digital Clock
        const digitalClock = box.querySelector(".clock");
        if (digitalClock) {
            let displayHours = now.getHours();
            const ampm = displayHours >= 12 ? "PM" : "AM";

            if (!is24HourFormat) {
                displayHours = displayHours % 12 || 12; // Convert to 12-hour format
            }

            const minutesStr = minutes.toString().padStart(2, "0");
            const secondsStr = seconds.toString().padStart(2, "0");
            const hoursStr = displayHours.toString().padStart(2, "0");

            digitalClock.querySelector(".hours").textContent = hoursStr;
            digitalClock.querySelector(".minutes").textContent = minutesStr;
            digitalClock.querySelector(".seconds").textContent = secondsStr;
            digitalClock.querySelector(".ampm").textContent = is24HourFormat ? "" : ampm;
        }

        // Date
        const dateContainer = box.querySelector(".date");
        if (dateContainer) {
            const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            dateContainer.textContent = now.toLocaleDateString("en-US", dateOptions);
        }
    });
}

// Toggle between 12-hour and 24-hour format
let is24HourFormat = false;
document.getElementById("toggleFormat").addEventListener("click", () => {
    is24HourFormat = !is24HourFormat;
    document.getElementById("toggleFormat").textContent = is24HourFormat ? "Switch to 12-hour" : "Switch to 24-hour";
    updateClocks();
});

// Update clocks every second
setInterval(updateClocks, 1000);
updateClocks();
