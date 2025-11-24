import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {
    return <Container className="d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
        <div className="p-5 border border-3 border-white rounded">
            <Form>
                <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                        Email
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="email@example.com" />
                    </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                        Password
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>
                <Button type="submit" className="col-12">
                    Connexion
                </Button>
            </Form>
        </div>
    </Container>;
}

export default Login;