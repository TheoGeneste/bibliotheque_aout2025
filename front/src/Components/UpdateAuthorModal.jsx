import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import authorsService from '../Services/authorsService';
import { toast } from 'react-toastify';
import moment from 'moment';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'warning.main',
    p: 4,
};



const UpdateAuthorModal = ({ open, setOpen, fetch, currentAuthor }) => {
    const [author, setAuthor] = useState({
        firstname: "",
        lastname: "",
        born_at: "",
        die_at: ""
    })

    const handleClose = () => {
        setOpen(false)
        setAuthor({
            firstname: "",
            lastname: "",
            born_at: "",
            die_at: ""
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor({ ...author, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!author.lastname) {
                return toast.error("Le nom est obligatoire")
            }
            if (!author.firstname) {
                return toast.error("Le prénom est obligatoire")
            }
            const response = await authorsService.updateAuthor(author);

            fetch();
            toast.success("L'auteur " + author.lastname + " " + author.firstname + " à bien été modifié")
            handleClose();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        console.log(currentAuthor);
        
        setAuthor({...currentAuthor,
            born_at : moment(currentAuthor.born_at).format('YYYY-MM-DD'),
            die_at : moment(currentAuthor.die_at).format('YYYY-MM-DD'),
        })
    }, [currentAuthor])

    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center border-bottom border-bottom-2 border-black mb-2'>
                Modification de l'auteur
            </Typography>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="lastname">
                    <Form.Label>Nom *</Form.Label>
                    <Form.Control placeholder="Dupont" name='lastname' value={author.lastname} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="firstname">
                    <Form.Label>Prénom *</Form.Label>
                    <Form.Control placeholder="Jean" name='firstname' value={author.firstname} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="born_at">
                    <Form.Label>Date de naissance</Form.Label>
                    <Form.Control type='date' name='born_at' value={author.born_at} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="die_at">
                    <Form.Label>Date de décés</Form.Label>
                    <Form.Control type='date' name='die_at' value={author.die_at} onChange={handleChange} />
                </Form.Group>
                <Button type='submit' className='darkorange col-12'>Modifier</Button>
            </Form>
        </Box>
    </Modal>
        ;
}

export default UpdateAuthorModal;