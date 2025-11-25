import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import NotFound from "../Pages/NotFound";

const AdminWrapper = ({children}) => {
    const {isConnected,role} = useContext(AuthContext);

    return <>
        {isConnected && role === "ADMIN" ? children : <NotFound />}
    </>;
}
 
export default AdminWrapper;