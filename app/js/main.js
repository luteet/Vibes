import Popup from "./popup.js";
import form from "./form.js";
import startAnimation from "./start-animation.js?v=7"

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
	
		const element = videoBlock.querySelector("video"), playEvent = new Event("play");

		if(element.muted) {

			element.muted = false;
			element.loop = false;
			element.removeAttribute("muted");
			element.removeAttribute("loop");
			element.currentTime = 0;
			setTimeout(() => {
				element.play();
				element.dispatchEvent(playEvent)
			},0)

			videoBlock.classList.add("is-playing");

			document.querySelector(".play_cursor").classList.remove("is-active");
			document.querySelector(".pause_cursor").classList.add("is-active");

		} else {
			if(videoBlock.classList.contains("is-playing")) {
				element.pause();
				document.querySelector(".play_cursor").classList.add("is-active");
				document.querySelector(".pause_cursor").classList.remove("is-active");
			} else {
				element.play();
				document.querySelector(".play_cursor").classList.remove("is-active");
				document.querySelector(".pause_cursor").classList.add("is-active");
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
	html.style.setProperty("--vw", window.innerWidth * 0.01 + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	
	windowSize = window.innerWidth;
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=


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

	let progress, interval;
	
	video.addEventListener("play", () => {
		if(!video.muted) {
			block.classList.add("is-playing");
			interval = setInterval(() => {
				progress = video.currentTime / video.duration * 100;
				if(progress) block.style.setProperty("--progress", progress)
			},50)
		}
	})
	
	video.addEventListener("pause", () => {
		if(!video.muted) {
			block.classList.remove("is-playing");
			clearInterval(interval)
		}
	})

	setInterval(() => {
		time.forEach(time => time.textContent = formatTime(video.currentTime));
	},1000)

	
})

// =-=-=-=-=-=-=-=-=-=-=-=- </video> -=-=-=-=-=-=-=-=-=-=-=-=

document.addEventListener('keydown', function (event) {
    // Отключение масштабирования с помощью Cmd (⌘) и плюс (+)
    if ((event.metaKey || event.ctrlKey) && event.key === '+' || event.key === '=') {
        event.preventDefault();
    }
    // Отключение масштабирования с помощью Cmd (⌘) и минус (-)
    if ((event.metaKey || event.ctrlKey) && event.key === '-') {
        event.preventDefault();
    }
    // Отключение сброса масштабирования с помощью Cmd (⌘) и 0
    if ((event.metaKey || event.ctrlKey) && event.key === '0') {
        event.preventDefault();
    }
});

startAnimation({
	header, menu
});


form();
