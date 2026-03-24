import { screen } from "@testing-library/dom";

import type { UserCardProps } from "@/types/props";
import type { UserCardComponent } from "@/types/components";

import { UserCard } from "@/components/UserCard/UserCard";

import { mockUser } from "@tests/__mocks__/users.mock";

const renderComponent = ({
  name,
  username,
  email,
  phone,
  website,
  company,
}: UserCardProps): UserCardComponent => {
  const container = UserCard({
    name: name,
    company: company,
    email: email,
    phone: phone,
    username: username,
    website: website,
  });
  document.body.appendChild(container);
  return container;
};

describe("UserCard Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render user card with correct information", () => {
    renderComponent({
      company: mockUser.company,
      email: mockUser.email,
      name: mockUser.name,
      phone: mockUser.phone,
      username: mockUser.username,
      website: mockUser.website,
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
    expect(screen.getByText("📧 john@example.com")).toBeInTheDocument();
    expect(screen.getByText("📞 123-456-7890")).toBeInTheDocument();
    expect(screen.getByText("🌐 johndoe.com")).toBeInTheDocument();
    expect(screen.getByText("🏢 Doe Inc")).toBeInTheDocument();
  });

  it("should render as an article element", () => {
    renderComponent({
      company: mockUser.company,
      email: mockUser.email,
      name: mockUser.name,
      phone: mockUser.phone,
      username: mockUser.username,
      website: mockUser.website,
    });

    const article = document.querySelector<HTMLElement>(".user-card");
    expect(article).toBeInTheDocument();
    expect(article?.tagName).toBe("ARTICLE");
  });
});
