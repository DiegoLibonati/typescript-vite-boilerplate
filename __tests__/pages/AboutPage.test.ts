import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import AboutPage from "@/pages/AboutPage/AboutPage";

const renderPage = (): Page => {
  const container = AboutPage();
  document.body.appendChild(container);
  return container;
};

describe("AboutPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".about-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render the title", () => {
    renderPage();

    const title = screen.getByRole("heading", { name: "About Page" });
    expect(title).toBeInTheDocument();
  });

  it("should render two links", () => {
    renderPage();

    const linkProduct = screen.getByRole("link", {
      name: "Navigate to Product page 12",
    });
    const linkStore = screen.getByRole("link", {
      name: "Navigate to Store page",
    });

    expect(linkProduct).toBeInTheDocument();
    expect(linkProduct).toHaveAttribute("href", "#/products/12");
    expect(linkProduct).toHaveAttribute("target", "_self");

    expect(linkStore).toBeInTheDocument();
    expect(linkStore).toHaveAttribute("href", "#/store");
    expect(linkStore).toHaveAttribute("target", "_self");
  });
});
