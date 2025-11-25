import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
    const navigate = useNavigate();
    const { isConnected, setIsConnected, setRole, role } = useContext(AuthContext);

    return <>
        <Navbar expand="lg" className="bg-body-dark border-bottom border-2 border-white mb-3" variant='dark'>
            <Container fluid>
                <Navbar.Brand onClick={() => { navigate('/') }}>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => { navigate('/') }}>Accueil</Nav.Link>
                        {role === "ADMIN" && <>
                            <Nav.Link onClick={() => { navigate('/admin') }}>Admin</Nav.Link>
                        </>}
                    </Nav>
                    <Nav className="d-flex justify-content-end gap-2">
                        {isConnected ?
                            <>
                                <IconButton sx={{ color: "white" }} size='large' onClick={() => { navigate('/profile') }}><AccountCircleIcon /> </IconButton>
                                <IconButton color='error' size='large' onClick={() => { setIsConnected(false); localStorage.removeItem("token"); setRole('USER') }}><LogoutIcon /> </IconButton>
                            </>
                            : <>
                                <Button variant='primary' onClick={() => { navigate('/login') }}>Connexion</Button>
                                <Button variant="info" onClick={() => { navigate('/register') }}>Inscription</Button>
                            </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>;
}

export default NavBar;