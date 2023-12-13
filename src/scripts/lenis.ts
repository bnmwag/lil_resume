import Lenis from "@studio-freight/lenis";

/**
 * Immediately invoked function expression (IIFE) to initialize the Lenis library.
 *
 * This function creates a new instance of the Lenis class and passes in an object
 * with the base configuration for the library. The instance is then passed to a
 * requestAnimationFrame loop to update the library every frame.
 */
(function () {
  /**
   * Creates a new instance of the Lenis class.
   * @type {Lenis}
   */
  const lenis = new Lenis({ smoothTouch: false, smoothWheel: true, normalizeWheel: true }) as Lenis;

  /**
   * RequestAnimationFrame loop to update the Lenis instance every frame.
   * @param {number} time - The current time in milliseconds.
   */
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  // Start the requestAnimationFrame loop.
  requestAnimationFrame(raf);
})();
