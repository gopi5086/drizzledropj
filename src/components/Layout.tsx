import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TopContactBar from "./TopContactBar";


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Make a stacking context for sticky bars */}
      <div className="relative z-50">
        <TopContactBar />
        <Navbar />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
