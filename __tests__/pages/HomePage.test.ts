import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import { HomePage } from "@/pages/HomePage/HomePage";

const renderPage = (): Page => {
  const container = HomePage();
  document.body.appendChild(container);
  return container;
};

describe("HomePage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".home-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render the title", () => {
    renderPage();

    const title = screen.getByRole("heading", { name: "Home Page" });
    expect(title).toBeInTheDocument();
  });

  it("should render three links with correct attributes", () => {
    renderPage();

    const linkAbout = document.querySelector<HTMLAnchorElement>("#link-about");
    const linkAbout2 =
      document.querySelector<HTMLAnchorElement>("#link-about-2");
    const linkUsers = document.querySelector<HTMLAnchorElement>("#link-users");

    expect(linkAbout).toBeInTheDocument();
    expect(linkAbout).toHaveAttribute("href", "#/about");
    expect(linkAbout).toHaveAttribute("target", "_self");

    expect(linkAbout2).toBeInTheDocument();
    expect(linkAbout2).toHaveAttribute("href", "#/about");
    expect(linkAbout2).toHaveAttribute("target", "_blank");

    expect(linkUsers).toBeInTheDocument();
    expect(linkUsers).toHaveAttribute("href", "#/users");
    expect(linkUsers).toHaveAttribute("target", "_self");
  });
});
