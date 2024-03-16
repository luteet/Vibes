/* import changeTheme from "./change-theme.js";
import sectionCases from "./section-cases.js" */
import customMouse from "./mouse.js?v=2"
import scrollAnimation from "./scroll-animation.js?v=3"

export default function startAnimation(params) {

	(function (C, A, L) {
		let p = function (a, ar) {
		a.q.push(ar);
		};
		let d = C.document;
		C.Cal =
		C.Cal ||
		function () {
			let cal = C.Cal;
			let ar = arguments;
			if (!cal.loaded) {
			cal.ns = {};
			cal.q = cal.q || [];
			d.head.appendChild(d.createElement("script")).src = A;
			cal.loaded = true;
			}
			if (ar[0] === L) {
			const api = function () {
				p(api, arguments);
			};
			const namespace = ar[1];
			api.q = api.q || [];
			typeof namespace === "string"
				? (cal.ns[namespace] = api) && p(api, ar)
				: p(cal, ar);
			return;
			}
			p(cal, ar);
		};
	})(window, "https://app.cal.com/embed/embed.js", "init");
	Cal("init", { origin: "https://app.cal.com" });

	Cal("inline", {
		elementOrSelector: "#feedback-form",
		calLink: "rick/get-rick-rolled"
	});

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

	const 
	html = document.querySelector("html"),
	decorElement = document.querySelectorAll(".hero__decor_element"),
	heroTitle = document.querySelector(".hero__title"),
	heroMobTitle = document.querySelector(".hero__mob_title"),
	heroText = document.querySelector(".hero__text"),
	loader = document.querySelector(".loader");

	html.style.setProperty("--load-padding", window.innerWidth - document.body.offsetWidth + "px");
	
	history.scrollRestoration = "manual";

	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.config({ ignoreMobileResize: true })
	
	
	const initTimeline = gsap.timeline({
		duration: 2,
		ease: "power2.inOut",
	});

	initTimeline.pause();

	let mm = gsap.matchMedia();
	mm.add("(min-width: 992px)", () => {

		history.scrollRestoration = "manual";

		const bodyWrapper = document.querySelector(".body_wrapper");
		//bodyWrapper.scroll({left: 0, top: 0});

		new SimpleBar(bodyWrapper, {autoHide: false});

		const bodyContentWrapper = document.querySelector(".simplebar-content-wrapper");
		bodyContentWrapper.scrollTop = 0;
		bodyContentWrapper.style.overflow = "hidden";
	
		let lenis;

		setTimeout(() => {
			/* bodyContentWrapper.scrollTop = 0;
			bodyContentWrapper.style.overflow = "hidden scroll"; */
			lenis = new Lenis({
				wrapper: document.querySelector(".simplebar-content-wrapper"),
				content: document.querySelector(".simplebar-content")
			})
	
			//lenis.stop();
		},500)
	
		document.querySelectorAll('.split-lines').forEach(splitText => {
			let typeSplit = new SplitType(splitText, {
				types: "lines",
			});
		})
	
		/* gsap.set(loader, {
			left: "50%",
		}) */
	
		gsap.set(heroTitle, {
			"--x-1": "120%",
			"--x-2": "-120%",
			"--x-3": "120%",
		})
	
		gsap.set(decorElement[0], {
			"--y": "-150%",
			"--x": "108%",
		})
	
		gsap.set(decorElement[1], {
			"--y": "150%",
			"--x": "-80%",
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
			left: "77vw",
	
			duration: 2,
			ease: "power2.inOut",
			onStart: () => {
				params.header.classList.add("is-loaded")
				
			}
		}, "-=1")
	
		initTimeline.to(decorElement[0], {
			"--y": "0%",
			"--x": "38%",
			
			duration: 2,
			ease: "power2.inOut",
		}, "-=2.5")
	
		initTimeline.to(decorElement[1], {
			"--y": "11%",
			"--x": "-47%",
			
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
						wrapper: document.querySelector(".simplebar-content-wrapper"),
						content: document.querySelector(".simplebar-content")
					})
				
					function raf(time) {
						lenis.raf(time)
						requestAnimationFrame(raf)
					}
			
					requestAnimationFrame(raf)
					//lenis.destroy();
					/* lenis = new Lenis({
						wrapper: document.querySelector("#root"),
						container: document.querySelector("#root")
					}); */

					/* let subLenis = new Lenis({
						wrapper: document.querySelector("#feedback-form"),
						container: document.querySelector("#feedback-form")
					}); */
				
					//requestAnimationFrame(raf)
				
					lenis.on('scroll', (event) => {
						ScrollTrigger.update();
					})

					
				
					/* gsap.ticker.add((time)=>{
						lenis.raf(time * 1000)
					})
				
					gsap.ticker.lagSmoothing(0); */
	
					document.body.classList.add("is-loaded");
					html.style.setProperty("--load-padding", 0 + "px");
	
					document.querySelectorAll(".prototypes__container").forEach(container => {

						const simplebar = new SimpleBar(container, {autoHide: false}),
						inner = container.querySelector(".prototypes__container_inner");

						const scroller = container.querySelector(".simplebar-content-wrapper");
	
						let containerLenis = new Lenis({
							wrapper: scroller,//container.closest(".popup"),
							content: scroller,
						})

						const navList = container.querySelector(".prototypes__nav_list");
						inner.style.setProperty("--video-y", navList.getBoundingClientRect().bottom + "px");

						containerLenis.on("scroll", function(event) {
							inner.style.setProperty("--video-y", navList.getBoundingClientRect().bottom + "px");
						})
	
						const blocks = container.querySelectorAll(".prototypes__block"),
						navLinks = container.querySelectorAll(".prototypes__nav_list a");
	
						navLinks.forEach(link => {
							link.addEventListener("click", (event) => {
								event.preventDefault();
	
								containerLenis.scrollTo(container.querySelector(link.getAttribute("href")));
							})
						})

						/* blocks.forEach((block, index) => {
							ScrollTrigger.create({
								trigger: block,
								start: "top top",
								end: "bottom top",
								markers: true,
								scroller: scroller,
								onUpdate: (self) => {
									console.log(self)
								}
							})
						}) */
	
						containerLenis.on("scroll", (event) => {
	
							blocks.forEach((block, index) => {

								/* if(index == 0) console.log(block.getBoundingClientRect().top);
								if(block.getBoundingClientRect().top >= 0 && !block.classList.contains("is-active")) {

								} */
								
								if(window.innerHeight - block.getBoundingClientRect().bottom >= 0 && !block.classList.contains("is-active")) {
									block.classList.add("is-active");
									navLinks.forEach(button => button.classList.remove("is-active"));
									navLinks[index].classList.add("is-active");

								} else if(window.innerHeight - block.getBoundingClientRect().bottom < 0 && block.classList.contains("is-active")) {
									block.classList.remove("is-active");
									navLinks[index].classList.remove("is-active");
									navLinks[Math.max(0, index-1)].classList.add("is-active");
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

							const y = document.querySelector(link.getAttribute("href")).offsetTop;//getCoords(document.querySelector(link.getAttribute("href"))).top;
							if(link.getAttribute("href") == "#cases-section") {
								//lenis.scrollTo(y-window.innerHeight/2);
								lenis.scrollTo(y+window.innerHeight*1.8);
							} else {
								lenis.scrollTo(y);
							}
							
						})
					})
	
					scrollAnimation();
					customMouse();
	
				}, 0)

			}

		}, "-=3")

		const loaderTimeline = gsap.timeline();
		loaderTimeline.pause();

		gsap.set(loader, {
			"--background-1": "270deg",
			"--background-2": "90deg",
			"--opacity": "0",
		})
	
		window.addEventListener("load", () => {
	
			history.scrollRestoration = "manual";
			document.body.classList.add("is-init");
	
			
			/* loaderTimeline.to(loader, {
				"--background-1": "120deg",
				ease: "linear",
				duration: 1,
				onComplete: () => {
					gsap.set(loader, {
						"--opacity": "1",
					})
				}
			}) */
	
			loaderTimeline.to(loader, {
				"--background-1": "90deg",
				ease: "none",
				duration: 1.5,
				//delay: 0.2,
			})
	
			//loaderTimeline.resume();
			loaderTimeline.to(loader, {
				"--background-2": "-90deg",
				duration: 1,
				ease: "none",
				onStart: () => {
					setTimeout(() => {
						gsap.set(loader, {
							"--opacity": "1",
						})
					},0)
				},
				onComplete: () => {
					initTimeline.resume();
				}
			},"-=0.6")

			loaderTimeline.resume();
			/* setTimeout(() => {
				loaderTimeline.resume()
			},500) */
	
			gsap.fromTo(params.header, {

				"--y": "-100%",
		
				duration: 2,
				delay: 2,
				ease: "power2.inOut",
	
			}, {
				"--y": "0%",
		
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
			left: "50%", top: "50%",
		})
	
		gsap.set(decorElement[0], {
			"--y": "-150%",
			"--x": "105%",
		})
	
		gsap.set(decorElement[1], {
			"--y": "100%",
			"--x": "-100%",
		})
	
		initTimeline.to(loader, {
			left: "50%", top: `${getCoords(heroMobTitle).top - loader.offsetHeight}px`,
	
			duration: 2,
			//ease: "power3.out",

			onStart: () => params.header.classList.add("is-loaded"),

		})

		function vh(value) {
			return window.innerHeight*0.01 * value;
		}
	
		initTimeline.to(decorElement[0], {

			"--y": `${vh(10)}px`,
			"--x": "12vw",
			
			duration: 2,
			ease: "power2.inOut",

		}, "-=1")
	
		initTimeline.to(decorElement[1], {

			"--y": "-5px",
			"--x": "-20%",
			
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
								window.scrollTo({left:0,top:y-40,behavior:"smooth"});
							} else {
								window.scrollTo({left:0,top:y-40,behavior:"smooth"});
							}
							
						})
					})
	
					scrollAnimation({loader});
					//customMouse();
	
				}, 0)
				
			}
		}, "-=3")
		
		const loaderTimeline = gsap.timeline();
		loaderTimeline.pause();

		gsap.set(loader, {
			"--background-1": "270deg",
			"--background-2": "90deg",
			"--opacity": "0",
		})
	
		window.addEventListener("load", () => {
	
			history.scrollRestoration = "manual";
			document.body.classList.add("is-init");

			loaderTimeline.to(loader, {
				"--background-1": "120deg",
				ease: "linear",
				duration: 1,
				delay: 0.5,
			})
	
			//loaderTimeline.resume();
			loaderTimeline.to(loader, {
				"--background-2": "-90deg",
				duration: 1,
				ease: "linear",
				onStart: () => {
					gsap.set(loader, {
						"--opacity": "1",
					})
				},
				onComplete: () => {
					setTimeout(() => initTimeline.resume(), 1000)
				}
			},"-=0.3")

			loaderTimeline.resume();

			gsap.fromTo(params.header, {

				"--y": "-100%",
		
				duration: 2,
				delay: 2,
				ease: "power2.inOut",
	
			}, {
				"--y": "0%",
		
				duration: 2,
				delay: 2,
				ease: "power2.inOut",
			})

			
			
		})

		window.addEventListener("orientationchange", () => {
			//console.log("event")
			setTimeout(() => loader.style.top = `${getCoords(heroMobTitle).top - loader.offsetHeight}px`,500)
		})

		
	})
	
}