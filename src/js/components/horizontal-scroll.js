/* eslint-disable */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const horizontalScroll = () => {
	const wrapper = document.querySelector('.wrapper');
	const raceWrapper = document.querySelector('.race-wrapper');
	const sections = document.querySelectorAll('.section');
	const race = document.querySelector('.race');

	const getScrollAmount = () => {
		let raceWidth = race.scrollWidth;
		return -(raceWidth - window.innerWidth);
	};

	let horizontalScroll = gsap.to(race, {
		x: getScrollAmount,
		duration: 1,
		ease: 'none',
		scrollTrigger: {
			trigger: '.race-wrapper',
			start: 'top top',
			end: () => `+=${getScrollAmount() * -1}`,
			pin: true,
			scrub: 3,
			markers: true,
			invalidateOnRefresh: true,
			onEnter: () => {
				console.log('holla');
			},
		},
	});

	const fadeElements = document.querySelectorAll('.js-fade-el');

	fadeElements.forEach((el, index) => {
		gsap.to(el, {
			y: -130,
			duration: 2,
			ease: 'elastic',
			scrollTrigger: {
				trigger: el,
				containerAnimation: horizontalScroll,
				start: 'left center',
				toggleActions: 'play none none reset',
				id: `fade-${index}`,
			},
		});
	});
};

export default horizontalScroll;
