import { PropsWithChildren } from "react";
import Footer from "../footer";

type LayoutProps = PropsWithChildren<{}>;

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="px-16 py-10 space-y-10 container mx-auto">
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
