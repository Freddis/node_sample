const Header = () => {
    return <>
        <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
            <div className="container-fluid">
                <a className="navbar-brand" href={"/"}>Games DB</a>
                <ul className={'navbar-nav me-auto mb-2'}>
                    <li className={'nav-item'}>
                        <a className={'nav-link'} href={"/"}>Home</a>
                    </li>
                    <li className={'nav-item'}>
                        <a className={'nav-link'} href={"/auth/signIn"}>Sign In</a>
                    </li>
                    <li className={'nav-item'}>
                        <a className={'nav-link'} href={"/auth/register"}>Register</a>
                    </li>
                </ul>
            </div>
        </nav>
    </>
}

export default Header;
