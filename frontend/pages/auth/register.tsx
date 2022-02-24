import {NextPage} from "next";
import {useState} from "react";
import {useAppDispatch} from "../../redux/hooks";
import {apiPost} from "../../helpers/api";
import {RegisterResponse} from "../../types/RegisterResponse";
import {showApiError, showErrorAlert, showSuccessfulAlert} from "../../helpers/alert";
import Router from "next/router";
import {ValidationErrors} from "../../types/ErrorResponse";
import ValidationError from "../../components/shared/ValidationError";
import {useCookies} from "react-cookie";

const Register: NextPage = () => {

    const [fullName, setFullName] = useState('');
    const [errors,setErrors] = useState<ValidationErrors>({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [cookies, setCookie] = useCookies(['jwt']);
    const dispatch = useAppDispatch();

    async function register() {
        const data = {fullName, email, password, passwordConfirmation};
        const response = await apiPost<RegisterResponse>("/auth/register", data).catch(showApiError(dispatch));
        if(!response){
            return;
        }
        if (response?.error) {
            setErrors(response?.error!.validation!)
            return showErrorAlert(dispatch, response.error.message);
        }
        setCookie('jwt', response?.jwt!, { path: '/' });
        await Router.push('/');
        showSuccessfulAlert(dispatch,"You successfully registered");
    }

    return <>
        <div className={'card'}>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input onChange={e => setFullName(e.target.value)} className="form-control"/>
                    <ValidationError errors={errors} field={"fullName"}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input onChange={e => setEmail(e.target.value)} className="form-control"/>
                    <div className="form-text">We&apos;ll never share your email with anyone else. Trust me, dude.</div>
                    <ValidationError errors={errors} field={"email"}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control"/>
                    <ValidationError errors={errors} field={"password"}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input onChange={e => setPasswordConfirmation(e.target.value)} type="password" className="form-control"/>
                    <ValidationError errors={errors} field={"passwordConfirmation"}/>
                </div>
                <button onClick={register} className="btn btn-primary">Submit</button>
            </div>
        </div>
    </>
}
export default Register;
