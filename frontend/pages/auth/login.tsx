import {NextPage} from "next";
import {useState} from "react";
import {useAppDispatch} from "../../redux/hooks";
import {apiPost} from "../../helpers/api";
import {LoginResponse} from "../../types/LoginResponse";
import {showApiError, showErrorAlert, showSuccessfulAlert} from "../../helpers/alert";
import Router from "next/router";
import {ValidationErrors} from "../../types/ErrorResponse";
import ValidationError from "../../components/shared/ValidationError";
import {useCookies} from "react-cookie";

const Register: NextPage = () => {

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies(['jwt']);
    async function login() {
        const data = {email, password};
        const response = await apiPost<LoginResponse>("/auth/login", data).catch(showApiError(dispatch));
        if (response?.error) {
            setErrors(response?.error!.validation!)
            return showErrorAlert(dispatch, response.error.message);
        }

        setCookie('jwt', response?.jwt!, { path: '/' });
        await Router.push('/');
        showSuccessfulAlert(dispatch, "You successfully registered");
    }

    return <>
        <div className={'card'}>
            <div className="card-body">

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input onChange={e => setEmail(e.target.value)} className="form-control"/>
                    <ValidationError errors={errors} field={"email"}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control"/>
                    <ValidationError errors={errors} field={"password"}/>
                </div>

                <button onClick={login} className="btn btn-primary">Submit</button>
            </div>
        </div>
    </>
}
export default Register;
