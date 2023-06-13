/**
Author: Julian Zarcone #000878972 Feb, 25th, 2023
This is the javascript file that randomly gets and displays 9 different images of 3 different themes of Las Vegas which are hotels, tourist attractions, and the city itself!
*/
//This code declares a 2-dimensional array of the image file paths
const images = [
	['images/lasvegas.jpg', 'images/lasvegas1.jpg', 'images/lasvegas2.jpg'],
	['images/lasvegas3.jpg', 'images/lasvegas4.jpg', 'images/lasvegas5.jpg'],
	['images/lasvegas6.jpg', 'images/lasvegas7.jpg', 'images/lasvegas9.jpg'],
  ];
  
  //creates seven variables using the document.getElementById method to reference elements in the HTML file by their ID
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');
  const refreshTime = document.getElementById('refresh-time');
  const refreshBtn = document.getElementById('refresh-btn');
  const counter = document.getElementById('counter');
  const timer = document.getElementById('timer');
  
  let refreshIntervalId = null;
  let timerIntervalId = null;
  
  //Get method for randomimage
  function getRandomImage(images, currentImage) {
	const flattened = images.flat();
	const options = flattened.filter(image => image !== currentImage);
	const index = Math.floor(Math.random() * options.length);
	return options[index];
  }
  
  //function to display the images
  function displayRandomImages() {
	const image1 = getRandomImage(images);
	const image2 = getRandomImage(images);
	const image3 = getRandomImage(images);
  
	img1.src = image1;
	img2.src = image2;
	img3.src = image3;
  
	img1.classList.remove('spin');
	img2.classList.remove('spin');
	img3.classList.remove('spin');
  
	counter.textContent = parseInt(counter.textContent) + 3;
  }
  
  /*defines a function animateImage that triggers when an image is clicked. It first removes the 'spin' class from the clicked image,
	then sets a timeout function that changes the source of the clicked image to a randomly selected image from the images array using getRandomImage function */
  function animateImage(event) {
	const target = event.target;
	target.classList.remove('spin');
	setTimeout(() => {
	  target.src = getRandomImage(images, target.src);
	  target.classList.add('spin');
	  resetTimer();
	}, 0);
  }
  
  
  // Resets refresh timer
  function resetTimer() {
	clearInterval(refreshIntervalId);
	clearInterval(timerIntervalId);
	startTimer();
  }
  //starts the timer
  function startTimer() {
	let timeLeft = parseInt(refreshTime.value);
  
	/* sets up an interval that updates the timer on the screen and changes the color of the timer's 
	text and background based on the remaining time until the next automatic refresh. */

	timerIntervalId = setInterval(() => {
	  timer.textContent = (timeLeft / 1000).toFixed(1);
	  if (timeLeft <= 2500) {
		if (timeLeft % 500 === 0) {
		  timer.style.color = 'black';
		  timer.style.backgroundColor = 'yellow';
		} else if (timeLeft % 250 === 0) {
		  timer.style.color = 'white';
		  timer.style.backgroundColor = 'red';
		} else if (timeLeft % 100 === 0) {
		  timer.style.color = 'black';
		  timer.style.backgroundColor = 'yellow';
		} else if (timeLeft % 50 === 0) {
		  timer.style.color = 'white';
		  timer.style.backgroundColor = 'red';
		}
	  }
  
	  timeLeft -= 100;
	  if (timeLeft < 0) {
		displayRandomImages();
		startTimer();
	  }
	}, 100);
  
	refreshIntervalId = setTimeout(() => {
	  displayRandomImages();
	  startTimer();
	}, timeLeft);
  }
  
  function validateInput() {
	const input = refreshTime.value;
	if (isNaN(input) || input < 500 || input > 10000) {
	  alert('Please enter a number between 500 and 10000');
	} else {
	  resetTimer();
	}
  }
  
  img1.addEventListener('click', animateImage);
  img2.addEventListener('click', animateImage);
  img3.addEventListener('click', animateImage);
  
  refreshBtn.addEventListener('click', function() {
	// Get three random images
	const randomImages = getThreeRandomImages();
	
	// Change the source of the images to the random images
	img1.src = randomImages[0];
	img2.src = randomImages[1];
	img3.src = randomImages[2];
	
	// Reset the automatic refresh timer
	resetRefreshTimer();
	
	// Increase the image counter by 3
	incrementCounter(3);
	});
	
	function getThreeRandomImages() {
	const randomImages = [];
	
	// Get one random image from each theme
	for (let i = 0; i < images.length; i++) {
	const randomImageIndex = Math.floor(Math.random() * images[i].length);
	randomImages.push(images[i][randomImageIndex]);
	}
	
	return randomImages;
	}
	
	function resetRefreshTimer() {
		// Cancel the previous refresh interval
		clearInterval(refreshIntervalId);
	  
		// Start a new refresh interval with the updated refresh time
		refreshIntervalId = setInterval(function() {
		  const randomImages = getThreeRandomImages();
	  
		  img1.classList.remove('spin');
		  img2.classList.remove('spin');
		  img3.classList.remove('spin');
	  
		  setTimeout(function() {
			img1.src = randomImages[0];
			img2.src = randomImages[1];
			img3.src = randomImages[2];
	  
			img1.classList.add('spin');
			img2.classList.add('spin');
			img3.classList.add('spin');
	  
			incrementCounter(3);
			resetRefreshTimer();
		  }, 300);
		}, refreshTime.value);
	  }
	  
	//Increment counter 
	function incrementCounter(value) {
	const currentValue = parseInt(counter.innerText);
	counter.innerText = currentValue + value;
	}
	
	
	
	