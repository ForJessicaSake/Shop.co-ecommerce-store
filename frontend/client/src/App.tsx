import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/home";
import Layout from "./components/layout";
import ProductDetails from "./components/product/details";
import Cart from "./components/cart";
import Products from "./components/product";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Login from "./components/auth/client/login";
import SignUp from "./components/auth/client/signup";
import Orders from "./components/orders";
import ForgotPassword from "./components/auth/client/forgot-password";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/product/details/:id" element={<ProductDetails />} />
          </Routes>
          <Toaster />
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
