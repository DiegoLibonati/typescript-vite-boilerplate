import type { Page } from "@/types/pages";

import Link from "@/components/Link/Link";

import "@/pages/AboutPage/AboutPage.css";

const AboutPage = (): Page => {
  const main = document.createElement("main");
  main.className = "about-page";

  main.innerHTML = `
    <h1 class="title">About Page</h1>

    <nav aria-label="Page navigation">
      <ul class="links">
        <li class="link-item-1"></li>
        <li class="link-item-2"></li>
      </ul>
    </nav>
  `;

  const linkItem1 = main.querySelector<HTMLLIElement>(".link-item-1")!;
  const linkItem2 = main.querySelector<HTMLLIElement>(".link-item-2")!;

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

  linkItem1.append(linkProduct);
  linkItem2.append(linkStore);

  return main;
};

export default AboutPage;
