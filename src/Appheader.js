import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register' || location.pathname=== '/public'|| location.pathname=== '/resultform') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }

    }, [location])
    return (
        <div>
            {showmenu &&
                <div className="header">

                    <Link to={'/'}>Home</Link>
                    <Link to={'/customer'}>Genitori</Link>
                    <Link to={'/allievi'}>Allievi</Link>
                    <span style={{ marginLeft: '30%' }}>Welcome <b>{displayusername}</b></span>
                    <div id="logout">
                    <Link style={{ float: 'right' }} to={'/login'}>Logout</Link>
                    </div>
                    
                </div>
            }
        </div>
    );
}

export default Appheader;