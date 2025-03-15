import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "#2026Live" },
    { name: "description", content: "New Year's Eve 2026 Coverage" },
  ];
}

export default function Home() {
  return <Welcome />;
}
