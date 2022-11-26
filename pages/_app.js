import StoreProvider from "../components/context/StoreProvider";
import LoginRegister from "../components/common/LoginRegister";
import Footer from "../components/common/footer/Footer";
import AdminRoute from "../components/context/AdminRoute";
import useStore from "../components/context/useStore";
import SideMenu from "../components/common/SideMenu";
import GotoTop from "../components/common/GotoTop";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";
import "../styles/dashboard.css";
import "../styles/category.css";
import "../styles/globals.css";
import "../styles/details.css";
import "../styles/header.css";
import Head from "next/head";
import "../styles/home.css";
import "../styles/user.css";

function Layout({ Component, pageProps }) {
  const router = useRouter();
  const noFooter = ["/loading"];
  const store = useStore();

  return (
    <div>
      <Head>
        <title>{store?.siteInfo?.name}</title>
      </Head>
      {router.pathname.startsWith("/admin") ? (
        <AdminRoute>
          <Component {...pageProps} />
        </AdminRoute>
      ) : (
        <Component {...pageProps} />
      )}

      <GotoTop />
      {!noFooter.includes(router.pathname) &&
        !router.pathname.includes("/admin") && <Footer />}
      {store?.showLoginRegister && <LoginRegister />}
      <SideMenu />
      {store?.alert.msg && <Alert />}
      {store?.loading && <Spinner />}
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
