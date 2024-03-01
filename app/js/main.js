import Popup from "./popup.js";
import form from "./form.js";
//import sliders from "./sliders.js";
import startAnimation from "./start-animation.js?v=2"

const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	header = document.querySelector('.header');




const popup = new Popup();

popup.init()


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure img');
imageAspectRatio.forEach(imageAspectRatio => {
	if(imageAspectRatio.getAttribute('width') && imageAspectRatio.getAttribute('height'))
		imageAspectRatio.style.setProperty('--aspect-ratio', `${imageAspectRatio.getAttribute("width")}/${imageAspectRatio.getAttribute("height")}`);
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <click-events> -=-=-=-=-=-=-=-=-=-=-=-=

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}


	// =-=-=-=-=-=-=-=-=-=-=-=- <menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=
	
	if ($('.header__burger')) {
	
		window.scrollTo({left:0,top:window.scrollY});

		menu.forEach(element => {
			element.classList.toggle('is-mobile-menu-active')
		});

		
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=

	
	
	// =-=-=-=-=-=-=-=-=-=-=-=- <about-video> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const videoBlock = $(".video_block")
	if(videoBlock) {
	
		const element = videoBlock.querySelector("video");

		if(element.muted) {
			element.muted = false;
			element.loop = false;
			element.removeAttribute("muted");
			element.removeAttribute("loop");
			element.currentTime = 0;
			element.play();

			videoBlock.classList.add("is-playing");

			document.querySelector(".play_cursor").classList.remove("is-active");
			document.querySelector(".custom_cursor").classList.remove("is-hidden");

		} else {
			if(videoBlock.classList.contains("is-playing")) {
				element.pause();
			} else {
				element.play();
			}
		}
		
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </about-video> -=-=-=-=-=-=-=-=-=-=-=-=

})

// =-=-=-=-=-=-=-=-=-=-=-=- </click-events> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize = 0;

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	
	windowSize = window.innerWidth;
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

//sliders();

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <video> -=-=-=-=-=-=-=-=-=-=-=-=

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds; // добавляем ведущий 0, если секунды < 10
    }
    return minutes + ':' + remainingSeconds;
}


document.querySelectorAll(".video_block").forEach(block => {

	const video = block.querySelector("video"),
	time = block.querySelectorAll(".video_block__time span");
	
	video.addEventListener("play", () => {
		if(!video.muted) block.classList.add("is-playing");
	})
	
	video.addEventListener("pause", () => {
		if(!video.muted) block.classList.remove("is-playing");
	})

	let progress;

	setInterval(() => {
		progress = video.currentTime / video.duration * 100;
		if(progress) block.style.setProperty("--progress", progress)

		time.forEach(time => time.textContent = formatTime(video.currentTime));
	},500)
})

// =-=-=-=-=-=-=-=-=-=-=-=- </video> -=-=-=-=-=-=-=-=-=-=-=-=


startAnimation({
	header, menu
});


form();
