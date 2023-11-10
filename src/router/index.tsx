import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MarkDown from "@/MarkDownDemo";
export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/md",
        element: <MarkDown />,
      },
    ],
  },
]);
