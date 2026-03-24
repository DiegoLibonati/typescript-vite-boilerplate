import type { Page } from "@/types/pages";

import { Link } from "@/components/Link/Link";

import "@/pages/HomePage/HomePage.css";

export const HomePage = (): Page => {
  const main = document.createElement("main");
  main.className = "home-page";

  main.innerHTML = `
    <h1 class="title">Home Page</h1>

    <nav aria-label="Page navigation">
      <ul class="links">
        <li class="link-item-1"></li>
        <li class="link-item-2"></li>
        <li class="link-item-3"></li>
      </ul>
    </nav>
  `;

  const linkItem1 = main.querySelector<HTMLLIElement>(".link-item-1")!;
  const linkItem2 = main.querySelector<HTMLLIElement>(".link-item-2")!;
  const linkItem3 = main.querySelector<HTMLLIElement>(".link-item-3")!;

  const linkAbout = Link({
    id: "link-about",
    ariaLabel: "Navigate to About page",
    href: "/about",
    children: "Go to About Page",
    target: "_self",
  });

  const linkAbout2 = Link({
    id: "link-about-2",
    ariaLabel: "Open About page in a new tab",
    href: "/about",
    children: "Go to About Page in Another Window",
  });

  const linkUsers = Link({
    id: "link-users",
    ariaLabel: "Navigate to Users page",
    href: "/users",
    children: "Go to Users Page",
    target: "_self",
  });

  linkItem1.append(linkAbout);
  linkItem2.append(linkAbout2);
  linkItem3.append(linkUsers);

  return main;
};
