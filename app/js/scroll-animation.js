
export default function scrollAnimation(params) {

	

	const 
	html = document.querySelector("html"),
	decorElement = document.querySelectorAll(".hero__decor_element"),
	hero = document.querySelector(".hero"),
	heroTitle = document.querySelector(".hero__title"),
	heroMobTitle = document.querySelector(".hero__mob_title"),
	heroText = document.querySelector(".hero__text"),
	loader = document.querySelector(".loader");

	const cases = document.querySelector(".cases"), 
	casesInner = document.querySelector(".cases__inner");


	let mm = gsap.matchMedia();

	mm.add("(min-width: 992px)", () => {

		const showAnim = gsap.from('.header', { 
			transform: "translate3d(0,-100%,0)",
			paused: true,
			duration: 0.1
		}).progress(1);
		  
		ScrollTrigger.create({
			start: "top top",
			end: "max",
			onUpdate: (self) => {
				self.direction === -1 ? showAnim.play() : showAnim.reverse()
			}
		});

		const heroScrollTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: "#hero-scene",
				start: "top top",
				end: `+=${window.innerHeight*2} top`,
				scrub: true,
				pin: true,
				pinSpacer: false,
				pinSpacing: false,
			}
		});

		
	
		heroScrollTimeline.pause();
		
		heroScrollTimeline.to([heroTitle, loader, heroText], {
			opacity: 0.2,
			duration: 2,
		})
		
		heroScrollTimeline.fromTo(decorElement[0], {
			"--y": "0%",
			"--x": "45%",
			"--scale": "1",
		}, {
			"--x": "80%",
			"--y": "50%",
			"--scale": "1.1",
			duration: 2,
		}, "-=1")
		
		heroScrollTimeline.fromTo(decorElement[1], {
			"--y": "25%",
			"--x": "-40%",
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
			duration: 3,
			ease: "power2.inOut",
		}, 
		{
			duration: 3,
			ease: "power3.inOut",
			'--background-color': "rgb(245,248,255)",
			'--theme-color-1': 'rgb(3,3,4)',
			'--theme-color-1-reverse': 'rgb(245,248,255)',
		},
		"-=4")

		ScrollTrigger.create({
			trigger: cases,
			start: "top top",
			onEnter: (self) => {
				document.body.classList.add("is-light")
			},

			onLeaveBack: (self) => {
				document.body.classList.remove("is-light")
			},
		});
	
		const casesScrollTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: "#cases-scene",
				start: `center center`,
				end: `+=${casesInner.scrollWidth}`,
				scrub: true,
				pin: true,
				pinSpacing: true,
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
	
		const animTitleScrollTimeline = gsap.timeline({
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
	
		animTitleScrollTimeline.to(cases, {
			opacity: 0,
			visibility: "hidden",
			duration: 0,
		})
	
		const servicesScrollTimeline = gsap.timeline({
			defaults: {
				ease: "linear",
			},
			scrollTrigger: {
				trigger: "#services-scene",
				start: "top top",
				end: `+=${window.innerHeight} top`,
				scrub: true,
				pin: true,
			}
		});
		
		servicesScrollTimeline.pause();
	
		const 
		ourExpertiseTitle = document.querySelector(".our_expertise__title"),
		//ourExpertiseImages = document.querySelector(".our_expertise__images"),
		//ourExpertiseImagesItems = ourExpertiseImages.querySelectorAll(".our_expertise__images_item"),
		ourExpertiseList = document.querySelector(".our_expertise__list"),
		ourExpertiseItems = ourExpertiseList.querySelectorAll(".our_expertise__item");
	
		servicesScrollTimeline.to(ourExpertiseTitle, {
			opacity: 0,
			duration: 2,
		})
	
		gsap.set(ourExpertiseList, {
			transform: `translate3d(0,${window.innerHeight}px,0)`,
		})
	
		servicesScrollTimeline.to(ourExpertiseList, {
			transform: "translate3d(0,0,0)",
			duration: 2,
		},"-=1")
	
		const 
		pillSection = document.querySelector(".pill"),
		pillSectionTitle = pillSection.querySelector(".pill__title"),
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
	
		const pillScrollTimeline = gsap.timeline({
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
	
		pillScrollTimeline.to(html, 
		{
			duration: 1,
			'--background-color': "rgb(3,3,4)",
			'--theme-color-1': 'rgb(245,248,255)',
			'--theme-color-1-reverse': 'rgb(3,3,4)',
		})
	
		pillScrollTimeline.to(pillSectionDecor, {
			transform: "translate3d(0,0,0) scale(1)",
			duration: 1,
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
			transform: `translate3d(-${window.innerWidth}px,-50%,0) rotate(-25deg)`,
			duration: 2,
		},"-=1")
	
		pillScrollTimeline.to(pillSectionDecorElements[1], {
			transform: `translate3d(${window.innerWidth}px,-50%,0) rotate(25deg)`,
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
	
		gsap.set(html, {
			'--background-color': "rgb(3,3,4)",
			'--theme-color-1': 'rgb(245,248,255)',
			'--theme-color-1-reverse': 'rgb(3,3,4)',
		})
	});

	mm.add("(max-width: 991px)", () => {

		const showAnim = gsap.from('.header', { 
			transform: "translate3d(0,-100%,0)",
			paused: true,
			//duration: 0.05
		}).progress(1);
		  
		ScrollTrigger.create({
			start: "top top",
			end: "max",
			onUpdate: (self) => {
				self.direction === -1 ? showAnim.play() : showAnim.reverse()
			}
		});

		const heroScrollTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: "#hero-scene",
				start: "top top",
				end: `+=${window.innerHeight*2} top`,
				scrub: true,
				pin: true,
				pinSpacer: false,
				//pinSpacing: false,
			}
		});
	
		heroScrollTimeline.pause();
		
		heroScrollTimeline.to([heroMobTitle, loader, heroText], {
			opacity: 0.2,
			duration: 2,
		})

		function vh(value) {
			return window.innerHeight*0.01 * value;
		}
		
		heroScrollTimeline.fromTo(decorElement[0], {
			"--y": `${vh(10)}px`,
			"--x": "5vw",
			"--scale": "1",
		}, {
			"--y": `${vh(30)}px`,
			"--x": "20vw",
			"--scale": "1.1",
			duration: 2,
		}, "-=1")
		
		heroScrollTimeline.fromTo(decorElement[1], {
			"--y": "0vh",
			"--x": "0vw",
			"--scale": "1",
		}, {
			"--y": `-${vh(30)}px`,
			"--x": "-20vw",
			"--scale": "1.1",
			duration: 2,
		}, "-=2")
		
		/* heroScrollTimeline.to(decorElement[0], {
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
		}, "-=1") */
		
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
			duration: 3,
			ease: "power2.inOut",
		}, 
		{
			duration: 3,
			ease: "power3.inOut",
			'--background-color': "rgb(245,248,255)",
			'--theme-color-1': 'rgb(3,3,4)',
			'--theme-color-1-reverse': 'rgb(245,248,255)',
		},
		"-=4")

		ScrollTrigger.create({
			trigger: cases,
			start: "top top",
			onEnter: (self) => {
				document.body.classList.add("is-light")
			},

			onLeaveBack: (self) => {
				document.body.classList.remove("is-light")
			},
		});
	
		const 
		animTitle = document.querySelector(".anim_title"), 
		animTitleValue = document.querySelector(".anim_title__value"),
		animTitlelines = animTitleValue.querySelectorAll("div");
	
		const animTitleScrollTimeline = gsap.timeline({
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
	
		/* animTitleScrollTimeline.to(cases, {
			opacity: 0,
			visibility: "hidden",
			duration: 0,
		}) */
	
		/* const servicesScrollTimeline = gsap.timeline({
			defaults: {
				ease: "linear",
			},
			scrollTrigger: {
				trigger: "#services-scene",
				start: "top top",
				end: `+=${window.innerHeight} top`,
				scrub: true,
				pin: true,
			}
		});
		
		servicesScrollTimeline.pause();
	
		const 
		ourExpertiseTitle = document.querySelector(".our_expertise__title"),
		//ourExpertiseImages = document.querySelector(".our_expertise__images"),
		//ourExpertiseImagesItems = ourExpertiseImages.querySelectorAll(".our_expertise__images_item"),
		ourExpertiseList = document.querySelector(".our_expertise__list"),
		ourExpertiseItems = ourExpertiseList.querySelectorAll(".our_expertise__item");
	
		servicesScrollTimeline.to(ourExpertiseTitle, {
			opacity: 0,
			duration: 2,
		})
	
		gsap.set(ourExpertiseList, {
			transform: `translate3d(0,${window.innerHeight}px,0)`,
		})
	
		servicesScrollTimeline.to(ourExpertiseList, {
			transform: "translate3d(0,0,0)",
			duration: 2,
		},"-=1") */
	
	
	
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
	
		const pillScrollTimeline = gsap.timeline({
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
	
		pillScrollTimeline.to(html, 
		{
			duration: 1,
			'--background-color': "rgb(3,3,4)",
			'--theme-color-1': 'rgb(245,248,255)',
			'--theme-color-1-reverse': 'rgb(3,3,4)',
		})
	
		pillScrollTimeline.to(pillSectionDecor, {
			transform: "translate3d(0,0,0) scale(1)",
			duration: 1,
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
	
		gsap.set(html, {
			'--background-color': "rgb(3,3,4)",
			'--theme-color-1': 'rgb(245,248,255)',
			'--theme-color-1-reverse': 'rgb(3,3,4)',
		})
	});
	
	
}