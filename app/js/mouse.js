export default function customMouse() {

	const customCursor = document.querySelector(".custom_cursor"),
	playCursor = document.querySelector(".play_cursor"),
	pauseCursor = document.querySelector(".pause_cursor");
	//customCursor.style.display = "flex";
	
	const getDeviceType = () => {
	
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			return "tablet";
		}
	
		if (
			/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
			ua
			)
		) {
			return "mobile";
		}
		return "desktop";
	
	};

	const device = getDeviceType();
	
	let xCTo = gsap.quickTo(".custom_cursor, .play_cursor, .pause_cursor", "left", {
		duration: 0.2,
		ease: "power3"
	});

	let yCTo = gsap.quickTo(".custom_cursor, .play_cursor, .pause_cursor", "top", {
		duration: 0.2,
		ease: "power3"
	});

	function mouseMove(event) {
		/* if (!isVisible) {
			gsap.set(".cursor-outline, .cursor-dot", { opacity: 1 });
			isVisible = true;
		} */
		
		if(getDeviceType() == "desktop") {

			const cursorPosition = {
				left: event.clientX,
				top: event.clientY
			};
			
			xCTo(cursorPosition.left);
			yCTo(cursorPosition.top);
		}
	}

	document.addEventListener("mousemove", mouseMove);

	document.querySelectorAll(".is-active-mouse").forEach(activeMouseElement => {
		activeMouseElement.addEventListener("mouseenter", () => {
			if(device == "desktop") customCursor.classList.add("is-active")
		})

		activeMouseElement.addEventListener("mouseleave", () => {
			if(device == "desktop") customCursor.classList.remove("is-active")
		})
	})

	document.querySelectorAll(".button, .feedback__check label, .is-min-active-mouse, .magnetic_button, .feedback__file_remove, .header__nav_list a").forEach(activeMouseElement => {
		activeMouseElement.addEventListener("mouseenter", () => {
			if(device == "desktop") {
				if(activeMouseElement.classList.contains("is-min-cursor")) {
					customCursor.classList.add("on-min-button")
				} else {
					customCursor.classList.add("on-button")
				}
			}
		})

		activeMouseElement.addEventListener("mouseleave", () => {
			if(device == "desktop") {
				customCursor.classList.remove("on-button")
				customCursor.classList.remove("on-min-button")
			}
		})
	})

	document.querySelectorAll(".prototypes__wrapper").forEach(activeMouseElement => {
		activeMouseElement.addEventListener("mouseenter", () => {
			if(device == "desktop") customCursor.classList.add("is-close-mode")
		})

		activeMouseElement.addEventListener("mouseleave", () => {
			if(device == "desktop") customCursor.classList.remove("is-close-mode")
		})
	})

	document.querySelectorAll("#feedback-form").forEach(block => {
		block.addEventListener("mouseenter", () => {
			if(device == "desktop") {
				customCursor.classList.add("is-hidden");
			}
		})

		block.addEventListener("mouseleave", () => {
			if(device == "desktop") {
				customCursor.classList.remove("is-hidden");
			}
		})
	})

	document.querySelectorAll(".video_block").forEach(activeMouseElement => {
		activeMouseElement.addEventListener("mouseenter", () => {
			if(device == "desktop") {
				customCursor.classList.add("is-hidden");
				if(!activeMouseElement.classList.contains("is-playing")) {
					playCursor.classList.add("is-active")
				} else {
					pauseCursor.classList.add("is-active")
				}
			}
		})

		activeMouseElement.addEventListener("mouseleave", () => {
			if(device == "desktop") {
				customCursor.classList.remove("is-hidden");
				playCursor.classList.remove("is-active")
				pauseCursor.classList.remove("is-active")
			}
		})
	})

	function magneticButtons() {

		document.querySelectorAll(".magnetic_button, .header__nav_list a").forEach(button => {

			let xTo = gsap.utils.pipe(
				gsap.utils.clamp(-20, 20),
				gsap.utils.snap(5),
				gsap.quickTo(button, "x", {duration: 1, ease: "elastic.out(1, 0.5)"})
			);

			let yTo = gsap.utils.pipe(
				gsap.utils.clamp(-20, 20),
				gsap.utils.snap(5),
				gsap.quickTo(button, "y", {duration: 1, ease: "elastic.out(1, 0.5)"})
			);

			const mouseMove = (event) => {
				if(device == "desktop") {
					const { clientX, clientY } = event;
					const {height, width, left, top} = button.getBoundingClientRect();
					const x = clientX - (left + width/2)
					const y = clientY - (top + height/2)
					xTo(x);
					yTo(y)
				}
			}

			const mouseLeave = (e) => {
				if(device == "desktop") {
					gsap.to(button, {x: 0, duration: 0.5})
					gsap.to(button, {y: 0, duration: 0.5})
					xTo(0)
					yTo(0)
				}
			}

			button.addEventListener("mousemove", mouseMove)
			button.addEventListener("mouseleave", mouseLeave)
		})
		
	}

	magneticButtons();
	  
}