// import horizontalScroll from 'components/horizontal-scroll';
// import fade from 'components/fade';

import layout from './layout/layout';
import { pageLoad } from './utils';

console.log('holla1111s');
export default class App {
	constructor() {
		this.init();
	}

	init() {
		const initLayout = layout();
		pageLoad(() => {
			document.body.classList.add('body--loaded');
			console.log('hello app @@@');

			// horizontalScroll();
			// fade();ddd
		});
		// setTimeout(() => {
		// 	this.importPage();
		// }, 0);
	}
}
