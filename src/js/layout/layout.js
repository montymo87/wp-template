// ------------------- imports
import { onWindowResize } from '../utils/onWindowResize';
// ------------------- imports###

// ------------------  import components
import { calcViewportHeight } from '../utils/calcViewportHeight';
// ------------------  import components###

const layout = () => {
	onWindowResize(() => {
		calcViewportHeight();
	});
	calcViewportHeight();
};

export default layout;
