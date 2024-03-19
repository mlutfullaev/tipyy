import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import TryCustom from "./Pages/TryCustom/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/custom",
    element: <TryCustom/>,
  },
]);



export default router;