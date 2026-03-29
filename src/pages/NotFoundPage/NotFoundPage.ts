import type { Page } from "@/types/pages";

import "@/pages/NotFoundPage/NotFoundPage.css";

const NotFoundPage = (): Page => {
  const main = document.createElement("main");
  main.className = "not-found-page";

  main.innerHTML = `
    <h1 class="title">Not Found Page</h1>
    <p class="description">
      The page you're looking for doesn't exist or has been moved.
    </p>
  `;

  return main;
};

export default NotFoundPage;
