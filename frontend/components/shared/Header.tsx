import Link from "next/link";
import {useCookies} from "react-cookie";
import React, {useState} from "react";
import {parseJwt} from "../../helpers/jwt";
import Router from "next/router";

const Header = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const [userName, setUserName] = useState(null);
    if (cookies.jwt && !userName) {
        const data = parseJwt(cookies.jwt);
        setUserName(data.fullName);
    }

    async function logout(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        removeCookie('jwt');
        setUserName(null);
        await Router.push('/');
    }

    return <>
        <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
            <div className="container-fluid">
                <Link href={"/"}>
                    <a className="navbar-brand" href={"/"}>Games DB</a>
                </Link>
                <ul className={'navbar-nav me-auto mb-2'}>
                    <li className={'nav-item'}>
                        <Link href={"/"}>
                            <a className={'nav-link'}>Home</a>
                        </Link>
                    </li>
                    {!userName &&
                        <li className={'nav-item'}>
                            <Link href={"/auth/login"}>
                                <a className={'nav-link'}>Login</a>
                            </Link>
                        </li>
                    }
                    {!userName &&
                        <li className={'nav-item'}>
                            <Link href={"/auth/register"}>
                                <a className={'nav-link'}>Register</a>
                            </Link>
                        </li>
                    }
                </ul>
            </div>
            {userName && <div className={"welcome"}>Welcome <b>{userName}</b>, to logout click <a onClick={e => logout(e)} href="/logout">here</a></div>}
        </nav>
    </>
}

export default Header;
