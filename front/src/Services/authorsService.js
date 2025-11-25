import axios from "axios";

const getAllAuthors = () => {
    return axios.get(import.meta.env.VITE_URL_API+"/authors");
}

const createAuthor = (author) => {
    return axios.post(import.meta.env.VITE_URL_API+"/authors", author);
}

const updateAuthor = (author) => {
    return axios.put(import.meta.env.VITE_URL_API+"/authors/"+author.id, author);
}
const deleteAuthor = (id) => {
    return axios.delete(import.meta.env.VITE_URL_API+"/authors/"+id);
}


export default {
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}