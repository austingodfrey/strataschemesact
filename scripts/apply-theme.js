document.addEventListener("DOMContentLoaded", () => {
  const match = document.cookie.match(/(?:^|; )client_user=([^;]*)/);
  if (!match) return;

  try {
    const data = JSON.parse(decodeURIComponent(match[1]));
    const bgColor = data.bgColor;

    if (bgColor) {
      document.body.style.backgroundColor = bgColor;

      const darkColors = ["#121212", "#000000", "#1a1a1a"];
      document.body.style.color = darkColors.includes(bgColor.toLowerCase()) ? "white" : "black";
    }
  } catch (e) {
    console.warn("Failed to parse client_user cookie:", e);
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === "bgColorUpdate") {
    location.reload();
  }
});
