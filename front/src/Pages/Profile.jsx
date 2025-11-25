import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import usersService from "../Services/usersService";

const Profile = () => {
    const [user,setUser] = useState({});

    const fetchMe = async () => {
        try {
            const response = await usersService.getMe();
            console.log(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchMe()
    }, [])
    
    return <>
        <h1>Profile</h1>
    </>;
}
 
export default Profile;