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



const DeleteAuthorModal = ({ open, setOpen, fetch, currentAuthor }) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(author);
            
            const response = await authorsService.deleteAuthor(author.id);
            fetch();
            toast.success("L'auteur " + author.lastname + " " + author.firstname + " à bien été supprimé")
            handleClose();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        console.log(currentAuthor);
        
        setAuthor(currentAuthor)
    }, [currentAuthor])

    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center border-bottom border-bottom-2 border-black mb-2'>
                Êtes-vous sûre de vouloir supprimer l'auteur {author.firstname} {author.lastname}
            </Typography>
            <Form onSubmit={handleSubmit} className='d-flex justify-content-between'>
                <Button variant='danger' className='col-5' onClick={handleClose}>Annuler</Button>
                <Button type='submit' className='darkorange col-5'>Supprimer</Button>
            </Form>
        </Box>
    </Modal>
        ;
}

export default DeleteAuthorModal;