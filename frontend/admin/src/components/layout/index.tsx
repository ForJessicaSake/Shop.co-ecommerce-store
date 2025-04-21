import { PropsWithChildren } from "react";
import Navbar from "../navigation/navbar";
import Sidebar from "../navigation/sidebar";

type LayoutProps = PropsWithChildren<{}>;
const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="overflow-x-hidden container px-8 lg:px-0">
      <div className="lg:hidden block">
        <Navbar />
      </div>
      <div className="flex flex-row gap-5">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default Layout;
