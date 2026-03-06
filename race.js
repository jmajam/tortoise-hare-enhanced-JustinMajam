//render track with tortoise and hare emojis
//start race with a button click
//trigger move of the tortoise and hare every second
//move the tortoise randomly every second
// move the hare randomly every second
// fix the position if they go beyond the track
// render the track again with the new positions
//when one of the animals reach the end of the track, show result

const startBtn = document.getElementById("startBtn");
const messageEl = document.getElementById("message");
const trackEl = document.getElementById("track");

const TRACK_LENGTH = 70;

let tortoisePosition = 1;
let harePosition = 1;
let raceIntervalId = null;

startBtn.addEventListener("click", startRace);

//start race with a button click
function startRace() {
    tortoisePosition = 1;
    harePosition = 1;

    messageEl.textContent = "BANG!!! AND THEY ARE OFF";

    startBtn.disabled = true;

    if (raceIntervalId !== null) {
        clearInterval(raceIntervalId);
    }

    //run a race step every one second
    raceIntervalId = setInterval(raceStep, 1000);
}

function raceStep() {
    moveTortoise(); //move the tortoise randomly every second
    moveHare(); // move the hare randomly every second
    clampPositions(); // fix the position if they go beyond the track
    renderTrack(); // render the track again with the new positions

    if (tortoisePosition >= TRACK_LENGTH || harePosition >= TRACK_LENGTH) {
        clearInterval(raceIntervalId);
        raceIntervalId = null;
        startBtn.disabled = false;
        showResult();
    }
}

function moveTortoise() {
    // use random integer 1-10
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll >= 1 && roll <= 5) {
        //1-5 fast plod
        tortoisePosition += 4;
    } else if (roll >= 6 && roll <= 7) {
        //6-7 slip
        tortoisePosition -= 5;
    } else {
        // 8-10 slow plod
        tortoisePosition += 1;
    }
}

function moveHare() {
    // use random integer 1-10
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll >= 1 && roll <= 5) {
        //1-5 sleep plod
        harePosition += 2;
    } else if (roll >= 6 && roll <= 7) {
        //6-7 super jump
        harePosition += 0;
    } else {
        // 8-10 normal pace
        harePosition += 4;
    }
}

function clampPositions() {
    //fit the position within the track
    const MIN_POSITION = 1;
    const MAX_POSITION = TRACK_LENGTH;

    tortoisePosition = Math.min(
        MAX_POSITION,
        Math.max(MIN_POSITION, tortoisePosition),
    );
    harePosition = Math.min(MAX_POSITION, Math.max(MIN_POSITION, harePosition));
}

function renderTrack() {
    trackEl.innerHTML = "";

    for (let i = 1; i <= TRACK_LENGTH; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const isTortoiseHere = tortoisePosition == i;
        const isHareHere = harePosition == i;

        if (isTortoiseHere && isHareHere) {
            cell.textContent = "💥";
            cell.classList.add("both");
        } else if (isTortoiseHere) {
            cell.textContent = "🐢";
            cell.classList.add("tortoise");
        } else if (isHareHere) {
            cell.textContent = "🐇";
            cell.classList.add("hare");
        }

        trackEl.appendChild(cell);
    }
}

function showResult() {
    if (tortoisePosition >= TRACK_LENGTH && harePosition >= TRACK_LENGTH) {
        messageEl.textContent = "TIE";
    } else if (tortoisePosition >= TRACK_LENGTH) {
        messageEl.textContent = "TORTOISE W";
    } else if (harePosition >= TRACK_LENGTH) {
        messageEl.textContent = "HARE W";
    } else {
        messageEl.textContent = "Race Stopped";
    }
}
