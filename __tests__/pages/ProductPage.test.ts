import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { ProductPage } from "@/pages/ProductPage/ProductPage";

const renderPage = (params?: Record<string, string>): Page => {
  const container = ProductPage(params);
  document.body.appendChild(container);
  return container;
};

describe("ProductPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("should render the page with product id from params", () => {
    renderPage({ id: "42" });

    const title = screen.getByRole("heading", { name: "Product Page: 42" });
    expect(title).toBeInTheDocument();
  });

  it("should render with unknown id when no params provided", () => {
    renderPage();

    const title = screen.getByRole("heading", {
      name: "Product Page: unknown",
    });
    expect(title).toBeInTheDocument();
  });

  it("should show alert with product id when action clicked", async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, "alert").mockImplementation();

    renderPage({ id: "123" });

    const button = screen.getByRole("button", {
      name: "Show current product ID",
    });
    await user.click(button);

    expect(alertSpy).toHaveBeenCalledWith("Product ID: 123");
    alertSpy.mockRestore();
  });

  it("should render link to non-existent page", () => {
    renderPage();

    const link = screen.getByRole("link", {
      name: "Navigate to a non-existent page",
    });
    expect(link).toHaveAttribute("href", "#/pasdasdasdasd");
  });
});
