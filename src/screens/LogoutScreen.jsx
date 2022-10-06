import React from 'react'
import { AuthContext } from '../contexts/AuthContext';

export default function LogoutScreen() {
    const { onLogout } = React.useContext(AuthContext);
    React.useEffect(() => { onLogout() }, [])
    return (
        <>
        </>
    )
}
