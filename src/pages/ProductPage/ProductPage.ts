import type { Page } from "@/types/pages";

import Action from "@/components/Action/Action";
import Link from "@/components/Link/Link";

import "@/pages/ProductPage/ProductPage.css";

const alertProductId = (
  _e: MouseEvent,
  _id: string,
  idProduct: string
): void => {
  alert(`Product ID: ${idProduct}`);
};

const ProductPage = (params?: Record<string, string>): Page => {
  const productId = params?.id ?? "unknown";

  const main = document.createElement("main");
  main.className = "product-page";

  main.innerHTML = `
    <h1 class="title">Product Page: ${productId}</h1>

    <nav aria-label="Page navigation">
      <ul class="links">
        <li class="link-item-1"></li>
      </ul>
    </nav>

    <section class="actions" aria-label="Product actions"></section> 
  `;

  const linkItem1 = main.querySelector<HTMLLIElement>(".link-item-1")!;
  const actions = main.querySelector<HTMLElement>(".actions")!;

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

  linkItem1.append(linkNotExists);
  actions.append(actionProductId);

  return main;
};

export default ProductPage;
