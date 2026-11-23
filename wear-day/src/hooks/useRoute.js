import { useEffect, useState } from "react";
const readRoute = () => {
  const hash = window.location.hash;
  if (!hash.startsWith("#/"))
    return { path: "/", query: "", anchor: hash.slice(1) };
  const [path, query = ""] = hash.slice(1).split("?");
  return { path, query, anchor: "" };
};
export default function useRoute() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const sync = () => setRoute(readRoute());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    if (route.anchor) document.getElementById(route.anchor)?.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [route]);
  return route;
}
