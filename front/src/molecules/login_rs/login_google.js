import React from 'react';
import { GoogleLogin } from 'react-google-login';
import useUser from '../../context/user';


const clientId = '814535166282-uj0rs7jnubeqglcaie0lm4j0gg8625pi.apps.googleusercontent.com';

function Login() {
    const userContext = useUser();

    const onSuccess = (res) => {
        userContext.login_google(res.profileObj.email, res.profileObj.name)
        
    };

    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                autoLoad={false}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ maringTop: '100px' }}
                isSignedIn={false}
            />
        </div>
    )
}

export default Login;
