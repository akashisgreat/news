url = `https://script.google.com/macros/s/AKfycbxWbKDIhVja4FzenTjpdWBmVVmo7PC0Hpu2SPapUls6arKcfXWe_wzMl_xrXsWYWnsS/exec?url=${URL}`

var template = document.getElementById("cardTemplate");
var container = document.   querySelector('main');
var card = document.querySelector('.card')
var swipeArea = document.querySelector('.card');
var index = document.querySelector('.index')
const viewedIcon = card.querySelector(".viewed-icon");
var body = document.body




/* __Functions__ */

fetch(url)
    .then(response => response.json())
    .then(data => {
        usejson(data)
    })
    .catch(error => {
        console.log('Error:', error);
        showError(error)
    });


function showError(error) {
    card.innerHTML = `
    <style>
      .card {display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: Arial, sans-serif;
        text-align: center;}
      h1 {font-size: 24px;margin-bottom: 10px;}
      p {font-size: 16px;margin-bottom: 20px;}
      button {padding: 10px 20px;font-size: 16px;}
    </style>
    <h1>Error Page!</h1>
    <p>Oops! ${error}</p>
    <button onclick="location.reload();">Reload</button>
      `

}

function usejson(data) {
    // items = data.channel.item
    items = data

    currentItemIndex = 11

    function displayItem(index) {
        card.querySelector(".index").textContent = (items.length - index).toString().padStart(2, '0') + '/' + items.length.toString().padStart(2, '0');
        card.querySelector(".headline").innerHTML = items[index].title
        card.querySelector(".link").href = items[index].link
        card.querySelector(".link").textContent = 'Know More..'
    }

    function nextButtonClick() {
        currentItemIndex++;
        if (currentItemIndex >= items.length) {
            // currentItemIndex = 0;
            currentItemIndex = items.length - 1;
        }
        displayItem(currentItemIndex);
    }

    function prevButtonClick() {
        currentItemIndex--;
        if (currentItemIndex < 0) {
            // currentItemIndex = items.length - 1;
            currentItemIndex = 0;
        }
        displayItem(currentItemIndex);
    }

    displayItem(currentItemIndex);


    body.addEventListener('click', function (event) {
        const { clientX } = event;
        const containerWidth = container.offsetWidth;
        const thirdWidth = containerWidth / 4;
        if (clientX < thirdWidth) {
            // Rightmost third (Right click)
            nextButtonClick();
        } else if (clientX > containerWidth - thirdWidth) {
            // Leftmost third (Left Click)
            prevButtonClick();
        }
    });

    document.addEventListener('keydown', handleKeyDown);
    function handleKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            nextButtonClick();
        } else if (event.key === 'ArrowRight') {
            prevButtonClick();
        }
    }

}