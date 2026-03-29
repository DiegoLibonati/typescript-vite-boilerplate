import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ActionProps } from "@/types/props";
import type { ActionComponent } from "@/types/components";

import Action from "@/components/Action/Action";

const renderComponent = (props: ActionProps): ActionComponent => {
  const container = Action(props);
  document.body.appendChild(container);
  return container;
};

describe("Action Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: ActionProps = {
    id: "test-action",
    ariaLabel: "Test action button",
    children: "Click me",
    onClick: mockOnClick,
  };

  it("should render button with correct attributes", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test action button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "test-action");
    expect(button).toHaveClass("action");
    expect(button.innerHTML).toBe("Click me");
  });

  it("should call onClick handler with event and id", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test action button" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(
      expect.any(MouseEvent),
      "test-action"
    );
  });

  it("should apply additional className when provided", () => {
    const propsWithClass: ActionProps = {
      ...defaultProps,
      className: "custom-class",
    };

    renderComponent(propsWithClass);

    const button = screen.getByRole("button", { name: "Test action button" });
    expect(button).toHaveClass("action", "custom-class");
  });

  it("should cleanup event listeners", async () => {
    const user = userEvent.setup();
    const action = renderComponent(defaultProps);

    action.cleanup?.();

    const button = screen.getByRole("button", { name: "Test action button" });
    await user.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
