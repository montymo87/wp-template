import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Initialize simple fade animations:
 * Find all animation targets
 * Define configuration
 * Apply animation
 * Usage:
 * Add .js-fade-el class to element that you want to fade.
 */
const fade = () => {
	const SELECTORS = {
		el: '.js-fade-el',
	};

	const $fadeEl = document.querySelectorAll(SELECTORS.el);
	if ($fadeEl.length) {
		gsap.set($fadeEl, {
			y: 20,
			opacity: 0,
		});

		ScrollTrigger.batch($fadeEl, {
			start: 'top 15%',
			trigger: '.wrapper',
			// once: true,
			// markers: true,
			// horizontal: true,
			// pinSpacing: false,
			onEnter: (batch) => {
				gsap.to(batch, {
					duration: 0.4,
					opacity: 1,
					y: 0,
					stagger: 0.1,
					ease: 'none',
				});

				// const scrollY = window.scrollY || window.pageYOffset;
				console.log('Current vertical scroll position: ');
			},
		});
	}
};

export default fade;
