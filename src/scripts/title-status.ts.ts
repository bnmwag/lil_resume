/**
 * Immediately Invoked Function Expression (IIFE) to change the document title based on tab visibility.
 *
 * This function listens for the 'visibilitychange' event on the document. When the tab becomes
 * hidden (e.g., when a user switches to a different tab), it starts a timer. If the tab remains
 * hidden for more than 3 seconds, the document title changes to a predefined message.
 * When the tab becomes visible again, the timer is cleared and the document title is restored
 * to its original value.
 */
(function () {
  /**
   * Stores the original title of the document.
   * @type {string}
   */
  const originalTitle: string = document.title;

  /**
   * Variable to hold the timeout ID for the timer.
   * @type {NodeJS.Timeout | undefined}
   */
  let timeout: NodeJS.Timeout | undefined;

  /**
   * Event listener for the 'visibilitychange' event on the document.
   * Changes the document title based on the visibility state of the document.
   */
  document.addEventListener("visibilitychange", (): void => {
    if (document.visibilityState === "hidden") {
      // Set a timeout to change the title after 3 seconds of the document being hidden.
      timeout = setTimeout((): void => {
        document.title = "Already left?";
      }, 3000);
    } else {
      // Clear the timeout and restore the original title if the document becomes visible again.
      clearTimeout(timeout);
      document.title = originalTitle;
    }
  });
})();
