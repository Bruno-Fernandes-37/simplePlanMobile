import React from 'react'
import { AuthContext } from '../contexts/AuthContext';


/**
 * logout view to put the logout button in the navbar, redirects to the login screen
 */
export default function LogoutScreen() {
    const { onLogout } = React.useContext(AuthContext);
    React.useEffect(() => { onLogout() }, [])
    return (
        <>
        </>
    )
}
