import { createMemoryRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Settings from "@/pages/Settings";
import Examples from "@/pages/Examples";
import UpdaterTest from "@/pages/UpdaterTest";
import NotFound from "@/pages/NotFound";

export const router = createMemoryRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "examples",
        element: <Examples />,
      },
      {
        path: "updater-test",
        element: <UpdaterTest />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
