export default function Popup(arg) {

	let body = document.querySelector('body'),
		html = document.querySelector('html'),
		saveID = (typeof arg == 'object') ? (arg['saveID']) ? true : false : false,
		popupCheck = true,
		popupCheckClose = true;

	const removeHash = function () {
		let uri = window.location.toString();
		if (uri.indexOf("#") > 0) {
			let clean_uri = uri.substring(0, uri.indexOf("#"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	const open = function (id, initStart) {

		if (popupCheck) {
			popupCheck = false;

			let popup = document.querySelector(id);

			if (popup) {

				if(popup.classList.contains('popup')) {

					popup.style.display = 'flex';
					const activePopups = document.querySelectorAll('.popup.is-active');
					
					//body.classList.remove('is-popup-active');
					if(activePopups.length <= 0) html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
					body.classList.add('is-popup-active');

					if (saveID) history.pushState('', "", id);

					setTimeout(() => {
						if (!initStart) {
							popup.classList.add('is-active');
							setTimeout(() => {
								if(popup.classList.contains("prototypes")) {
									const navList = popup.querySelectorAll(".prototypes__nav_list");
									navList.forEach(navList => {
										navList.closest(".prototypes__container_inner").style.setProperty("--video-y", navList.getBoundingClientRect().bottom + "px");
									})
								}
							},200)
							setTimeout(() => popupCheck = true, 1000)
						} else {
							popup.classList.add('is-transition-none');
							popup.classList.add('is-active');
							popupCheck = true;
						}

					}, 0)
				}

			} else {
				return new Error(`Not found "${id}"`)
			}
		} else setTimeout(() => popupCheck = true, 1100);
	}

	const close = function (popupClose) {

		if (popupCheckClose) {
			popupCheckClose = false;

			let popup
			if (typeof popupClose === 'string') {
				popup = document.querySelector(popupClose)
			} else {
				popup = popupClose.closest('.popup');
			}

			if (popup.classList.contains('is-transition-none')) popup.classList.remove('is-transition-none')

			setTimeout(() => {

				popup.classList.remove('is-active');

				function closeFunc() {
					const activePopups = document.querySelectorAll('.popup.is-active');

					if (activePopups.length < 1 && !popup.classList.contains("open-popup")) {
						body.classList.remove('is-popup-active');
						html.style.setProperty('--popup-padding', '0px');
					}

					if (saveID) {
						removeHash();
						if (activePopups[activePopups.length - 1]) {
							history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
						}
					}

					popupCheckClose = true;
					popup.style.display = 'none';
				}

				setTimeout(closeFunc, 1000)

			}, 0)

		}

	}

	return {

		open: function (id) {
			open(id);
		},

		close: function (popupClose) {
			close(popupClose)
		},

		init: function () {

			let sliderArray = [];
			document.querySelectorAll('.prototypes__slider').forEach(sliderElement => {

				const slider = new Splide(sliderElement, {
			
					type: "fade",
					perPage: 1,
					speed: 700,
					easing: "ease",
					pagination: false,
			
				});
			
				const title = sliderElement.querySelector(".prototypes__title"),
				titleElements = title.querySelectorAll(".prototypes__title_slide"),
				count = sliderElement.querySelector(".prototypes__count"),
				lengthSlides = (sliderElement.querySelectorAll(".splide__slide").length >= 10) ? sliderElement.querySelectorAll(".splide__slide").length : `0${sliderElement.querySelectorAll(".splide__slide").length}`;
			
				slider.on("move", () => {
			
					titleElements.forEach(titleElement => {
						titleElement.classList.remove("is-active");
					})
			
					titleElements[slider.index].classList.add("is-active")
			
					const currentIndex = (slider.index+1 >= 10) ? slider.index+1 : `0${slider.index+1}`;
					
					count.textContent = `${currentIndex}/${lengthSlides}`;
			
				})
			
				slider.mount();

				sliderArray.push(slider);
			
			})

			let thisTarget
			body.addEventListener('click', function (event) {

				thisTarget = event.target;

				let popupOpen = thisTarget.closest('.open-popup');
				if (popupOpen) {
					event.preventDefault();
					if(popupOpen.dataset.prototypeIndex) {
						sliderArray.map(slider => {
							slider.go(Number(popupOpen.dataset.prototypeIndex)-1);
						})
					}
					open(popupOpen.getAttribute('href'))
				}

				let popupClose = thisTarget.closest('.popup-close');
				if (popupClose) {
					close(popupClose)
				}

				const prototypesContainer = thisTarget.closest('.prototypes__container');
				if(prototypesContainer && window.innerWidth >= 992) {
					if(!thisTarget.closest("a") && !thisTarget.closest(".button") && !thisTarget.closest(".video_block")) {
						close(prototypesContainer)
					}
				}

			});

			body.addEventListener('keyup', function (event) {

				if(event.key == "Escape" && document.querySelector('.popup.is-active')) {
					close(document.querySelector('.popup.is-active'));
				}

			});

			window.addEventListener('popstate', function(event) {
				event.preventDefault()

				let currentHash = window.location.hash;
				if (currentHash === '' && document.body.classList.contains("is-popup-active")) {
					close(document.querySelector(".popup.is-active"));
				} else if(currentHash !== '' && !document.body.classList.contains("is-popup-active")) {
					open(currentHash, false, false);
				}
			});

			if (saveID) {
				let url = new URL(window.location);
				if (url.hash) {
					open(url.hash, true);
				}
			}
		},

	}
}