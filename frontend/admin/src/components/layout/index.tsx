import { PropsWithChildren } from "react";
import Navbar from "../navbar";

type LayoutProps = PropsWithChildren<{}>;
const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="overflow-x-hidden px-8 lg:px-16 container">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
