import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Users from "./pages/users/Users";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/login";
import "./styles/global.scss";
import Product from "./pages/product/Product";
import Customers from "./pages/customers/Customers";
import Categories from "./pages/categories/Categories";
import Subcategories from "./pages/subcategories/SubCategories";
//import User from "./pages/user/User";
//import Product from "./pages/product/Product";
/*  import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"; 


const queryClient = new QueryClient(); */

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },  
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/subcategories",
          element: <Subcategories />,
        },
        {
          path: "/orders",
          element: <Customers />,
        },
        {
          path: "/customers/:id",
          element: <Customers />,
        },

        {
          path: "/products/:id",
          element: <Product />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
