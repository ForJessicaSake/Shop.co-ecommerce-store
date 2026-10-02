import { PropsWithChildren } from "react";
import Footer from "../footer";
import Navbar from "../navbar";
import Newsletter from "../newsletter";

type LayoutProps = PropsWithChildren<{}>;
const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      <Navbar />
      {children}
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Layout;
