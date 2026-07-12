const calculateBtn = document.getElementById("calculateBtn");
const wakeTime = document.getElementById("wakeTime");
const result = document.getElementById("result");

calculateBtn.addEventListener("click", () => {

    if (wakeTime.value === "") {
        alert("Please select your wake-up time.");
        return;
    }

    let [hour, minute] = wakeTime.value.split(":").map(Number);

    let wakeMinutes = hour * 60 + minute;

    const cycles = [6, 5, 4];

    let html = "<h3>🌙 Recommended Bedtimes</h3><ul>";

    cycles.forEach(cycle => {

        let sleep = wakeMinutes - (cycle * 90) - 15;

        while (sleep < 0) sleep += 1440;

        let h = Math.floor(sleep / 60);
        let m = sleep % 60;

        let ampm = h >= 12 ? "PM" : "AM";

        h = h % 12;
        if (h === 0) h = 12;

        html += `<li>${h}:${m.toString().padStart(2,"0")} ${ampm} (${cycle} cycles)</li>`;

    });

    html += "</ul>";

    html += `
    <br>
    <button onclick="copyResult()">📋 Copy Result</button>
    <br><br>
    <button onclick="shareResult()">📤 Share Result</button>
    `;

    result.innerHTML = html;
    result.style.display = "block";

});

function copyResult() {
    navigator.clipboard.writeText(result.innerText);
    alert("Result copied!");
}

function shareResult() {

    if (navigator.share) {

        navigator.share({
            title: "Sleep Calculator",
            text: result.innerText
        });

    } else {

        alert("Sharing is not supported on this device.");

    }

               }
