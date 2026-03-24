import type { Page } from "@/types/pages";

import { Link } from "@/components/Link/Link";

import "@/pages/AboutPage/AboutPage.css";

export const AboutPage = (): Page => {
  const main = document.createElement("main");
  main.className = "about-page";

  main.innerHTML = `
    <h1 class="title">About Page</h1>

    <div class="links"></div>
  `;

  const links = main.querySelector<HTMLDivElement>(".links")!;

  const linkProduct = Link({
    id: "link-product",
    ariaLabel: "Navigate to Product page 12",
    href: "/products/12",
    children: "Go to Product Page: 12",
    target: "_self",
  });

  const linkStore = Link({
    id: "link-store",
    ariaLabel: "Navigate to Store page",
    href: "/store",
    children: "Go to Store Page",
    target: "_self",
  });

  links.append(linkProduct, linkStore);

  return main;
};
