import type { UserCardProps } from "@/types/props";
import type { UserCardComponent } from "@/types/components";

import "@/components/UserCard/UserCard.css";

const UserCard = ({
  name,
  username,
  email,
  phone,
  website,
  company,
}: UserCardProps): UserCardComponent => {
  const card = document.createElement("article") as UserCardComponent;
  card.className = "user-card";

  card.innerHTML = `
      <header class="user-card__header">
        <h3 class="user-card__name">${name}</h3>
        <p class="user-card__username" aria-label="Username: ${username}">
          @${username}
        </p>
      </header>

      <address class="user-card__contact">
        <p class="user-card__info">
          <span aria-hidden="true">📧 </span>
          <a href="mailto:${email}">${email}</a>
        </p>
        <p class="user-card__info">
          <span aria-hidden="true">📞 </span>
          <a href="tel:${phone}">${phone}</a>
        </p>
        <p class="user-card__info">
          <span aria-hidden="true">🌐 </span>
          <a href="https://${website}" target="_blank" rel="noopener noreferrer">
            ${website}
          </a>
        </p>
      </address>

      <footer class="user-card__footer">
        <p class="user-card__company">
          <span aria-hidden="true">🏢 </span>
          ${company.name}
        </p>
      </footer>
  `;

  return card;
};

export default UserCard;
