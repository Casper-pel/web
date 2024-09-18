const API = "53250eb38b864df48934fd1b858628eb";
const api = "sk_6COBWkEeNVvMTMlJ";
const publicAPI = "pk_spzVA4pvM9lK0cfX";

const shorten = document.querySelector(".input button");
const input = document.querySelector(".input input");
const empty = document.querySelector(".empty");
const invalid = document.querySelector(".error");
const copy = document.querySelector(".shortened");

showUrl();

var button = document.querySelectorAll(".copy");



async function get(link){
    const validUrl = url => {
        try{
            return Boolean(new URL(url));
        }
        catch(e){
            return false;
        }
    }

    const valid = validUrl(link);

    if(valid == true){

        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: api,
            },
            body: JSON.stringify({
                domain: "myShortener.com",
                originalURL: link,
                allowDuplicates: true
            })
        };
        var data = {
            "domain":"myShortener.com",
            "originalURL": link
            }; 
         fetch('https://api.short.io/links/public', {
            method: 'post',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
              'authorization': publicAPI
            },
            body: JSON.stringify(data)
          }).then(function(response){ 
            console.log(response)
             return response.json();
            }).then(function(data){
                const newLinkBox = document.createElement("div");
                newLinkBox.className = "linkBox";
                copy.prepend(newLinkBox);

                const newLink = document.createElement("div");
                newLink.className = "links";
                newLinkBox.appendChild(newLink);

                const ogLink = document.createElement("p");
                ogLink.innerHTML = link;
                newLink.appendChild(ogLink);

                const shortLink = document.createElement("p");
                shortLink.innerHTML = data.shortURL;
                newLink.appendChild(shortLink);

                const copyBtn = document.createElement("button");
                copyBtn.className = "copy";
                copyBtn.innerHTML = "Copy";
                newLinkBox.appendChild(copyBtn);

                button = document.querySelectorAll(".copy");

                if(button.length > 4){
                    button[5].parentElement.remove();
                }

                saveData();
            })
    }else{
        input.style.border = "3px solid red";
        input.style.color = "red";
        invalid.style.display = "block";
    }
}

input.addEventListener("focus", () => {
    input.style.border = "0";
    input.style.color = "";
    empty.style.display = "none";
    invalid.style.display = "none";
})

shorten.addEventListener("click", () => {
   
    if(input.value == ""){
        input.style.border = "3px solid red";
        input.style.color = "red";
        empty.style.display = "block";
    }else{
        get(input.value);
    }
});

copy.addEventListener("click", function(e){
    console.log(button);
    if(e.target.tagName == "BUTTON"){
        for (let i = 0; i < button.length; i++) {
            button[i].style.background = "hsl(180,66%,49%)";
            button[i].innerHTML = "Copy";
        }
        e.target.style.background = "hsl(257, 27%, 26%)";
        e.target.innerHTML = "Copied!";

        const urlBox = e.target.parentElement;
        navigator.clipboard.writeText(urlBox.childNodes[0].childNodes[1].innerHTML);
    }
}, false);

function saveData(){
    localStorage.setItem("data", copy.innerHTML);
}

function showUrl(){
    // localStorage.clear();
    copy.innerHTML = localStorage.getItem("data");
}

