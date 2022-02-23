import {NextPage} from "next";
import {useState} from "react";
import {useAppDispatch} from "../../redux/hooks";
import {apiPost} from "../../helpers/api";
import {RegisterResponse} from "../../types/RegisterResponse";
import {showApiError, showErrorAlert, showSuccessfulAlert} from "../../helpers/alert";
import Router from "next/router";

const Register: NextPage = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const dispatch = useAppDispatch();

    async function register() {
        const data = {fullName, email, password, passwordConfirmation};
        const response = await apiPost<RegisterResponse>("/auth/register", data).catch(showApiError(dispatch));
        if (response?.error) {
            return showErrorAlert(dispatch, response.error.message);
        }

        await Router.push('/');
        showSuccessfulAlert(dispatch,"You successfully registered");
    }

    return <>
        <div className={'card'}>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input onChange={e => setFullName(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input onChange={e => setEmail(e.target.value)} className="form-control"/>
                    <div className="form-text">We'll never share your email with anyone else. Trust me, dude.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input onChange={e => setPasswordConfirmation(e.target.value)} type="password" className="form-control"/>
                </div>
                <button onClick={register} className="btn btn-primary">Submit</button>
            </div>
        </div>
    </>
}
export default Register;
