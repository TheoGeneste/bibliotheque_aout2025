import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import usersService from "../Services/usersService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({
        login: "",
        password: "",
        lastname: "",
        firstname: "",
        email : "",
        street_number : "",
        street_name : "",
        city : "",
        postal_code : "",
        additional_adress : "",
        confirm_password : ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // ...user => copier coller les ancinnes valeur de user
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!user.lastname){
                return toast.error('Le nom est obligatoire')
            }
            if(!user.firstname){
                return toast.error('Le prénom est obligatoire')
            }
            if(!user.email){
                return toast.error('L\'email est obligatoire')
            }
            if(!user.login){
                return toast.error('Le login est obligatoire')
            }
            if(!user.password){
                return toast.error('Le mot de passe est obligatoire')
            }
            if(!user.confirm_password){
                return toast.error('La confirmation de mot de passe est obligatoire')
            }

            if (user.password !== user.confirm_password) {
                return toast.error('Les mots de passe doivent correspondre')
            }

            if(user.postal_code && user.postal_code.length != 5){
                return toast.error('Le code postal doit être composé de 5 chiffres')
            }
            if(user.postal_code && new RegExp("^\\d+$").test(user.postal_code) == false){
                return toast.error('Le code postal doit être composé de 5 chiffres')
            }
            
            
            const response = await usersService.createUser(user);
            toast.success('Inscription réussi');
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    return <Container className="d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
        <div className="p-5 border border-3 border-white rounded col-sm-12 col-md-6 col-lg-4"  style={{maxHeight : "70vh", overflowY : 'auto'}}>
            <h1>Inscription</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} className="mb-3" controlId="lastname">
                    <Form.Label column sm="12">
                        Nom
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Dupont" name="lastname" value={user.lastname} onChange={handleChange} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="firstname">
                    <Form.Label column sm="12">
                        Prenom
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Jean" name="firstname" value={user.firstname} onChange={handleChange} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="email">
                    <Form.Label column sm="12">
                        Email
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control type="email" placeholder="jean.dupont@gmail.com" name="email" value={user.email} onChange={handleChange} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="streetnumber">
                    <Form.Label column sm="12">
                        N° du rue
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control type="number" placeholder="1" name="street_number" value={user.street_number} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="streetname">
                    <Form.Label column sm="12">
                        Nom de la rue
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Rue du potier" name="street_name" value={user.street_name} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="city">
                    <Form.Label column sm="12">
                        Ville
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Lille" name="city" value={user.city} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="postalcode">
                    <Form.Label column sm="12">
                        Code Postal
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control minLength={5} maxLength={5} placeholder="59000" name="postal_code" value={user.postal_code} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="additionaladress">
                    <Form.Label column sm="12">
                        Complément d'adresse
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="bis,ter..." name="additional_adress" value={user.additional_adress} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="login">
                    <Form.Label column sm="12">
                        Login
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="email@example.com" name="login" value={user.login} onChange={handleChange} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="password">
                    <Form.Label column sm="12">
                        Password
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="confirmpassword">
                    <Form.Label column sm="12">
                        Confirmer Password
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control type="password" placeholder="Confirm Password" name="confirm_password" value={user.confirm_password} onChange={handleChange} required/>
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