import type { Page } from "@/types/pages";

import { Action } from "@/components/Action/Action";
import { Link } from "@/components/Link/Link";

import "@/pages/ProductPage/ProductPage.css";

const alertProductId = (
  _e: MouseEvent,
  _id: string,
  idProduct: string
): void => {
  alert(`Product ID: ${idProduct}`);
};

export const ProductPage = (params?: Record<string, string>): Page => {
  const productId = params?.id ?? "unknown";

  const main = document.createElement("main");
  main.className = "product-page";

  main.innerHTML = `
    <h1 class="title">Product Page: ${productId}</h1>

    <div class="links"></div>

    <div class="actions"></div> 
  `;

  const links = main.querySelector<HTMLDivElement>(".links")!;
  const actions = main.querySelector<HTMLDivElement>(".actions")!;

  const actionProductId = Action({
    id: "action-product-id",
    ariaLabel: "Show current product ID",
    children: "Click Product Id",
    onClick: (e, id): void => {
      alertProductId(e, id, productId);
    },
  });

  const linkNotExists = Link({
    id: "link-not-exists",
    ariaLabel: "Navigate to a non-existent page",
    href: "/pasdasdasdasd",
    children: "Go to Not Exists Page",
    target: "_self",
  });

  links.append(linkNotExists);
  actions.append(actionProductId);

  return main;
};
