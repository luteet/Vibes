
export default function scrollAnimation(params) {

	function vh(value) {
		return window.innerHeight*0.01 * value;
	}
	
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
	header = document.querySelector(".header"),
	hero = document.querySelector(".hero"),
	heroTitle = document.querySelector(".hero__title"),
	heroMobTitle = document.querySelector(".hero__mob_title"),
	heroText = document.querySelector(".hero__text"),
	loader = document.querySelector(".loader");

	const cases = document.querySelector(".cases"), 
	casesInner = document.querySelector(".cases__inner");

	const scrollBlock = document.querySelector(".simplebar-content-wrapper");

	let mm = gsap.matchMedia();

	mm.add("(min-width: 992px)", () => {

		let heroScrollTimeline = gsap.timeline(),
		casesScrollTimeline = gsap.timeline(),
		animTitleScrollTimeline = gsap.timeline(),
		servicesScrollTimeline = gsap.timeline(),
		pillScrollTimeline = gsap.timeline(),
		feedbackScrollTimeline = gsap.timeline();

		gsap.set(".header", {
			"--y": "0%",
		})

		const showAnim = gsap.from('.header', { 
			"--y": "-100%",
			paused: true,
			duration: 0.1
		}).progress(1);

		function resize() {
			if(window.innerWidth >= 992) {

				ScrollTrigger.killAll();
				gsap.set(".header", {
					transform: "translate3d(0,0,0)",
				})
				
				ScrollTrigger.create({
					start: "top top",
					end: "max",
					scroller: scrollBlock,
					onUpdate: (self) => {
						self.direction === -1 ? showAnim.play() : showAnim.reverse()
						self.progress == 0 ? header.classList.add("on-top") : header.classList.remove("on-top")
					}
				});
		
				heroScrollTimeline.kill();

				heroScrollTimeline = gsap.timeline();
				heroScrollTimeline.pause();

				let heroSectionProgressCheck = true;
		
				ScrollTrigger.create({

					trigger: "#hero-scene",
					start: "top top",
					end: `+=${window.innerHeight*2} top`,
					scrub: true,
					pin: true,
					pinSpacer: false,
					pinSpacing: false,
					animation: heroScrollTimeline,
					//markers: true,
					scroller: scrollBlock,
		
					onUpdate: (self) => {
						
						if(heroSectionProgressCheck && self.progress >= 0.7) {
		
							heroSectionProgressCheck = false;
							document.body.classList.add("is-light")
							//document.body.classList.remove("is-light")
		
						} else if(!heroSectionProgressCheck && self.progress <= 0.65) {
		
							heroSectionProgressCheck = true;
							document.body.classList.remove("is-light")
		
						}
					}
				})	
				
				heroScrollTimeline.to([heroTitle, loader, heroText], {
					opacity: 0.1,
					duration: 2,
				})
				
				heroScrollTimeline.fromTo(decorElement[0], {
					"--y": "0%",
					"--x": "38%",
					"--scale": "1",
				}, {
					"--x": "80%",
					"--y": "50%",
					"--scale": "1.1",
					duration: 2,
				}, "-=1")
				
				heroScrollTimeline.fromTo(decorElement[1], {
					"--y": "11%",
					"--x": "-47%",
					"--scale": "1",
				}, {
					"--x": "-80%",
					"--y": "-30%",
					"--scale": "1.1",
					duration: 2,
				}, "-=2")
				
				heroScrollTimeline.to(decorElement[0], {
					"--x": "80%",
					"--y": "50%",
					"--scale": "1.1",
					duration: 1,
				})
				
				heroScrollTimeline.to(decorElement[1], {
					"--x": "-80%",
					"--y": "-30%",
					"--scale": "1.1",
					duration: 1,
				}, "-=1")
				
				heroScrollTimeline.to(decorElement[0], {
					"--x": "45%",
					"--y": "45%",
					"--scale": "6.5",
					//opacity: 0,
					duration: 3,
					ease: "power3.inOut",
				})
				
				heroScrollTimeline.to(decorElement[1], {
					"--x": "-80%",
					"--y": "30%",
					"--scale": "6.5",
					//opacity: 0,
					duration: 3,
					ease: "power3.inOut",
					
				}, "-=3")
			
				heroScrollTimeline.to([heroTitle, loader, heroText], {
					opacity: 0,
					duration: 3,
				}, "-=3")
			
				heroScrollTimeline.to([loader, hero], {
					visibility: "hidden",
					duration: 0,
					
				})
			
				heroScrollTimeline.fromTo(html, {
					
					'--background-color': "rgb(3,3,4)",
					'--theme-color-1': 'rgb(245,248,255)',
					'--theme-color-1-reverse': 'rgb(3,3,4)',
					'--theme-color-2': 'rgb(255,255,255)',
					'--theme-color-2-reverse': 'rgb(0,0,0)',
					duration: 3,
					ease: "power2.inOut",
				}, 
				{
					duration: 3,
					ease: "power3.inOut",
					'--background-color': "rgb(245,248,255)",
					'--theme-color-1': 'rgb(3,3,4)',
					'--theme-color-1-reverse': 'rgb(245,248,255)',
					'--theme-color-2': 'rgb(0,0,0)',
					'--theme-color-2-reverse': 'rgb(255,255,255)',
				},
				"-=4")
		
				ScrollTrigger.create({
					trigger: cases,
					start: "top top",
					scroller: scrollBlock,
				});
			
				casesScrollTimeline.kill();
				casesScrollTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: "#cases-scene",
						start: `center center`,
						end: `+=${casesInner.scrollWidth}`,
						scrub: true,
						pin: true,
						pinSpacing: true,
						scroller: scrollBlock,
					}
				});
			
				casesScrollTimeline.pause();
			
				casesScrollTimeline.fromTo(".cases__hero", {transform: "translate3d(0,100%,0) scale(0.5)"}, 
				{
					transform: "translate3d(0,0,0) scale(1)",
					duration: 2,
					ease: "power2.inOut",
					
				})
			
				casesScrollTimeline.to(".cases__inner", {
					transform: `translate3d(-${cases.scrollWidth - window.innerWidth}px,0,0)`,
					duration: 15,
					ease: "linear",
				})
			
				const 
				animTitle = document.querySelector(".anim_title"), 
				animTitleValue = document.querySelector(".anim_title__value"),
				animTitlelines = animTitleValue.querySelectorAll("div");
			
				animTitleScrollTimeline.kill();
				animTitleScrollTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: animTitle,
						start: `top bottom`,
						end: `bottom top`,
						scrub: true,
						scroller: scrollBlock,
					}
				});
			
				animTitleScrollTimeline.pause();
			
				animTitleScrollTimeline.to(animTitlelines[0], {
					transform: "translate3d(0,0,0)",
					duration: 2,
					ease: "power3.inOut",
				})
			
				animTitleScrollTimeline.to(animTitlelines[1], {
					transform: "translate3d(0,0,0)",
					duration: 2,
					ease: "power3.inOut",
				},"-=2")
			
				animTitleScrollTimeline.to(animTitlelines[0], {
					transform: "translate3d(100%,0,0)",
					duration: 2,
					ease: "power3.inOut",
				})
			
				animTitleScrollTimeline.to(animTitlelines[1], {
					transform: "translate3d(-100%,0,0)",
					duration: 2,
					ease: "power3.inOut",
				},"-=2")
			
				animTitleScrollTimeline.to(cases, {
					opacity: 0,
					visibility: "hidden",
					duration: 0,
				})

				servicesScrollTimeline.kill();
				servicesScrollTimeline = gsap.timeline({
					defaults: {
						ease: "linear",
					},
					scrollTrigger: {
						trigger: "#services-scene",
						start: "top top",
						end: `+=${window.innerHeight} top`,
						scrub: true,
						scroller: scrollBlock,
						//pin: true,
					}
				});
				
				servicesScrollTimeline.pause();
			
				const 
				ourExpertiseTitle = document.querySelector(".our_expertise__title"),
				ourExpertiseImages = document.querySelector(".our_expertise__images"),
				ourExpertiseImagesItems = ourExpertiseImages.querySelectorAll(".our_expertise__images_item"),
				ourExpertiseList = document.querySelector(".our_expertise__list"),
				ourExpertiseItems = ourExpertiseList.querySelectorAll(".our_expertise__item");
			
				servicesScrollTimeline.to(ourExpertiseTitle, {
					opacity: 0,
					duration: 2,
				})
		
				servicesScrollTimeline.to(ourExpertiseTitle, {
					opacity: 0,
					duration: 1,
				})
		
				ScrollTrigger.create({
					trigger: ".our_expertise__hero",
					start: "top top",
					end: `=+${window.innerHeight} top`,
					scrub: true,
					pin: true,
					pinSpacer: false,
					scroller: scrollBlock,
				})
		
				ScrollTrigger.create({
					trigger: ".our_expertise__images",
					start: "top top",
					end: `=+${ourExpertiseList.offsetHeight - window.innerHeight} top`,
					scrub: true,
					pin: true,
					pinSpacer: false,
					scroller: scrollBlock,
				})
		
				ourExpertiseItems.forEach((item, index) => {
					ScrollTrigger.create({
						trigger: item,
						start: "top center",
						end: `top center`,
						scroller: scrollBlock,
						onEnter: () => {
							ourExpertiseImagesItems.forEach((image, subIndex) => {
								image.classList.remove("is-active");
								
							})
							ourExpertiseImagesItems[index].classList.add("is-active");
						},
						onEnterBack: () => {
							ourExpertiseImagesItems.forEach((image, subIndex) => {
								//if(subIndex != index-1) image.classList.remove("is-active");
								image.classList.remove("is-active");
							})

							ourExpertiseImagesItems[Math.max(index-2, 0)].classList.remove("is-active");
							ourExpertiseImagesItems[Math.max(index-1, 0)].classList.add("is-active");
							
							
						},
					})
				})
			
				const 
				pillSection = document.querySelector(".pill"),
				pillSectionTitle = pillSection.querySelector(".pill__title"),
				pillSectionTitleLine1 = pillSection.querySelectorAll(".pill__title.visible-on-desktop > *")[0],
				pillSectionTitleLine2 = pillSection.querySelectorAll(".pill__title.visible-on-desktop > *")[1],
				pillSectionDecor = pillSection.querySelector(".pill__decor"),
				pillSectionDecorElements = pillSection.querySelectorAll(".pill__decor_item");
		
				ScrollTrigger.create({
					trigger: pillSection,
					start: "top top",
					scroller: scrollBlock,

					onEnter: () => {
						document.body.classList.remove("is-light")
					},
		
					onLeaveBack: () => {
						document.body.classList.add("is-light")
					},
				});
			
				pillScrollTimeline.kill();
				pillScrollTimeline = gsap.timeline({
					defaults: {
						ease: "power1.inOut",
					},
					scrollTrigger: {
						trigger: "#pill-scene",
						start: "top top",
						end: `${window.innerHeight*2} top`,
						scrub: true,
						pin: true,
						pinSpacing: false,
						scroller: scrollBlock,
					}
				});
				
				pillScrollTimeline.pause();
				
				gsap.set(pillSectionTitle, {
					transform: "rotate(0deg) scale(0.5)"
				})

				gsap.set(pillSectionDecorElements[0], {
					transform: "translate3d(-99.5%,-50%,0)",
				})

				gsap.set(pillSectionDecorElements[1], {
					transform: "translate3d(-0.5%,-50%,0)",
				})
			
				pillScrollTimeline.to(html, 
				{
					duration: 1,
					'--background-color': "rgb(3,3,4)",
					'--theme-color-1': 'rgb(245,248,255)',
					'--theme-color-1-reverse': 'rgb(3,3,4)',
					'--theme-color-2': 'rgb(255,255,255)',
					'--theme-color-2-reverse': 'rgb(0,0,0)',
				})
			
				pillScrollTimeline.to(pillSectionDecor, {
					transform: "scale(1) translate3d(0,0,0)",
					duration: 2,
				})
			
				pillScrollTimeline.to(pillSectionTitle, {
					visibility: "visible",
					duration: 1,
				})
			
				pillScrollTimeline.to(pillSectionDecor, {
					transform: "translate3d(0,0,0) rotate(-25deg)",
					duration: 2,
				},"-=1")
			
				pillScrollTimeline.to(pillSectionTitle, {
					transform: "translate3d(0,0,0) scale(0.5) rotate(-25deg)",
					duration: 1,
				},"-=2")
			
				pillScrollTimeline.to(pillSectionDecorElements[0], {
					transform: `translate3d(-${window.innerWidth}px, -50%, 0) rotate(-25deg)`,
					duration: 2,
				},"-=1")
			
				pillScrollTimeline.to(pillSectionDecorElements[1], {
					transform: `translate3d(${window.innerWidth}px, -50%, 0) rotate(25deg)`,
					duration: 2,
				},"-=2")
			
				pillScrollTimeline.to(pillSectionTitle, {
					transform: "translate3d(0,0,0) scale(1) rotate(0deg)",
					duration: 2,
				},"-=1")
				
				pillScrollTimeline.to(pillSectionTitle, {
					transform: "translate3d(0,0,0) scale(1) rotate(0deg)",
					duration: 0.2,
				})
		
				feedbackScrollTimeline.kill();
				feedbackScrollTimeline = gsap.timeline({
					defaults: {
						ease: "power1.inOut",
					},
					scrollTrigger: {
						trigger: ".feedback",
						start: `=-${window.innerHeight} top`,
						end: `top top`,
						scrub: true,
						scroller: scrollBlock,
					}
				});
				
				feedbackScrollTimeline.pause();
		
				feedbackScrollTimeline.to(pillSectionTitleLine1, {
					transform: `translate3d(-${window.innerWidth}px,0,0)`,
					duration: 2,
				})
			
				feedbackScrollTimeline.to(pillSectionTitleLine2, {
					transform: `translate3d(${window.innerWidth}px,0,0)`,
					duration: 2,
				},"-=2")
			
				/* gsap.set(html, {
					'--background-color': "rgb(3,3,4)",
					'--theme-color-1': 'rgb(245,248,255)',
					'--theme-color-1-reverse': 'rgb(3,3,4)',
				}) */
			}
		}

		resize();
		window.addEventListener("resize", resize);
	});

	mm.add("(max-width: 991px)", () => {

		gsap.set(".header", {
			"--y": "0%",
		})

		const showAnim = gsap.from('.header', { 
			"--y": "-100%",
			paused: true,
			//duration: 0.05
		}).progress(1);

		let prevWindowWidth = 0;

		let heroScrollTimeline = gsap.timeline(),
		animTitleScrollTimeline = gsap.timeline(),
		pillScrollTimeline = gsap.timeline();

		const heroScene = document.querySelector("#hero-scene");

		function resize() {
			if(prevWindowWidth != window.innerWidth && window.innerWidth <= 991) {
				prevWindowWidth = window.innerWidth;

				ScrollTrigger.killAll();
				gsap.set(params.loader, {
					left: "50%", top: `${getCoords(heroMobTitle).top - params.loader.offsetHeight}px`,
				})

				ScrollTrigger.create({
					start: "top top",
					end: "max",
					onUpdate: (self) => {
						self.direction === -1 ? showAnim.play() : showAnim.reverse()
						self.progress == 0 ? header.classList.add("on-top") : header.classList.remove("on-top")
					}
				});

				heroScrollTimeline.kill();
				heroScrollTimeline = gsap.timeline();
			
				heroScrollTimeline.pause();
				let heroSectionProgressCheck = true;

				ScrollTrigger.create({
					trigger: ".hero",
					start: "top top",
					end: `+=${window.innerHeight*2} top`,
					scrub: true,
					pin: true,
					pinSpacer: false,
					pinSpacing: false,
					animation: heroScrollTimeline,

					onUpdate: (self) => {
						
						if(heroSectionProgressCheck && self.progress >= 0.7) {

							heroSectionProgressCheck = false;
							document.body.classList.add("is-light")
							heroScene.style.pointerEvents = "none";

						} else if(!heroSectionProgressCheck && self.progress <= 0.6) {

							heroSectionProgressCheck = true;
							document.body.classList.remove("is-light")
							heroScene.style.removeProperty("pointer-events")

						}
					}
				})
				
				heroScrollTimeline.to([heroMobTitle, loader, heroText], {
					opacity: 0.2,
					duration: 2,
				})
				
				heroScrollTimeline.fromTo(decorElement[0], {
					"--y": `${vh(9.5)}px`,
					"--x": "2vw",
					"--scale": "1",
				}, {
					"--y": `${vh(30)}px`,
					"--x": "20vw",
					"--scale": "1.1",
					duration: 2,
				}, "-=1")
				
				heroScrollTimeline.fromTo(decorElement[1], {
					"--y": "-5px",
					"--x": "-1vw",
					"--scale": "1",
				}, {
					"--y": `-${vh(30)}px`,
					"--x": "-20vw",
					"--scale": "1.1",
					duration: 2,
				}, "-=2")
				
				heroScrollTimeline.to(decorElement[0], {
					"--y": `-${vh(10)}px`,
					"--x": "-10vw",
					"--scale": "6.5",
					//opacity: 0,
					duration: 3,
					ease: "power3.inOut",
				})
				
				heroScrollTimeline.to(decorElement[1], {
					"--y": `${vh(30)}px`,
					"--x": `0vw`,
					"--scale": "6.5",
					//opacity: 0,
					duration: 3,
					ease: "power3.inOut",
					
				}, "-=3")
			
				heroScrollTimeline.to([heroMobTitle, loader, heroText], {
					opacity: 0,
					duration: 3,
				}, "-=3")
			
				heroScrollTimeline.to([loader, hero], {
					visibility: "hidden",
					duration: 0,
					
				})
			
				heroScrollTimeline.fromTo(html, {
					
					'--background-color': "rgb(3,3,4)",
					'--theme-color-1': 'rgb(245,248,255)',
					'--theme-color-1-reverse': 'rgb(3,3,4)',
					'--theme-color-2': 'rgb(255,255,255)',
					'--theme-color-2-reverse': 'rgb(0,0,0)',
					duration: 3,
					ease: "power2.inOut",
				}, 
				{
					duration: 3,
					ease: "power3.inOut",
					'--background-color': "rgb(245,248,255)",
					'--theme-color-1': 'rgb(3,3,4)',
					'--theme-color-1-reverse': 'rgb(245,248,255)',
					'--theme-color-2': 'rgb(0,0,0)',
					'--theme-color-2-reverse': 'rgb(255,255,255)',
				},
				"-=4")

				ScrollTrigger.create({
					trigger: cases,
					start: "top top",
					onEnter: (self) => {
						//document.body.classList.add("is-light")
					},

					onLeaveBack: (self) => {
						//document.body.classList.remove("is-light")
					},
				});
			
				const 
				animTitle = document.querySelector(".anim_title"), 
				animTitleValue = document.querySelector(".anim_title__value"),
				animTitlelines = animTitleValue.querySelectorAll("div");
			
				animTitleScrollTimeline.kill();
				animTitleScrollTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: animTitle,
						start: `top bottom`,
						end: `bottom top`,
						scrub: true,
					}
				});
			
				animTitleScrollTimeline.pause();
			
				animTitleScrollTimeline.to(animTitlelines[0], {
					transform: "translate3d(0,0,0)",
					duration: 2,
					ease: "power3.inOut",
				})
			
				animTitleScrollTimeline.to(animTitlelines[1], {
					transform: "translate3d(0,0,0)",
					duration: 2,
					ease: "power3.inOut",
				},"-=2")
			
				animTitleScrollTimeline.to(animTitlelines[0], {
					transform: "translate3d(100%,0,0)",
					duration: 2,
					ease: "power3.inOut",
				})
			
				animTitleScrollTimeline.to(animTitlelines[1], {
					transform: "translate3d(-100%,0,0)",
					duration: 2,
					ease: "power3.inOut",
				},"-=2")
			
				const 
				pillSection = document.querySelector(".pill"),
				pillSectionTitle = pillSection.querySelectorAll(".pill__title"),
				pillSectionDecor = pillSection.querySelector(".pill__decor"),
				pillSectionDecorElements = pillSection.querySelectorAll(".pill__decor_item");

				ScrollTrigger.create({
					trigger: pillSection,
					start: "top top",
					onEnter: (self) => {
						document.body.classList.remove("is-light")
					},

					onLeaveBack: (self) => {
						document.body.classList.add("is-light")
					},
				});
			
				pillScrollTimeline.kill();
				pillScrollTimeline = gsap.timeline({
					defaults: {
						ease: "power1.inOut",
					},
					scrollTrigger: {
						trigger: "#pill-scene",
						start: "top top",
						end: `${window.innerHeight*2} top`,
						scrub: true,
						pin: true,
						pinSpacing: false,
					}
				});
				
				pillScrollTimeline.pause();
				
				gsap.set(pillSectionTitle, {
					transform: "rotate(0deg) scale(0.5)"
				})

				gsap.set(pillSectionDecorElements[0], {
					transform: "translate3d(-99.5%,-50%,0)",
				})

				gsap.set(pillSectionDecorElements[1], {
					transform: "translate3d(-0.5%,-50%,0)",
				})
			
				pillScrollTimeline.to(html, 
				{
					duration: 1,
					'--background-color': "rgb(3,3,4)",
					'--theme-color-1': 'rgb(245,248,255)',
					'--theme-color-1-reverse': 'rgb(3,3,4)',
					'--theme-color-2': 'rgb(0,0,0)',
					'--theme-color-2-reverse': 'rgb(255,255,255)',
				})
			
				pillScrollTimeline.to(pillSectionDecor, {
					transform: "translate3d(0,0,0)",
					duration: 2,
				})
			
				pillScrollTimeline.to(pillSectionTitle, {
					visibility: "visible",
					duration: 1,
				})
			
				pillScrollTimeline.to(pillSectionDecor, {
					transform: "translate3d(0,0,0) rotate(-25deg)",
					duration: 2,
				},"-=1")
			
				pillScrollTimeline.to(pillSectionTitle, {
					transform: "translate3d(0,0,0) scale(0.5) rotate(-25deg)",
					duration: 1,
				},"-=2")
			
				pillScrollTimeline.to(pillSectionDecorElements[0], {
					transform: `translate3d(-${window.innerWidth*1.2}px,-50%,0) rotate(-25deg)`,
					duration: 2,
				},"-=1")
			
				pillScrollTimeline.to(pillSectionDecorElements[1], {
					transform: `translate3d(${window.innerWidth*1.2}px,-50%,0) rotate(25deg)`,
					duration: 2,
				},"-=2")
			
				pillScrollTimeline.to(pillSectionTitle, {
					transform: "translate3d(0,0,0) scale(1) rotate(0deg)",
					duration: 2,
				},"-=1")
				
				pillScrollTimeline.to(pillSectionTitle, {
					transform: "translate3d(0,0,0) scale(1) rotate(0deg)",
					duration: 0.2,
				})
			
				/* gsap.set(html, {
					'--background-color': "rgb(3,3,4)",
					'--theme-color-1': 'rgb(245,248,255)',
					'--theme-color-1-reverse': 'rgb(3,3,4)',
				}) */
			}
		}

		resize();
		window.addEventListener("resize", resize)

	});
	
}