/* import changeTheme from "./change-theme.js";
import sectionCases from "./section-cases.js" */
import customMouse from "./mouse.js"
import scrollAnimation from "./scroll-animation.js"

export default function startAnimation(params) {

	gsap.set(document.querySelector("html"), {
		'--background-color': "rgb(3,3,4)",
		'--theme-color-1': 'rgb(245,248,255)',
		'--theme-color-1-reverse': 'rgb(3,3,4)',
		"--theme-switch": 0,
	})
	
	//const header = document.querySelector(".header");
	
	function getCoords(elem) {
		let box = elem.getBoundingClientRect();
	
		return {
			top: box.top + window.scrollY,
			right: box.right + window.scrollX,
			bottom: box.bottom + window.scrollY,
			left: box.left + window.scrollX
		};
	}

	const decorElement = document.querySelectorAll(".hero__decor_element"),
	heroTitle = document.querySelector(".hero__title"),
	heroMobTitle = document.querySelector(".hero__mob_title"),
	heroText = document.querySelector(".hero__text"),
	loader = document.querySelector(".loader");
	
	history.scrollRestoration = "manual";

	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.config({ ignoreMobileResize: true})
	
	const initTimeline = gsap.timeline({
		duration: 2,
		ease: "power2.inOut",
	});

	initTimeline.pause();

	let mm = gsap.matchMedia();
	mm.add("(min-width: 992px)", () => {

		let lenis = new Lenis({
			wrapper: window,
			container: document.body
		})
	
		function raf(time) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}
	
		lenis.stop();
	
		document.querySelectorAll('.split-lines').forEach(splitText => {
			let typeSplit = new SplitType(splitText, {
				types: "lines",
			});
		})
	
		gsap.set(loader, {
			right: "50%",
		})
	
		gsap.set(heroTitle, {
			"--x-1": "120%",
			"--x-2": "-120%",
			"--x-3": "120%",
		})
	
		gsap.set(decorElement[0], {
			"--y": "-150%",
			"--x": "45%",
		})
	
		gsap.set(decorElement[1], {
			"--y": "150%",
			"--x": "-40%",
		})
	
		gsap.set(heroText, {
			"--x": "200%",
		})

		

		/* loaderTimeline.to(loader, {
			"--background-2": "90deg",
			duration: 3,
		}) */

		/* loaderTimeline.to(loader, {
			"--background-1": "90deg",
			duration: 1,
		}) */

		
	
		initTimeline.to(loader, {
			right: "25%",
	
			duration: 2,
			ease: "power2.inOut",
			onStart: () => params.header.classList.add("is-loaded")
		}, "-=1")
	
		initTimeline.to(decorElement[0], {
			"--y": "0%",
			
			duration: 2,
			ease: "power2.inOut",
		}, "-=2.5")
	
		initTimeline.to(decorElement[1], {
			"--y": "25%",
			
			duration: 2,
			ease: "power2.inOut",
		}, "-=2.5")
	
		initTimeline.to(heroTitle, {
			"--x-1": "0%",
			"--x-2": "0%",
			"--x-3": "0%",
			
			duration: 3,
			ease: "power3.inOut",
		}, "-=2.5")
	
		initTimeline.to(heroText, {
			"--x": "0%",
			
			duration: 3,
			ease: "power3.inOut",
			
			onComplete: () => {
	
				setTimeout(() => {
	
					lenis.destroy();
					lenis = new Lenis({
						wrapper: window,
						container: document.body
					});
				
					requestAnimationFrame(raf)
				
					lenis.on('scroll', (event) => {
						ScrollTrigger.update();
					})

					
				
					/* gsap.ticker.add((time)=>{
						lenis.raf(time * 1000)
					})
				
					gsap.ticker.lagSmoothing(0); */
	
					document.body.classList.add("is-loaded");
	
					document.querySelectorAll(".prototypes__container").forEach(container => {
	
						let containerLenis = new Lenis({
							wrapper: container,//container.closest(".popup"),
							content: container,
						})
	
						const blocks = container.querySelectorAll(".prototypes__block"),
						navLinks = container.querySelectorAll(".prototypes__nav_list a");
	
						navLinks.forEach(link => {
							link.addEventListener("click", (event) => {
								event.preventDefault();
	
								containerLenis.scrollTo(container.querySelector(link.getAttribute("href")));
							})
						})
	
						containerLenis.on("scroll", (event) => {
	
							blocks.forEach((block, index) => {
						
								if(block.getBoundingClientRect().top > 0 && block.getBoundingClientRect().top < window.innerHeight / 4 && !navLinks[index].classList.contains("is-active")) {
									blocks.forEach(block => block.classList.remove("is-active"))
									block.classList.add("is-active");
									navLinks.forEach(button => button.classList.remove("is-active"));
									navLinks[index].classList.add("is-active");
								}
					
							})
							
						})
	
						function raf2(time) {
							containerLenis.raf(time)
							requestAnimationFrame(raf2)
						}
	
						requestAnimationFrame(raf2)
	
					})
	
					document.querySelectorAll(".header__nav_list a").forEach(link => {
						link.addEventListener("click", (event) => {
							event.preventDefault();

							const y = getCoords(document.querySelector(link.getAttribute("href"))).top;
							if(link.getAttribute("href") == "#cases-section") {
								lenis.scrollTo(y-window.innerHeight/2);
							} else {
								lenis.scrollTo(y);
							}
							
						})
					})
	
					scrollAnimation({lenis});
					customMouse();
	
				}, 0)
	
				
			}

		}, "-=3")

		const loaderTimeline = gsap.timeline();
		loaderTimeline.pause();

		gsap.set(loader, {
			"--background-1": "235deg",
			"--background-2": "270deg",
			"--opacity": "0",
		})

		loaderTimeline.to(loader, {
			"--background-1": "90deg",
			duration: 1,
			onComplete: () => {
				gsap.set(loader, {
					"--opacity": "1",
				})

				loaderTimeline.pause();
			}
		})

		loaderTimeline.resume();
	
		window.addEventListener("load", () => {
	
			history.scrollRestoration = "manual";
			document.body.classList.add("is-init");
	
			loaderTimeline.to(loader, {
				"--background-2": "465deg",
				duration: 1,
				onComplete: () => {
					initTimeline.resume();
				}
			})

			setTimeout(() => {
				loaderTimeline.resume()
			},1200)
	
			gsap.to(params.header, {

				transform: "translate3d(0,0,0)",
		
				duration: 2,
				delay: 2,
				ease: "power2.inOut",
	
			})
			
			
		})
	})

	mm.add("(max-width: 991px)", () => {
	
		const initTimeline = gsap.timeline({
			defaults: {
				duration: 2,
				ease: "power2.inOut",
			}
		});
	
		initTimeline.pause();
	
		//document.body.style.overflow = "hidden";
		/* document.querySelectorAll('.split-lines').forEach(splitText => {
			let typeSplit = new SplitType(splitText, {
				types: "lines",
			});
		}) */

		gsap.set(document.body, {
			overflow: "hidden",
		})
	
		gsap.set(loader, {
			right: "50%", top: "50%",
		})
	
		gsap.set(decorElement[0], {
			"--y": "-150%",
			"--x": "-105%",
		})
	
		gsap.set(decorElement[1], {
			"--y": "100%",
			"--x": "100%",
		})
	
		initTimeline.to(loader, {
			right: "50%", top: `${getCoords(heroMobTitle).top - loader.offsetHeight}px`,
	
			duration: 2,
			//ease: "power3.out",

			onStart: () => params.header.classList.add("is-loaded"),

		})

		function vh(value) {
			return window.innerHeight*0.01 * value;
		}
	
		initTimeline.to(decorElement[0], {

			"--y": `${vh(10)}px`,
			"--x": "5vw",
			
			duration: 2,
			ease: "power2.inOut",

		}, "-=1")
	
		initTimeline.to(decorElement[1], {

			"--y": "0vh",
			"--x": "0vw",
			
			duration: 2,
			ease: "power2.inOut",

		}, "-=2")
	
		initTimeline.to(heroMobTitle, {
			opacity: 1,
			
			duration: 3,
			ease: "power3.inOut",

		}, "-=2.5")
	
		initTimeline.to(heroText, {
			opacity: 1,
			
			duration: 3,
			ease: "power3.inOut",
			
			onComplete: () => {
	
				setTimeout(() => {
	
					document.body.classList.add("is-loaded");
					document.body.style.removeProperty("overflow");
	
					document.querySelectorAll(".header__nav_list a").forEach(link => {
						link.addEventListener("click", (event) => {
							event.preventDefault();

							params.menu.forEach(element => {
								element.classList.remove('is-mobile-menu-active')
							})

							const y = getCoords(document.querySelector(link.getAttribute("href"))).top;
							if(link.getAttribute("href") == "#cases-section") {
								window.scrollTo({left:0,top:y-window.innerHeight/2,behavior:"smooth"});
							} else {
								window.scrollTo({left:0,top:y,behavior:"smooth"});
							}
							
						})
					})
	
					scrollAnimation();
					//customMouse();
	
				}, 0)
				
			}
		}, "-=3")
		
		const loaderTimeline = gsap.timeline();
		loaderTimeline.pause();

		gsap.set(loader, {
			"--background-1": "235deg",
			"--background-2": "270deg",
			"--opacity": "0",
		})

		loaderTimeline.to(loader, {
			"--background-1": "90deg",
			duration: 1,
			onComplete: () => {
				gsap.set(loader, {
					"--opacity": "1",
				})

				loaderTimeline.pause();
			}
		})

		loaderTimeline.resume();
	
		window.addEventListener("load", () => {
	
			//history.scrollRestoration = "manual";
			document.body.classList.add("is-init");

			loaderTimeline.to(loader, {
				"--background-2": "465deg",
				duration: 1,
				onComplete: () => {
					initTimeline.resume();
				}
			})

			setTimeout(() => {
				loaderTimeline.resume()
			},1200)

			gsap.to(params.header, {

				transform: "translate3d(0,0,0)",
		
				duration: 2,
				delay: 2,
				ease: "power2.inOut",

			})
			
		})
	})
	
	
	
}