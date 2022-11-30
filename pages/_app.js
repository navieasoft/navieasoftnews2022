const AdminRoute = dynamic(() => import("../components/context/AdminRoute"));
const SideMenu = dynamic(() => import("../components/common/SideMenu"));
import useStore from "../components/context/useStore";
import GotoTop from "../components/common/GotoTop";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "../styles/dashboard.css";
import "../styles/category.css";
import "../styles/globals.css";
import "../styles/details.css";
import "../styles/header.css";
import Head from "next/head";
import "../styles/home.css";
import "../styles/user.css";
const StoreProvider = dynamic(
  () => import("../components/context/StoreProvider"),
  { ssr: false }
);
const LoginRegister = dynamic(
  () => import("../components/common/LoginRegister"),
  { ssr: false }
);
const Footer = dynamic(() => import("../components/common/footer/Footer"), {
  ssr: false,
});

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
