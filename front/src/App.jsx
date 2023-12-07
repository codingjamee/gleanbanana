import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import "../src/styles/style.css";
import NotFound from "./components/pages/error/NotFound";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const OrderedDetail = lazy(() =>
  import("./components/pages/order/OrderedDetail")
);
const Loading = lazy(() => import("./components/pages/loading/load"));
const Layout = lazy(() => import("./components/layout/Layout"));
const Home = lazy(() => import("./components/pages/home/Home"));
const Login = lazy(() => import("./components/pages/login/Login"));
const Join = lazy(() => import("./components/pages/join/Join"));
const Like = lazy(() => import("./components/pages/like/Like"));
const MyPage = lazy(() => import("./components/pages/mypage/MyPage"));
const Order = lazy(() => import("./components/pages/order/Order"));
const Products = lazy(() => import("./components/pages/products/Products"));
const Product = lazy(() => import("./components/pages/products/Product"));
const Carts = lazy(() => import("./components/pages/cart/Carts"));
const Purchase = lazy(() => import("./components/pages/purchase/Purchase"));
const About = lazy(() => import("./components/pages/about/About"));

function App() {
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("user Login status changed!!!!", userId);
    if (!userId) navigate("/");
  }, [userId]);
  //로그인 인증 로직
  //리프레시 토큰이 있으면 요청 url을 통해
  //유저정보 id 를 받아옴!

  return (
    <div className="app">
      <Suspense fallback={<Loading />}>
        <div className="container">
          <header className="header">
            <Layout />
          </header>
          <main className="main">
            <Routes>
              <Route path="/" exact element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/like" element={<Like />} />
              <Route path="/cart" element={<Carts />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/order" element={<Order />} />
              <Route path="/order/:orderId" element={<OrderedDetail />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="footer">footer입니다</footer>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
