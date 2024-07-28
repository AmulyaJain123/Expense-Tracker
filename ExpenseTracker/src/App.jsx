import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import SplitPage from "./pages/TrackPage";
import SplitCreate from "./pages/SplitCreate";
import SplitHome from "./pages/SplitHome";
import VaultHome from "./pages/VaultHome";
import VaultCreate from "./pages/VaultCreate";
import VaultView from "./pages/VaultView";
import DistributionPage from "./pages/DistributionPage";
import {
  vaultViewLoader,
  billViewLoader,
  transactionsLoader,
  distributionLoader,
  dashboardLoader,
} from "./store/firebase-context";
import ErrorPage from "./pages/ErrorPage";
import VaultBillView from "./pages/VaultBillView";
import BillNotFound from "./pages/BillNotFound";
import PageNotFound from "./pages/PageNotFound";
import TrackHome from "./pages/TrackHome";
import DashBoard from "./pages/DashBoard";
import TransactionCreate from "./pages/TransactionCreate";
import TransactionPage from "./pages/TransactionPage";
import AuthPage from "./pages/AuthPage";
import { commonLoader } from "./store/firebase-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },

      {
        path: "track",
        children: [
          {
            path: "",
            element: <TrackHome />,
          },
          {
            path: "dashboard",
            element: <DashBoard />,
            loader: dashboardLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "create",
            element: <TransactionCreate />,
            loader: commonLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "transactions",
            element: <TransactionPage />,
            loader: transactionsLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "distributions",
            element: <DistributionPage />,
            loader: distributionLoader,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "split",
        element: <SplitPage />,
        children: [
          {
            path: "",
            element: <SplitHome />,
          },
          {
            path: "create",
            element: <SplitCreate />,
            loader: commonLoader,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "vault",
        children: [
          {
            path: "",
            element: <VaultHome />,
          },
          {
            path: "create",
            element: <VaultCreate />,
            loader: commonLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "view",
            element: <VaultView />,
            loader: vaultViewLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "view/bill",
            element: <VaultBillView />,
            loader: billViewLoader,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
