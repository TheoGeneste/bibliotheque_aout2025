import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Login from "../Pages/Login";

const AuthWrapper = ({ children }) => {
    const { isConnected } = useContext(AuthContext);

    return <>{isConnected ? children : <Login />}</>;
}

export default AuthWrapper;