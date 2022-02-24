import type {NextPage} from 'next'
import React, {useState, useEffect} from 'react';
import {apiGet} from "../helpers/api";
import {useAppDispatch} from "../redux/hooks";
import {showApiError, showErrorAlert} from "../helpers/alert";
import {UserListResponse} from "../types/UserListResponse";
import {User} from "../types/objects/User";
import {useCookies} from "react-cookie";

const Home: NextPage = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [cookies] = useCookies(['jwt']);
    const dispatch = useAppDispatch();
    useEffect(() => {
        loadUsers();
    }, []);


    async function loadUsers(): Promise<void> {
        const response = await apiGet<UserListResponse>("/users").catch(showApiError(dispatch));
        if(!response){
            return;
        }
        if (response?.error) {
            return showErrorAlert(dispatch, response.error.message);
        }
        setUsers(response?.users!);
    }
    if(!cookies.jwt){
        return <div>You can&apos;t see the data on this page until you&apos;re logged in!</div>
    }

    if ( users.length == 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <b>These are visible only for those who logged in.</b>
        </div>
    )
}

export default Home
