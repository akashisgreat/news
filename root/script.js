baseurl = `https://script.google.com/macros/s/AKfycbxWbKDIhVja4FzenTjpdWBmVVmo7PC0Hpu2SPapUls6arKcfXWe_wzMl_xrXsWYWnsS/exec?url=`

var body = document.body
var template = document.getElementById("cardTemplate");
var container = document.querySelector('main');
var card = document.querySelector('.card')
var index = document.querySelector('.index')
var swipe = document.querySelector('.swipe')
var source = document.querySelector('#source')
const viewedIcon = card.querySelector(".viewed-icon");
nowdate = new Date();



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



// /////////////////////////////////////////////// 


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


// function getTimeAgo(dateString) {
//     try {
//         var currentDate = new Date();
//         var pastDate = new Date(dateString);
//         var timeDifference = pastDate.getTime() - currentDate.getTime();
//         var seconds = Math.floor(timeDifference / 1000);
//         var minutes = Math.floor(seconds / 60);
//         var hours = Math.floor(minutes / 60);
//         var days = Math.floor(hours / 24);

//         if (days > 0) {
//             return days;
//         } else if (hours > 0) {
//             return hours;
//         } else if (minutes > 0) {
//             return minutes;
//         } else {
//             return seconds;
//         }
//     } catch (error) {
//         // If an error occurs, return an empty string
//         return "";
//     }
// }


// function convertToAMPMFormat(timeString) {
//     try {
//         const date = new Date(timeString);

//         let hours = date.getHours();
//         const ampm = hours >= 12 ? "PM" : "AM";
//         hours = hours % 12 || 12;

//         const formattedDate = timeString.replace(/\d{2}:\d{2}:\d{2}/, `, ${hours.toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${ampm}`);

//         const currentDate = new Date();
//         const inputDate = new Date(timeString);

//         const currentDateFormat = currentDate.toISOString().substring(0, 10);
//         const inputDateFormat = inputDate.toISOString().substring(0, 10);

//         if (currentDateFormat === inputDateFormat) {
//             return ` <span style="color: #00c800; font-weight:bold; ">Today, </span>  <br><span style="text-decoration: underline;">${formattedDate} </span>`;
//         } else if (currentDate.getDate() - inputDate.getDate() === 1) {
//             return ` <span style="color: #ff0000; font-weight:bold;">Yesterday, </span> <br><span style="text-decoration: underline;">${formattedDate} </span>`;
//         } else {
//             return ` <span style="color: #ff0000; font-weight:bold;">&nbsp; </span> <br><span style="text-decoration: underline;">${formattedDate} </span>`;
//         }
//     } catch (error) {
//         // If an error occurs, return an empty string
//         return "";
//     }
// }
  
// Function to convert date string to AM/PM format
// function convertTo12HourFormat(dateString) {
//     console.log(dateString);
//     try {
//       if (!dateString) return ''; // Return empty string if dateString is empty
  
//       const date = new Date(dateString);
//       console.log(date);
  
//       const hours = date.getHours();
//       const minutes = date.getMinutes();
//       const seconds = date.getSeconds();

//       const ampm = hours >= 12 ? 'PM' : 'AM';
//       const convertedHours = hours % 12 || 12;
  
//       const formattedTime = `${convertedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
//       const convertedDate = dateString.replace(' GMT', '');
  
//       console.log(formattedTime);
//     //   return convertedDate.replace(/\d{2}:\d{2}:\d{2}/, formattedTime);
//     } catch (error) {
//       // If an error occurs, return an empty string
//       return '';
//     }
//   }
  
  
//   // Function to get time elapsed since the given date
//   function getTimeAgo(dateString) {
//     try {
//       if (!dateString) return ''; // Return empty string if dateString is empty
  
//       const date = new Date(dateString);
//       const currentDate = new Date();
  
//       const elapsed = currentDate - date; // Time elapsed in milliseconds
  
//       // Convert elapsed time to hours, minutes, or seconds based on magnitude
//       if (elapsed >= 3600000) { // 1 hour = 3600000 milliseconds
//         const hours = Math.floor(elapsed / 3600000);
//         return `${Math.abs(hours)} hour${Math.abs(hours) !== 1 ? 's' : ''} ${hours < 0 ? 'ago' : 'ahead'}`;
//       } else if (elapsed >= 60000) { // 1 minute = 60000 milliseconds
//         const minutes = Math.floor(elapsed / 60000);
//         return `${Math.abs(minutes)} minute${Math.abs(minutes) !== 1 ? 's' : ''} ${minutes < 0 ? 'ago' : 'ahead'}`;
//       } else {
//         const seconds = Math.floor(elapsed / 1000);
//         return `${Math.abs(seconds)} second${Math.abs(seconds) !== 1 ? 's' : ''} ${seconds < 0 ? 'ago' : 'ahead'}`;
//       }
//     } catch (error) {
//       // If an error occurs, return an empty string
//       return '';
//     }
//   }
  
// ///////////////////////////////////////////////  





function usejson(data) {
    items = data
    currentItemIndex = items.length - 1
    function displayItem(index) {
        card.querySelector(".index").textContent = (items.length - index).toString().padStart(2, '0') + '/' + items.length.toString().padStart(2, '0');
        card.querySelector(".headline").innerHTML = items[index].title
        card.querySelector(".link").href = items[index].link
        card.querySelector(".link").innerHTML = `Know more <br> [${items[index].link.substring(items[index].link.lastIndexOf('=') + 1)}]`

        card.querySelector(".description").innerHTML = items[index].description || ''
        // card.querySelector(".date").innerHTML = items[index].pubDate || ''
        // card.querySelector(".timeago").innerHTML =  items[index].pubDate  || ''
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



    document.addEventListener('keydown', handleKeyDown);
    function handleKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            nextButtonClick();
        } else if (event.key === 'ArrowRight') {
            prevButtonClick();
        }
    }

    body.addEventListener('click', function (event) {
        const { clientX } = event;
        const containerWidth = container.offsetWidth;
        const thirdWidth = containerWidth / 4;
        if (clientX < thirdWidth) {
            // Rightmost (Right click)
            nextButtonClick();
        } else if (clientX > containerWidth - thirdWidth) {
            // Leftmost (Left Click)
            prevButtonClick();
        }
    });
    

}


source.addEventListener('change', function () {
    document.querySelectorAll('.loading-hide').forEach(e => {
        e.innerHTML = ``
    });
    document.querySelectorAll('.loading').forEach(e => {
        console.log(e);
        e.innerHTML = `<div class="loading skeleton skeleton-text"></div>
        <div class="loading skeleton skeleton-text"></div>
        <div class="loading skeleton skeleton-text"></div>`
    });

    fetchurl(baseurl + URLS[source.value])
    localStorage.setItem('selectedSource', this.value);
})


