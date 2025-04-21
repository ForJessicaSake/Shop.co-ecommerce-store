import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./components/product";
import Login from "./components/auth/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./components/layout";
import NewProduct from "./components/product/new";
import ProductDetails from "./components/product/details";
import EditProduct from "./components/product/edit";
import { Toaster } from "sonner";
import Transactions from "./components/transactions";
import Users from "./components/users";
import ForgotPassword from "./components/auth/forgot-password";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/product/new" element={<NewProduct />} />
            <Route path="/product/details/:id" element={<ProductDetails />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/Users" element={<Users />} />
          </Routes>
          <Toaster />
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
