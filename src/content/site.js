// De bewerkbare inhoud staat in site.json en wordt beheerd via het ECRN-paneel (aparte repo).
// Foto's: site.json bevat per plek een bestandsnaam uit src/assets/img/.
import data from "./site.json";

const files = import.meta.glob("../assets/img/*.{webp,jpg,jpeg,png}", { eager: true, import: "default" });
const byName = Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split("/").pop(), url]));

export const company = data.company;
export const content = data.content;
export const img = Object.fromEntries(Object.entries(data.images).map(([slot, name]) => [slot, byName[name]]));

export const LOCALES = [
  { code: "nl", label: "NL", name: "Nederlands", path: "/" },
  { code: "fr", label: "FR", name: "Français", path: "/fr" },
  { code: "en", label: "EN", name: "English", path: "/en" },
  { code: "tr", label: "TR", name: "Türkçe", path: "/tr" },
];
