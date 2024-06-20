import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import SplitPage from "./pages/SplitPage";
import SplitCreate from "./pages/SplitCreate";
import SplitHome from "./pages/SplitHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
