import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

import Home from "@/Home";
import { LOCALES } from "@/content/site";
import { I18nProvider } from "@/lib/i18n";

// Offline-versie (file://) gebruikt hash-URL's; online: /, /fr, /en, /tr onder de GitHub Pages-basis.
const offline = import.meta.env.MODE === "offline";
const Router = offline ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <Router basename={offline ? undefined : import.meta.env.BASE_URL}>
      <I18nProvider>
        <Routes>
          {LOCALES.map((l) => (
            <Route key={l.code} path={l.path} element={<Home />} />
          ))}
          <Route path="*" element={<Home />} />
        </Routes>
      </I18nProvider>
    </Router>
  );
}
