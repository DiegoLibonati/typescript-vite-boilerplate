import type { Page } from "@/types/pages";

import { Link } from "@/components/Link/Link";

import "@/pages/HomePage/HomePage.css";

export const HomePage = (): Page => {
  const main = document.createElement("main");
  main.className = "home-page";

  main.innerHTML = `
    <h1 class="title">Home Page</h1>

    <div class="links"></div>
  `;

  const links = main.querySelector<HTMLDivElement>(".links")!;

  const linkAbout = Link({
    id: "link-about",
    ariaLabel: "link-about",
    href: "/about",
    children: "Go to About Page",
    target: "_self",
  });

  const linkAbout2 = Link({
    id: "link-about-2",
    ariaLabel: "link-about-2",
    href: "/about",
    children: "Go to About Page in Another Window",
  });

  const linkUsers = Link({
    id: "link-users",
    ariaLabel: "link-about",
    href: "/users",
    children: "Go to Users Page",
    target: "_self",
  });

  links.append(linkAbout, linkAbout2, linkUsers);

  return main;
};
