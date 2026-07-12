const btn = document.getElementById("calculateBtn");
const wakeTime = document.getElementById("wakeTime");
const result = document.getElementById("result");

btn.addEventListener("click", function () {

    if (!wakeTime.value) {
        alert("Please select wake up time");
        return;
    }

    let [hour, minute] = wakeTime.value.split(":").map(Number);

    let wakeMinutes = hour * 60 + minute;

    const cycles = [6, 5, 4];

    let html = "<h3>Recommended Bedtimes</h3>";

    cycles.forEach(cycle => {

        let sleep = wakeMinutes - (cycle * 90) - 15;

        while (sleep < 0) {
            sleep += 1440;
        }

        let h = Math.floor(sleep / 60);
        let m = sleep % 60;

        let ampm = h >= 12 ? "PM" : "AM";

        h = h % 12;
        if (h === 0) h = 12;

        html += `
        <div style="
        background:#1e293b;
        padding:15px;
        margin-top:15px;
        border-radius:15px;
        text-align:center;
        ">
            <h2>${h}:${String(m).padStart(2,"0")} ${ampm}</h2>
            <p>${cycle} Sleep Cycles</p>
        </div>
        `;
    });

    result.innerHTML = html;
    result.style.display = "block";
});
