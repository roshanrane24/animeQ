var tabs = ["random", "anime", "character"];
var currentTab = 0;

var xhr = new XMLHttpRequest();

// sending request
function sendRequest() {
    xhr.open("get", getRequestURL());
    xhr.send();
}

function getRequestURL() {
    switch (currentTab) {
        case 0:
            return "https://animechan.vercel.app/api/random";
        case 1:
            // TODO: add after creating anime tab
            var anime = $().val();
            return "https://animechan.vercel.app/api/quotes/anime?title="
                   + anime;
        case 2:
            // TODO: add after creating cahracter tab
            var character = $().val();
            return "https://animechan.vercel.app/api/quotes/character?name="
                   + character;
        default:
            console.error("Wrong tab value")
    }
}

// Display output
function addSingleQuote(obj) {
    let div = $("div#quote")

    let qt = document.createElement("div");
    $(qt).addClass("flex justify-center md:justify-end -mt-16");
    let qtp = document.createElement("p");
    $(qtp).addClass("mt-2 text-gray-600");
    qt.appendChild(qtp.appendChild(document.createTextNode(obj.quote)));

    let ch = document.createElement("div");
    $(ch).addClass("flex justify-end mt-4");
    let chp = document.createElement("a");
    $(chp).attr("href", "#")
    $(chp).addClass("text-xl font-medium text-indigo-500");
    qt.appendChild(chp.appendChild(document.createTextNode(obj.character)));

    div.html("");
    div.append(qt);
    div.append(ch);
}


$(document).ready(() => {
    sendRequest();

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
            addSingleQuote(JSON.parse(xhr.responseText));
        } else if (xhr.readyState === 3 && xhr.status === 200) {
            console.log("waiting")
        }
    };
});
