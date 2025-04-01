import { PropsWithChildren } from "react";
import Footer from "../footer";
import Navbar from "../navbar";
import Newsletter from "../newsletter";

type LayoutProps = PropsWithChildren<{}>;
const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      {children}
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Layout;
