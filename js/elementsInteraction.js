
async function verification(event) {  
    /* It will check if the input value is valid and return a new element with the shortened url */
    event.preventDefault();
    let urlInput = event.path[1][0];
    let isValid = urlInput.validity.valid;
    let urlListContainer = document.querySelector("section.urlList");

    if (isValid) {
        
        const apiRequest = await fetch(`https://api.shrtco.de/v2/shorten?url=${urlInput.value}`);
        let urlShortened = await apiRequest.json();

        if (urlShortened.ok) {

            urlListContainer.innerHTML += 
                `
                <div class="urlContainer">
                    <span class="userURL">${urlShortened.result.original_link}</span>
                    <div>
                    <span>${urlShortened.result.full_short_link}</span>
                    <button class="squareButton" onclick="copy(event)" ontouchstart="copy(event)">copy</button>
                    </div>
                </div>
                `;
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