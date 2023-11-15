'use strict';

const inputLink = document.querySelector(".user-link");
const inputLabel = document.querySelector(".user-link-label");
const submitButton = document.querySelector(".submit-btn");
const containerOutput = document.querySelector(".link-output-boxes");

const API_URL = "https://api.shrtco.de/v2/shorten?url=";
let flag = 0;
function getShortenUrl(e) {
    e.preventDefault();

    const inputURL = inputLink.value;
    if (inputURL === "") {
        inputLink.classList.add("invalid-input");
        inputLabel.classList.add("invalid-msg");
        flag = 1;
    } else {
        if (flag === 1) {
            inputLink.classList.remove("invalid-input");
            inputLabel.classList.remove("invalid-msg");
            flag = 0;
        }
    
        inputLink.value = "";
        const shortenURL = callAPI(inputURL);
        renderOutput(inputURL, shortenURL);
    }

}

function callAPI(inputURL, callback) {
    fetch(`${API_URL + inputURL}`)
        .then((response) => response.json())
        .then((data) => callback(inputURL, data.result.full_short_link))
        .catch((error) => console.log("Error:", error));
}


function renderOutput(inputLink, shortenUrl) {
    const html = `<div class="link-output-box data-box-1">
                    <p class="input-link">${inputLink}</p>
                    <p class="output-link">${shortenUrl}</p>
                    <button class="btn-rect btn data-btn-1 copy-btn">Copy</button>
                  </div>`;

    containerOutput.insertAdjacentHTML("afterbegin", html);
}

function copyText(e) {
    if (!e.target.classList.contains("copy-btn")) return;

    const text = e.target.closest(".link-output-box").querySelector(".output-link").innerText;

    const inputElement = document.createElement('input');
    inputElement.setAttribute("value", text);
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand("copy");
    inputElement.parentNode.removeChild(inputElement);

    e.target.innerHTML = "Copied!";
    e.target.style.backgroundColor = "hsl(257, 27%, 26%)";
}

submitButton.addEventListener("click", getShortenUrl);
containerOutput.addEventListener("click", copyText);
