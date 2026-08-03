import { useEffect, type ReactNode } from "react";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import { usePuterStore } from "~/store/usePuterStore";

export function DocumentLayout({ children }: { children: ReactNode }) {
  const { init } = usePuterStore();

  // Initialize Puter auth/storage store on layout mount.
  // FIXME: Automatic navigation to /auth for unauthenticated users is disabled.
  useEffect(() => {
    init();
  }, [init]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script src="https://js.puter.com/v2/" async defer></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
