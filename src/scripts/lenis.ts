import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
	smoothTouch: true,
	smoothWheel: true,
}) as Lenis;

function raf(time: number) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
