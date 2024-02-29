export default function changeTheme(params) {

	const html = document.querySelector("html"), body = document.body, header = params.header;

	let firstStart = false;

	document.querySelectorAll('[data-change-theme-to]').forEach((element,index) => {
		
		let section = document.querySelectorAll('[data-change-theme-to]')[index],
		prevSection = index-1 != -1 ? document.querySelectorAll('[data-change-theme-to]')[index-1] : false,
		timeline = gsap.timeline();
		
		if(section.dataset.changeThemeTo == "light") {
			
			/* gsap.set(html, {
				"--background-color": 'rgba(11,11,12,1)',
				'--theme-color-1': 'rgb(255,255,255)',
				'--theme-color-1-reverse': 'rgb(23,23,24)',
				'--theme-color-3': 'rgb(79,79,87)',
				'--theme-progress': 0,
				'--theme-progress-reverse': 1,
			}) */
		
			timeline.to(html, {
				'--background-color': "rgb(245,248,255)",
				'--theme-color-1': 'rgb(3,3,4)',
				'--theme-color-1-reverse': 'rgb(245,248,255)',
			})
			
		} else {
			
			/* gsap.set(html, {
				'--background-color': "rgb(255,255,255)",
				'--theme-color-1': 'rgb(23,23,24)',
				'--theme-color-1-reverse': 'rgb(255,255,255)',
				'--theme-progress': 1,
				'--theme-progress-reverse': 0,
				'--theme-color-3': 'rgb(142,148,160)',
			}) */
		
			timeline.to(html, {
				'--background-color': "rgb(3,3,4)",
				'--theme-color-1': 'rgb(245,248,255)',
				'--theme-color-1-reverse': 'rgb(3,3,4)',
			})
		}

		timeline.pause();

		let start, end;
		if(section.hasAttribute('data-change-theme-on-top')) {
			start = `+100 bottom`;
			end = `+500 bottom`;
		} else {
			start = `-${window.innerHeight/7} 15%`;
			end = `+${window.innerHeight/3} 15%`;
		}

		let start2, end2;
		if(window.innerWidth >= 992) {
			start2 = `-=${window.innerHeight / 3} top`;
			end2 = `-=${window.innerHeight / 3} top`;
		} else {
			start2 = "-=500 top";
			end2 = "-=500 top";
		}

		ScrollTrigger.create({
			trigger: element,
				
			start: start2,
			end: end2,
			
			onEnter: function () {
				if(section.dataset.changeThemeTo == "light") {

					body.classList.remove('is-dark');
					header.classList.add("mode-1");

					/* gsap.set(html, {
						'--theme-color-2': '#171718',
						'--background-color-2': 'rgba(255,255,255,1)',
					}) */

				} else {

					body.classList.add('is-dark');
					header.classList.remove("mode-1");
					
					/* gsap.set(html, {
						'--theme-color-2': '#FFF',
						'--background-color-2': 'rgba(11,11,12,1)',
					}) */

				}
			},

			onEnterBack: function (self) {

				body.classList.remove('is-dark');

				if(prevSection) {
					if(prevSection.dataset.changeThemeTo == "light") {

						if(index-1 == -1) body.classList.add('is-dark'); else body.classList.remove('is-dark');

						/* gsap.set(html, {
							'--theme-color-2': '#171718',
							'--background-color-2': 'rgba(255,255,255,1)',
						}) */

						header.classList.add("mode-1");

					} else {
						
						if(index-1 == -1) body.classList.remove('is-dark'); else body.classList.add('is-dark');

						/* gsap.set(html, {
							'--theme-color-2': '#FFF',
							'--background-color-2': 'rgba(11,11,12,1)',
						}) */

						header.classList.remove("mode-1");

					}
				} else {
					
					if(!html.classList.contains("is-light-start")) {

						body.classList.add('is-dark');
						header.classList.remove("mode-1");

						/* gsap.set(html, {
							'--theme-color-2': '#171718',
							'--theme-color-2-reverse': '#fff',
							'--background-color-2': 'rgba(255,255,255,1)',
						}) */

						/* document.querySelectorAll('.start-button').forEach(startButton => {
							startButton.classList.remove('is-reverse-theme');
						}) */

					} else {

						body.classList.remove('is-dark');
						header.classList.add("mode-1");

						/* gsap.set(html, {
							'--theme-color-2': '#171718',
							'--background-color-2': 'rgba(255,255,255,1)',
						}) */

						/* document.querySelectorAll('.start-button').forEach(startButton => {
							startButton.classList.add('is-reverse-theme');
						}) */
					}
					
				}
			},
		});

		ScrollTrigger.create({

			trigger: section,
			scrub: 1,
			start: start,
			end: end,

			//markers: true,
			
			onUpdate: (self) => {

				timeline.progress(self.progress);
				console.log(self.progress)
				
				if(index == 0 && self.progress == 1) firstStart = true;
				
			},
			
		});

	})

	if(!firstStart) {

		firstStart = true;

		body.classList.add('is-dark');
		header.classList.remove("mode-1");
		
		gsap.set(html, {
			'--background-color': "rgb(3,3,4)",
			'--theme-color-1': 'rgb(245,248,255)',
			'--theme-color-1-reverse': 'rgb(3,3,4)',
		})
		
	}

}
