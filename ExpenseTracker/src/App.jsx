import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import SplitPage from "./pages/SplitPage";
import SplitCreate from "./pages/SplitCreate";
import SplitHome from "./pages/SplitHome";
import VaultHome from "./pages/VaultHome";
import VaultCreate from "./pages/VaultCreate";
import VaultView from "./pages/VaultView";
import { vaultViewLoader, billViewLoader } from "./store/firebase-context";
import ErrorPage from "./pages/ErrorPage";
import VaultBillView from "./pages/VaultBillView";
import BillNotFound from "./pages/BillNotFound";
import PageNotFound from "./pages/PageNotFound";

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
            errorElement: <BillNotFound />,
          },
        ],
      },
    ],
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
