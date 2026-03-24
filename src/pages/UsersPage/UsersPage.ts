import type { Page } from "@/types/pages";

import { Link } from "@/components/Link/Link";
import { UserCard } from "@/components/UserCard/UserCard";

import { userService } from "@/services/userService";

import "@/pages/UsersPage/UsersPage.css";

export const UsersPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "users-page";

  main.innerHTML = `
    <h1 class="title">Users Page</h1>
    <div class="users-list">
      <p class="loading">Loading users...</p>
    </div>
    <div class="links"></div>
  `;

  const usersList = main.querySelector<HTMLDivElement>(".users-list")!;
  const links = main.querySelector<HTMLDivElement>(".links")!;

  const linkHome = Link({
    id: "link-home",
    ariaLabel: "link-home",
    href: "/home",
    children: "Go to Home Page",
    target: "_self",
  });

  links.appendChild(linkHome);

  const loadUsers = async (): Promise<void> => {
    try {
      const users = await userService.getAll();

      usersList.innerHTML = "";
      users.forEach((user) => {
        usersList.appendChild(
          UserCard({
            company: user.company,
            email: user.email,
            name: user.name,
            phone: user.phone,
            username: user.username,
            website: user.website,
          })
        );
      });
    } catch {
      usersList.innerHTML =
        '<p class="error">Error loading users. Please try again.</p>';
    }
  };

  void loadUsers();

  main.cleanup = (): void => {
    // No event listeners to clean up
  };

  return main;
};
