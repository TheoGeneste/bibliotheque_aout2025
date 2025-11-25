import { useState,createContext,useEffect } from "react";
import {jwtDecode} from 'jwt-decode';
import axios from "axios";

export const AuthContext = createContext({
    isConnected : false,
    setIsConnected : () => {},
    role : 'USER',
    setRole : () => {}
});

// Crée mon provider qui appelle mon contexte
// props children c'est pour récupérer tout les enfants de mon provider
export const AuthProvider = ({children}) => {
    const [isConnected, setIsConnected] = useState(false);
    const [role,setRole] = useState('USER');

    // Vérifier le token au chargement de ma page
    useEffect(() => {
        const token = localStorage.getItem("token");
        // Vérifier que le token existe et est valide
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.exp > Date.now() / 1000) {
                setIsConnected(true);
                setRole(decoded.role);
                axios.defaults.headers["authorization"] ='Bearer '+ token;
            }else{
                setIsConnected(false)
                setRole('USER')
                localStorage.removeItem('token');
            }
        }
    }, [])

    return <AuthContext.Provider value={{isConnected,setIsConnected,role,setRole}}>
        {children}
    </AuthContext.Provider>
}