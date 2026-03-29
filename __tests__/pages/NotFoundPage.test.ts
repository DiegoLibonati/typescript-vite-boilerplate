import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

const renderPage = (): Page => {
  const container = NotFoundPage();
  document.body.appendChild(container);
  return container;
};

describe("NotFoundPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".not-found-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render the title", () => {
    renderPage();

    const title = screen.getByRole("heading", { name: "Not Found Page" });
    expect(title).toBeInTheDocument();
  });

  it("should render the description", () => {
    renderPage();

    expect(
      screen.getByText(
        "The page you're looking for doesn't exist or has been moved."
      )
    ).toBeInTheDocument();
  });
});
