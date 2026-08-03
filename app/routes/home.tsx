import { useNavigate } from "react-router";
import Header from "~/components/Header";
import ResumeList from "~/components/ResumeList";
import WelcomeSection from "~/components/WelcomeSection";
import { usePuterStore } from "~/store/usePuterStore";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Resume Analyzer" },
    { name: "description", content: "AI Resume Analyzer" },
  ];
}

export default function Home() {
  const { auth, isLoading } = usePuterStore();
  const navigate = useNavigate();

  // FIXME: Automatic navigation to /auth for unauthenticated users has been turned off.
  // Unauthenticated users can now view the home page without being redirected to login.
  /*
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated, isLoading, navigate]);
  */

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Header />
      {!isLoading && !auth.isAuthenticated && (
        <div className="bg-amber-500 border-b border-amber-500/20 px-4 py-2.5 text-center text-sm text-amber-200 backdrop-blur-sm">
          <p>
            <span className="font-semibold">Note:</span> Automatic navigation to
            the auth page is turned off. You are viewing the app in guest mode.
          </p>
        </div>
      )}
      <WelcomeSection />
      <ResumeList />
    </main>
  );
}
