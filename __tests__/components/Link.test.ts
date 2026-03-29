import { screen } from "@testing-library/dom";
import type { LinkProps } from "@/types/props";
import type { LinkComponent } from "@/types/components";

import Link from "@/components/Link/Link";

const renderComponent = (props: LinkProps): LinkComponent => {
  const container = Link(props);
  document.body.appendChild(container);
  return container;
};

describe("Link Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: LinkProps = {
    id: "test-link",
    href: "https://example.com",
    ariaLabel: "Test link",
    children: "Click here",
  };

  it("should render link with correct attributes", () => {
    renderComponent(defaultProps);

    const link = screen.getByRole("link", { name: "Test link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("id", "test-link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveClass("link");
    expect(link.innerHTML).toBe("Click here");
  });

  it("should use custom target when provided", () => {
    const propsWithTarget: LinkProps = {
      ...defaultProps,
      target: "_self",
    };

    renderComponent(propsWithTarget);

    const link = screen.getByRole("link", { name: "Test link" });
    expect(link).toHaveAttribute("target", "_self");
  });

  it("should set rel=noopener noreferrer when target is _blank", () => {
    renderComponent(defaultProps);

    const link = screen.getByRole("link", { name: "Test link" });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should not set rel when target is _self", () => {
    renderComponent({ ...defaultProps, target: "_self" });

    const link = screen.getByRole("link", { name: "Test link" });
    expect(link).toHaveAttribute("rel", "");
  });

  it("should apply additional className when provided", () => {
    const propsWithClass: LinkProps = {
      ...defaultProps,
      className: "custom-link",
    };

    renderComponent(propsWithClass);

    const link = screen.getByRole("link", { name: "Test link" });
    expect(link).toHaveClass("link", "custom-link");
  });
});
