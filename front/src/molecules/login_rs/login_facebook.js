import React from 'react';
import FacebookLogin from 'react-facebook-login';
import useUser from '../../context/user';

function Login() {
    const userContext = useUser();

    const responseFacebook = (res) => {
        userContext.login_google(res.email, res.name)
    };

    return (
        <div>
            <FacebookLogin
                appId="140519454794610"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
            />
        </div>
    )
}

export default Login;