import Header from "~/components/Header";
import WelcomeSection from "~/components/WelcomeSection";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Resume Analyzer" },
    { name: "description", content: "AI Resume Analyzer" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Header />

      <WelcomeSection />
    </main>
  );
}
