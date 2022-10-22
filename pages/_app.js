import Footer from "../components/common/footer/Footer";
import GotoTop from "../components/common/GotoTop";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/home.css";
import "../styles/details.css";
import "../styles/category.css";
import { useRouter } from "next/router";
import StoreProvider from "../components/context/storeProvider";
import LoginRegister from "../components/common/LoginRegister";
import useStore from "../components/context/useStore";
import Alert from "../components/common/Alert";

function Layout({ Component, pageProps }) {
  const router = useRouter();
  const noFooter = ["/login", "/register"];
  const store = useStore();

  return (
    <div>
      <Component {...pageProps} />
      <GotoTop />
      {!noFooter.includes(router.pathname) && <Footer />}
      {store?.showLoginRegister && <LoginRegister />}
      {store?.alert.msg && <Alert />}
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout Component={Component} pageProps={pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
