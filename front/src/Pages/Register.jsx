import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import usersService from "../Services/usersService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({
        login : "",
        password: ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        // ...user => copier coller les ancinnes valeur de user
        setUser({...user, [name] : value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await usersService.createUser(user);
            toast.success('Inscription réussi');
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    return <Container className="d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
        <div className="p-5 border border-3 border-white rounded">
            <h1>Inscription</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                        Login
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="email@example.com" name="login" value={user.login} onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                        Password
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Button type="submit" className="col-12">
                    S'inscrire
                </Button>
            </Form>
        </div>
    </Container>;
}

export default Register;