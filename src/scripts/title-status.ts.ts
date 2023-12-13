// detect when user leaves the page and update the title of the page to "Come back!"

const originalTitle = document.title;
let timeout: NodeJS.Timeout;

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    timeout = setTimeout(() => {
      document.title = "Already left?";
    }, 3000);
  } else {
    if (timeout) clearTimeout(timeout);
    document.title = originalTitle; // Replace with your original title
  }
});
