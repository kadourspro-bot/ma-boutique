// Fichier technique : les produits se modifient dans src/config/products.ts
import { site } from "@/config/site";
export { products, getProduct, type Product } from "@/config/products";
export const FREE_SHIPPING_THRESHOLD = site.freeShippingThreshold;
export const SHIPPING_FEE = site.shippingFee;
export const formatPrice = (cents: number) =>
  (cents / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
