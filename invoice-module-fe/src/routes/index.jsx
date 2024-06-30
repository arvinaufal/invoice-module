import {
    createBrowserRouter
} from "react-router-dom";
import InvoicePage from "../components/pages/InvoicePage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <InvoicePage/>,
    },
]);