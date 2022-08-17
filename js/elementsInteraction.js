const form = document.querySelector("form");
const formInput = document.querySelector("input#userURL");

function disableValidationMsg  (event) {
    event.preventDefault();
}

function mobileMenu(event) {
    event.preventDefault();
    let mobileMenu = document.querySelector("section#menuContent");
    mobileMenu.classList.toggle("hidden");
}

async function verification(event) {  
    /* It will check if the input value is valid and return a new element with the shortened url */

    event.preventDefault();
    const formButton = event.path[0];
    const urlListContainer = document.querySelector("section.urlList");
    let isValid = formInput.validity.valid;

    formButton.setAttribute("disabled", "true");
    formButton.innerHTML = `<span class="buttonLoading"></span>`;

    if (isValid) {

        if (form.children.length == 3) {
            formInput.style.outline = "none";
            let span = form.children[1];
            form.removeChild(span);
        }

        const apiRequest = await fetch(`https://api.shrtco.de/v2/shorten?url=${formInput.value}`);
        const apiReturn = await apiRequest.json();

        if (apiReturn.ok) {

            urlListContainer.innerHTML += 
                `<div class="urlContainer">
                    <span class="userURL">${apiReturn.result.original_link}</span>
                    <div>
                    <span>${apiReturn.result.full_short_link}</span>
                    <button class="squareButton" ontouchstart="copy(event)" onclick="copy(event)">copy</button>
                    </div>
                </div>`;
        }else {
            urlListContainer.innerHTML += `<p class="erroMsg">The process could not be completed. Try again later.</p>`;

            setTimeout(() => { /* It will remove the message after a while */
                let i = urlListContainer.children.length - 1;
                urlListContainer.removeChild(urlListContainer.children[i]);
            }, 6000)
        }
    }else { /* If the url is not valid */
        if (form.children.length == 2) {
            formInput.style.outline = "2px solid var(--redColor)";
            let span = document.createElement("span");
            span.setAttribute("class", "validateMsg");
            span.innerHTML = "Enter a valid url";

            let lastChild = form.children[form.children.length - 1];
            form.insertBefore(span, lastChild);
        }
    }

    if (urlListContainer.children.length == 5) {
        urlListContainer.removeChild(urlListContainer.children[0]);
    }

    formInput.value = "";
    formButton.innerHTML = "Shorten it!";
    formButton.removeAttribute("disabled");
}


function copy(event) { 
    /* It Will copy the shortened url */
    event.preventDefault();
    let url = event.path[1].children[0].innerText;
    let button = event.path[0];

    navigator.clipboard.writeText(url);
    button.innerText = "Copied!";
    button.style.backgroundColor = "var(--veryDarkBlueColor)";

    setTimeout(() => {
        button.innerText = "Copy";
        button.style.backgroundColor = "var(--cyanColor)";
    }, 1500)
}