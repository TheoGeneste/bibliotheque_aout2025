import { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import AuthorsTab from "../Components/AuthorsTab";

const Admin = () => {
    const [key, setKey] = useState('authors');

    return <Container className="d-flex flex-column align-items-center justify-content-center gap-3">
        <h1>Admin panel</h1>
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 col-12"
            
            fill
        >
            <Tab eventKey="authors" title="Auteurs">
                <AuthorsTab />
            </Tab>
            <Tab eventKey="books" title="Livres">
                Livres
            </Tab>
            <Tab eventKey="editors" title="Editeurs" >
               Editeurs
            </Tab>
            <Tab eventKey="genres" title="Genres" >
               Genres
            </Tab>
            <Tab eventKey="loaners" title="Emprunteurs" >
               Emprunteurs
            </Tab>
            <Tab eventKey="loans" title="Emprunts" >
               Emprunts
            </Tab>
            <Tab eventKey="types" title="Types" >
               Types
            </Tab>
            <Tab eventKey="users" title="Utilisateurs" >
               Utilisateurs
            </Tab>
        </Tabs>
    </Container>;
}

export default Admin;