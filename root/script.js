baseurl = `https://script.google.com/macros/s/AKfycbxWbKDIhVja4FzenTjpdWBmVVmo7PC0Hpu2SPapUls6arKcfXWe_wzMl_xrXsWYWnsS/exec?url=`

var body = document.body
var template = document.getElementById("cardTemplate");
var container = document.querySelector('main');
var card = document.querySelector('.card')
var index = document.querySelector('.index')
var swipe = document.querySelector('.swipe')
var source = document.querySelector('#source')
const viewedIcon = card.querySelector(".viewed-icon");


/* __Utitites__ */
function convertTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
    var result = '';
    if (hours > 0) {
        result += hours + (hours === 1 ? ' hr ' : ' hrs ');
    }
    if (minutes > 0) {
        result += minutes + (minutes === 1 ? ' min ' : ' mins ');
    }
    if (hours === 0 && minutes === 0) {
        result += remainingSeconds + (remainingSeconds === 1 ? ' sec' : ' sec')
    }
    if (result.trim().length > 0) {
        return result.trim() + ' ago';
    }
}


function getTimeAgo(dateString) {
    try {
        var currentDate = new Date();
        var pastDate = new Date(dateString);
        var timeDifference = pastDate.getTime() - currentDate.getTime();
        var seconds = Math.floor(timeDifference / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        if (days > 0) {
            return days;
        } else if (hours > 0) {
            return hours;
        } else if (minutes > 0) {
            return minutes;
        } else {
            return seconds;
        }
    } catch (error) {
        // If an error occurs, return an empty string
        return "";
    }
}


function convertToAMPMFormat(timeString) {
    try {
        const date = new Date(timeString);

        let hours = date.getHours();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        const formattedDate = timeString.replace(/\d{2}:\d{2}:\d{2}/, `, ${hours.toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${ampm}`);

        const currentDate = new Date();
        const inputDate = new Date(timeString);

        const currentDateFormat = currentDate.toISOString().substring(0, 10);
        const inputDateFormat = inputDate.toISOString().substring(0, 10);

        if (currentDateFormat === inputDateFormat) {
            return ` <span style="color: #00c800; font-weight:bold; ">Today, </span>  <br><span style="text-decoration: underline;">${formattedDate} </span>`;
        } else if (currentDate.getDate() - inputDate.getDate() === 1) {
            return ` <span style="color: #ff0000; font-weight:bold;">Yesterday, </span> <br><span style="text-decoration: underline;">${formattedDate} </span>`;
        } else {
            return ` <span style="color: #ff0000; font-weight:bold;">&nbsp; </span> <br><span style="text-decoration: underline;">${formattedDate} </span>`;
        }
    } catch (error) {
        // If an error occurs, return an empty string
        return "";
    }
}




/* __Functions__ */
function fetchurl(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            usejson(data)
        })
        .catch(error => {
            console.log('Error:', error);
            showError(error)
        });
}


var storedValue = localStorage.getItem('selectedSource');
if (storedValue) {
  source.value = storedValue;
}

fetchurl(baseurl + URLS[source.value])




function showError(error) {
    card.innerHTML = `
    <style>
      .card {display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
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
    items = data
    currentItemIndex = items.length - 1
    // currentItemIndex = 0





    function displayItem(index) {
        card.querySelector(".index").textContent = (items.length - index).toString().padStart(2, '0') + '/' + items.length.toString().padStart(2, '0');
        card.querySelector(".headline").innerHTML = items[index].title
        card.querySelector(".link").href = items[index].link
        card.querySelector(".link").textContent = 'Know More..'
        card.querySelector(".description").innerHTML = items[index].description || ''
        publishDate = items[index].pubDate || ''
        card.querySelector(".timeago").innerHTML = convertTime(Math.abs(getTimeAgo(publishDate))) || ''
        card.querySelector(".date").innerHTML = convertToAMPMFormat(publishDate) || ''
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

    swipe.addEventListener('click', function (event) {
        const { clientX } = event;
        const containerWidth = container.offsetWidth;
        const thirdWidth = containerWidth / 3;
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





source.addEventListener('change', function () {
    console.log(URLS[`${this.value}`]);

    document.querySelectorAll('.loading-hide').forEach(e => {
        e.innerHTML = ``
    });
    document.querySelectorAll('.loading').forEach(e => {
        e.innerHTML = `<div class="loading skeleton skeleton-text"></div>
        <div class="loading skeleton skeleton-text"></div>
        <div class="loading skeleton skeleton-text"></div>`
    });

    fetchurl(baseurl + URLS[source.value])
    localStorage.setItem('selectedSource', this.value);
})