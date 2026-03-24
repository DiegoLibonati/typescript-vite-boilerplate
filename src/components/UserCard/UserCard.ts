import type { UserCardProps } from "@/types/props";
import type { UserCardComponent } from "@/types/components";

import "@/components/UserCard/UserCard.css";

export const UserCard = ({
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
    <h3 class="user-card__name">${name}</h3>
    <p class="user-card__username">@${username}</p>
    <p class="user-card__info">📧 ${email}</p>
    <p class="user-card__info">📞 ${phone}</p>
    <p class="user-card__info">🌐 ${website}</p>
    <p class="user-card__company">🏢 ${company.name}</p>
  `;

  return card;
};
