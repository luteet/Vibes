export default function form() {
	
	function validateEmail(email) {
		let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		return reg.test(email);
	}
	
	function validateName(name) {
		let reg = /\d/;
		return reg.test(name);
	}
	
	document.querySelectorAll('form input').forEach(input => {
		if(input.name == "full-name" && input.type == "text") {
			input.addEventListener('blur', function (event) {
				if(input.value) {
					if(!validateName(input.value)) {
						input.closest('label').classList.remove('is-error');
						if(input.value != "") input.closest('label').classList.add('is-valid');
					} else {
						input.closest('label').classList.add('is-error');
						input.closest('label').classList.remove('is-valid');
					}
				}
			})
		}
	
		if(input.type == "email") {
			input.addEventListener('blur', function (event) {
				if(input.value) {
					if(validateEmail(input.value)) {
						input.closest('label').classList.remove('is-error');
						if(input.value != "") input.closest('label').classList.add('is-valid');
					} else {
						input.closest('label').classList.add('is-error');
						input.closest('label').classList.remove('is-valid');
					}
				}
			})
		}
	})

	document.querySelectorAll(".feedback__file input").forEach(input => {
		const targetText = input.parentElement.querySelectorAll(".feedback__file_target span");
		input.addEventListener("change", () => {
			targetText.forEach(targetText => {
				targetText.innerHTML = `<svg width="20" height="20"><use href="${targetText.parentElement.dataset.icon}"></use></svg>${input.files[0].name}`;
			})

			input.closest(".feedback__file").classList.add("has-file");
		})
	})

	document.querySelectorAll(".feedback__file_remove").forEach(removeButton => {
		const block = removeButton.closest(".feedback__file"),
		targetText = block.querySelectorAll(".feedback__file_target span");

		removeButton.addEventListener("click", () => {
			block.querySelector("input").value = "";
			targetText.forEach(targetText => {
				targetText.innerHTML = `<svg width="20" height="20"><use href="${targetText.parentElement.dataset.icon}"></use></svg>${block.dataset.defaultText}`;
			})

			block.classList.remove("has-file");
		})
	})
	
	document.querySelectorAll('form').forEach(form => {
		form.addEventListener('submit', function (event) {
			event.preventDefault();

			if(!form.querySelector('.is-error')) {

				form.classList.add("is-loading");
				window.innerWidth < 550 && form.style.setProperty("height", form.scrollHeight + 'px');

				let data = "action=" + form.getAttribute("action");

				form.querySelectorAll('input, textarea').forEach(element => {
					if(element.value) {
						data += `&${element.name}=${element.value}`;
					}
				})

				setTimeout(() => {
					form.classList.remove("is-loading");
					form.classList.add("is-loaded");
					//window.innerWidth < 550 && form.style.setProperty("height", form.querySelector(".message").scrollHeight + 'px');
				},1000)

				/* if(admin_ajax_url) {
					fetch(admin_ajax_url, {
						method: "POST",
						body: data,
						headers:{"content-type": "application/x-www-form-urlencoded"}
					})
					
					.then( (response) => {
						if(response.status !== 200) return Promise.reject();
						return response.text()
					})
					.then(result => {
						if(result == "success") {
							form.classList.remove("is-loading");
							form.classList.add("is-loaded");
						} else {
							form.classList.remove("is-loading");
						}
					})
					.catch((error) => {
						console.log(error)
						form.classList.remove("is-loading");
					});
				} else {
					setTimeout(() => {
						form.classList.remove("is-loading");
						form.classList.add("is-loaded");
						window.innerWidth < 550 && form.style.setProperty("height", form.querySelector(".message").scrollHeight + 'px');
					},1000)
				} */

			}
			
		})
	})
	
	document.querySelectorAll('form textarea').forEach(textarea => {
	
		textarea.addEventListener('input', function (event) {
			textarea.parentElement.dataset.value = textarea.value;
		})
		
		textarea.addEventListener('blur', function (event) {
			if(textarea.value != "") {
				textarea.closest('label').classList.add('is-valid');
			} else {
				textarea.closest('label').classList.remove('is-valid');
			}
		})
		
	})

	let forms = document.querySelectorAll('form');
	forms.forEach(form => {
		form.style.setProperty('--width-form', form.offsetWidth + 'px');
	})

	const telLabels = document.querySelectorAll('.tel-input-label');
	telLabels.forEach(tel => {
		tel.style.setProperty('--width', tel.offsetWidth + 'px');
	})
	
}