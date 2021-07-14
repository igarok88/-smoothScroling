window.addEventListener("DOMContentLoaded", () => {
	const menuLinks = document.querySelectorAll(".menu__link[data-goto]"); //ищем все элементы с классом menu__link у которых есть атрибут data-goto
	const header = document.querySelector("header");
	const sections = document.querySelectorAll(".page__section");

	if (menuLinks.length > 0) {
		menuLinks.forEach((menuLink) => {
			menuLink.addEventListener("click", onMenuLinkClick);
		});

		function onMenuLinkClick(e) {
			menuLinks.forEach((menuLink) => {
				menuLink.classList.remove("active");
			});
			const menuLink = e.target;
			//проверяем заполнен атрибут goto и существует объект на который ссылается дата атрибут
			if (
				menuLink.dataset.goto &&
				document.querySelector(menuLink.dataset.goto)
			) {
				const gotoBlock = document.querySelector(menuLink.dataset.goto);
				const gotoBlockValue =
					gotoBlock.getBoundingClientRect().top + //getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим).
					pageYOffset - //возвращает количество пикселей, на которое прокручен документ по вертикали
					header.offsetHeight; //высота элемента с учётом вертикальных полей и границ в пикселях.
				window.scrollTo({
					top: gotoBlockValue,
					behavior: "smooth",
				});
				e.preventDefault();
			}
			menuLink.classList.add("active");
		}

		function scrollActive() {
			sections.forEach((section) => {
				const top = section.offsetTop - header.offsetHeight - 1;
				const bottom = top + section.clientHeight;
				const scroll = document.documentElement.scrollTop;

				if (scroll > top && scroll < bottom) {
					menuLinks.forEach((menuLink) => {
						const menuLinkAttr = menuLink.getAttribute("data-goto").slice(1);
						const sectionAttr = section.getAttribute("class");

						if (sectionAttr.includes(menuLinkAttr)) {
							menuLink.classList.add("active");
						} else {
							menuLink.classList.remove("active");
						}
					});
				} else {
				}
			});
		}
		window.addEventListener("scroll", scrollActive);

		function mouseActive(e) {
			sections.forEach((section, index) => {
				const sectionTarget = section.getBoundingClientRect();
				const headerTarget = header.getBoundingClientRect();

				// console.log(`Блок №  ${index + 1}`);
				// console.log("Координаты Header`a начальные (Y): " + headerTarget.y);
				// console.log("Координаты мыши (Y): " + e.clientY);
				// console.log("Координаты Header`a конечные (Y): " + headerTarget.bottom);

				// console.log("Координаты элемента начальные (Y): " + sectionTarget.y);
				// console.log("Координаты мыши (Y): " + e.clientY);
				// console.log(
				// 	"Координаты элемента конечные (Y): " + sectionTarget.bottom
				// );

				if (
					// sectionTarget.x < e.clientX &&
					// sectionTarget.width > e.clientX &&
					headerTarget.y < e.clientY &&
					headerTarget.bottom < e.clientY &&
					sectionTarget.y < e.clientY &&
					sectionTarget.bottom > e.clientY
				) {
					menuLinks.forEach((menuLink) => {
						const menuLinkAttr = menuLink.getAttribute("data-goto").slice(1);
						const sectionAttr = section.getAttribute("class");

						if (sectionAttr.includes(menuLinkAttr)) {
							menuLink.classList.add("active");
						} else {
							menuLink.classList.remove("active");
						}
					});
				}
			});
		}
		window.addEventListener("mousemove", mouseActive);
	}
});
