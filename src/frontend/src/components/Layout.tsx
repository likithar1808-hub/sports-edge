import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main
        className={`flex-1 ${fullWidth ? "" : "container mx-auto px-4 py-6"}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
