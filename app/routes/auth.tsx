import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/store/usePuterStore";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Resume Analyzer | Auth" },
    { name: "description", content: "Login your account" },
  ];
}

const Auth = () => {
  const { isLoading, auth, error } = usePuterStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const next = searchParams.get("next") || "/";
  const navigate = useNavigate();

  // FIXME: Automatic navigation to /auth for unauthenticated users has been turned off on the Home route.
  // When users explicitly visit /auth and authenticate successfully, they are redirected to `next`.
  useEffect(() => {
    if (!isLoading && auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, isLoading, next, navigate]);

  return (
    <main
      className="
        bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen
        flex items-center justify-center"
    >
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div>
            <h1>Welcome</h1>
            <h2>Log in to continue your job journey</h2>
          </div>
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse" disabled>
                Checking status...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>Log out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Log in</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
