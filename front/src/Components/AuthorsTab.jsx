import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { toast } from "react-toastify";
import AuthorsService from "../Services/AuthorsService";
import moment from 'moment'
import { Button, Container } from "react-bootstrap";
import CreateAuthorModal from "./CreateAuthorModal";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateAuthorModal from "./UpdateAuthorModal";
import DeleteAuthorModal from "./DeleteAuthorModal";

const AuthorsTab = () => {
    const [authors, setAuthors] = useState([]);
    const [open, setOpen] = useState(false);
    const [authorSelected, setAuthorSelected] = useState({});
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete,setOpenDelete] = useState(false);

    const columns = [
        { field: 'firstname', headerName: 'Prénom', flex: 1 },
        { field: 'lastname', headerName: 'Nom', flex: 1 },
        { field: 'born_at', headerName: 'Date de naissance', valueGetter: (value, row) => row.born_at ? moment(row.born_at).format("DD/MM/YYYY") : "NR", flex: 1 },
        { field: 'die_at', headerName: 'Date de décés', valueGetter: (value, row) => row.die_at ? moment(row.die_at).format("DD/MM/YYYY") : "NR", flex: 1 },
        {
            field: 'actions', headerName: 'Actions', renderCell: (value) => <>
                <Tooltip title="Modification de l'auteur">
                    <IconButton color="primary" onClick={() => {
                        setAuthorSelected(value.row);
                        setOpenUpdate(true);
                    }}><EditIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Suppression de l'auteur">
                    <IconButton color="error" onClick={() => {
                        setAuthorSelected(value.row);
                        setOpenDelete(true);
                    }}><DeleteIcon /></IconButton>
                </Tooltip>
            </>
            , flex: 0.5, sortable: false, filterable: false
        },
    ]
    const paginationModel = { page: 0, pageSize: 10 };


    const fetchAuthors = async () => {
        try {
            const response = await AuthorsService.getAllAuthors();
            console.log(response.data);
            
            setAuthors(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchAuthors();
    }, [])

    return <Container className="d-flex flex-column align-items-end gap-3">
        <Button className="darkorange" onClick={() => { setOpen(true) }}>Ajouter</Button>
        <Paper sx={{ width: '100%' }}>
            <DataGrid
                rows={authors}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
            />
        </Paper>
        <CreateAuthorModal open={open} setOpen={setOpen} fetch={fetchAuthors} />
        <UpdateAuthorModal open={openUpdate} setOpen={setOpenUpdate} fetch={fetchAuthors} currentAuthor={authorSelected} />
        <DeleteAuthorModal open={openDelete} setOpen={setOpenDelete} fetch={fetchAuthors} currentAuthor={authorSelected} />
    </Container>;
}

export default AuthorsTab;