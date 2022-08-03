function mobileMenu(event) {
    event.preventDefault();
    let mobileMenu = document.querySelector("section#menuContent");
    mobileMenu.classList.toggle("hidden");
}


async function verification(event) {  
    /* It will check if the input value is valid and return a new element with the shortened url */
    event.preventDefault();
    let urlButton = event.path[0];
    let urlInput = event.path[1][0];
    let isValid = urlInput.validity.valid;
    let urlListContainer = document.querySelector("section.urlList");

    urlButton.setAttribute("disabled", "true");
    urlButton.innerHTML = `<span class="buttonLoading"></span>`;

    if (isValid) {
        
        const apiRequest = await fetch(`https://api.shrtco.de/v2/shorten?url=${urlInput.value}`);
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
    }else {
        /* If the input value is not valid */
    }

    if (urlListContainer.children.length == 5) {
        urlListContainer.removeChild(urlListContainer.children[0]);
    }

    urlInput.value = "";
    urlButton.innerHTML = "Shorten it!";
    urlButton.removeAttribute("disabled");
    console.log(event);
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