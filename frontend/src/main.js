// import './style.css';
import "./app.css";

// import logo from './assets/images/logo-universal.png';
import { Click, CaptureScreen, DoubleClick, GoLog } from "../wailsjs/go/main/App";

let keyBuffer = []; // Buffer to store key sequence
let timer;

function numberToLabel(num) {
    let label = "";
    while (num >= 0) {
        label = String.fromCharCode(65 + (num % 26)) + label;
        num = Math.floor(num / 26) - 1;
    }
    return label;
}

async function createGrid() {
    await GLog("Hi trying to create Grid...");
    const grid = document.getElementById("grid");
    grid.innerHTML = ""; // Clear previous grid
    const cols = Math.floor(grid.clientWidth / 40);
    const rows = Math.floor(grid.clientHeight / 40);
    let index = 0;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.classList.add("unselectable");
            const textContent = numberToLabel(index);
            // Generate a unique ID based on the label
            const cellId = `cell-${textContent}`;
            cell.id = cellId;
            cell.textContent = textContent;
            grid.appendChild(cell);
            index++;
        }
    }
    await GLog("Grid creation Done...");
}

async function getElementGlobalPosition(element) {
    // Get the element's bounding rectangle
    const rect = element.getBoundingClientRect();

    // Get the element's absolute position on the screen
    var screenX = rect.left + window.screenX;
    var screenY = rect.top + window.screenY;

    // Adjust for high-DPI screens
    var scale = window.devicePixelRatio || 1;
    var realScreenX = screenX * scale;
    var realScreenY = screenY * scale;

    await GLog(`Screen Position (CSS Pixels): ${screenX}, ${screenY}`);
    await GLog(`Screen Position (Real Pixels):${realScreenX}, ${realScreenY}`);

    return {
        x: realScreenX,
        y: realScreenY,
    };
}

// Function to handle key press events
function handleKeyPress(event) {
    const key = event.key.toUpperCase(); // Convert to uppercase for consistency

    // Allow only alphabet keys (A-Z) and the Shift key
    if (/^[A-Z]$/.test(key) || (key === "SHIFT" && event.shiftKey)) {
        let Shift = false;
        if (key === "SHIFT") {
            Shift = true;
            console.log("Shift key pressed");
        } else {
            // Append the pressed key to the buffer if it's A-Z
            keyBuffer.push(key);
            console.log(`Key pressed: ${key}`);
        }

        // Reset the timer if it's already running
        if (timer) {
            clearTimeout(timer);
        }

        // Set a new timer to wait for 1 secondsbefore performing the action
        timer = setTimeout(async () => {
            const keys = keyBuffer.join("");
            // Perform the desired action with the buffered keys
            console.log("Buffered keys:", keys);
            const cellId = `cell-${keys}`;
            const cell = document.getElementById(cellId);
            if (cell) {
                console.log(cell);
                var pixel = await getElementGlobalPosition(cell);
                
                // Click on center
                pixel.x += 20;
                pixel.y += 20;
                
                // TODO: Check if the screen is fullscreen or not
                if(false){
                    pixel.y += 10;
                }

                // TODO: Remove Hardcoded values
                if(Shift){
                    //SClick(pixel.x, pixel.y);
                    DClick(pixel.x, pixel.y);
                } else{
                    //DClick(pixel.x, pixel.y);
                    SClick(pixel.x, pixel.y);
                }

                // Change border of cell when key matches a full ID
                cell.classList.add("pressed");
                //cell.textContent = `🔴`;
                setTimeout(() => {
                    // Restore original border after a delay
                    cell.classList.remove("pressed");
                    // cell.textContent = keys;
                }, 700);
            }
            // Clear the buffer
            keyBuffer = [];
        }, 300); // 1000 milliseconds = 1 seconds
    }
}

async function DClick(x, y) {
    try {
        await DoubleClick(x, y);
    } catch (err) {
        console.error(err);
    }
}

async function SClick(x, y) {
    try {
        await Click(x, y);
    } catch (err) {
        console.error(err);
    }
}

async function CapScreen(x, y, w, h) {
    try {
        await CaptureScreen(x, y, w, h);
    } catch (err) {
        console.error(err);
    }
}

// Setup the greet function
async function GLog(str) {
    try {
        await GoLog(str);
    } catch (err) {
        console.error(err);
    }
};

window.addEventListener("resize", createGrid);
window.addEventListener("keypress", handleKeyPress);
createGrid();
