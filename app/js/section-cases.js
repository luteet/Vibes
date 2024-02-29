
export default function sectionCases() {

	const 
	section = document.querySelector(".cases"),
	hero = document.querySelector(".cases__hero");

	const scrollTimeline = gsap.timeline();
	scrollTimeline.pause();

	gsap.set(hero, {
		opacity: 0.2,
		transform: "translate3d(0,100%,0) scale(0.5)",
	})

	scrollTimeline.to(hero, {
		opacity: 1,
		transform: "translate3d(0,0,0) scale(1)",
		duration: 3,
	})

	/* scrollTimeline.fromTo(decorElement[0], {
		"--y": "0%",
		"--x": "45%",
		"--scale": "1",
	}, {
		"--x": "80%",
		"--y": "50%",
		"--scale": "1.1",
		duration: 2,
	}, "-=1")

	scrollTimeline.fromTo(decorElement[1], {
		"--y": "25%",
		"--x": "-40%",
		"--scale": "1",
	}, {
		"--x": "-80%",
		"--y": "-30%",
		"--scale": "1.1",
		duration: 2,
	}, "-=2")

	scrollTimeline.to(decorElement[0], {
		"--x": "80%",
		"--y": "50%",
		"--scale": "1.1",
		duration: 1,
	})

	scrollTimeline.to(decorElement[1], {
		"--x": "-80%",
		"--y": "-30%",
		"--scale": "1.1",
		duration: 1,
	}, "-=1")

	scrollTimeline.to(decorElement[0], {
		"--x": "45%",
		"--y": "45%",
		"--scale": "6",
		opacity: 0,
		duration: 3,
		ease: "power3.inOut",
	})

	scrollTimeline.to(decorElement[1], {
		"--x": "-80%",
		"--y": "-30%",
		"--scale": "6",
		opacity: 0,
		duration: 3,
		ease: "power3.inOut",
	}, "-=3")

	scrollTimeline.to([title, loader, text], {
		opacity: 0,
		duration: 3,
	}, "-=3") */

	// =-=-=-=-=-=-=-=-=-=-=-=- <get-coords> -=-=-=-=-=-=-=-=-=-=-=-=
	
	function getCoords(elem) {
		let box = elem.getBoundingClientRect();
	
		return {
			top: box.top + window.scrollY,
			right: box.right + window.scrollX,
			bottom: box.bottom + window.scrollY,
			left: box.left + window.scrollX
		};
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </get-coords> -=-=-=-=-=-=-=-=-=-=-=-=

	ScrollTrigger.create({

		trigger: section,
		scrub: true,
		//pin: true,
		start: `top top`,
		end: `bottom top`,
		markers: true,
		
		onUpdate: (self) => {

			scrollTimeline.progress(self.progress);
			
		},
		
	});

}
