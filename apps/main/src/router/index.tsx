import { createBrowserRouter } from "react-router-dom";
import Index from "../views/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
]);

export default router;
