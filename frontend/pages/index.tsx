import type {NextPage} from 'next'
import React, {useState, useEffect} from 'react';
import {apiGet} from "../helpers/api";
import {useAppDispatch} from "../redux/hooks";
import {showApiError, showErrorAlert} from "../helpers/alert";
import {UserListResponse} from "../types/UserListResponse";
import {User} from "../types/objects/User";

const Home: NextPage = () => {

    const [users, setUsers] = useState<User[]>([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        loadUsers();
    }, []);


    async function loadUsers(): Promise<void> {
        const response = await apiGet<UserListResponse>("/users").catch(showApiError(dispatch));
        if (response?.error) {
            return showErrorAlert(dispatch, response.error.message);
        }
        console.log(response);
        setUsers(response?.users!);
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
        </div>
    )
}

export default Home
