import { useState,createContext,useEffect } from "react";
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext({
    isConnected : false,
    setIsConnected : () => {}
});

// Crée mon provider qui appelle mon contexte
// props children c'est pour récupérer tout les enfants de mon provider
export const AuthProvider = ({children}) => {
    const [isConnected, setIsConnected] = useState(false);

    // Vérifier le token au chargement de ma page
    useEffect(() => {
        const token = localStorage.getItem("token");
        // Vérifier que le token existe et est valide
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.exp > Date.now() / 1000) {
                setIsConnected(true);
            }else{
                setIsConnected(false)
                localStorage.removeItem('token');
            }
        }
    }, [])

    return <AuthContext.Provider value={{isConnected,setIsConnected}}>
        {children}
    </AuthContext.Provider>
}