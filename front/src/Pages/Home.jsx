import { useContext } from "react";
import { Container } from "react-bootstrap"
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
    const {isConnected} = useContext(AuthContext);

    return <Container className="d-flex flex-column align-items-center justify-content-center gap-3">
        <h1>Bienvenue à la Bibliothèque</h1>
        <h3>vous etes connecté : {isConnected.toString()}</h3>
    </Container>;
}
 
export default Home;