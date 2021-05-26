import { createContext, useContext, useState, useCallback, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useGoogleLogout } from 'react-google-login';
import { useGoogleApi } from 'react-gapi'
import { FormButton } from 'semantic-ui-react';


function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

const UserContext = createContext();

export function UserProvider({ children }) {
    const gapi = useGoogleApi({ scopes: ['profile',], })
    const clientId = '814535166282-uj0rs7jnubeqglcaie0lm4j0gg8625pi.apps.googleusercontent.com';
    const history = useHistory();
    const [token, setToken] = useLocalStorage('token')
    const [user, setUser] = useLocalStorage('user')
    const [userProfile, setUserProfile] = useState({})
    const [msg, setMsg]= useState({
        registerOk:"",
        loginOK:"",
        loginNotOK:"",
      })
    const [userReviews, setUserReviews] = useState(null)
    const [allUsers, setAllUsers] = useState(null)

  function register(data){
      fetch('http://localhost:5000/users', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "name": `${data.firstname} ${data.lastname}`,
            "email": data.email,
            "password": data.password,
          })
        })
        .then(response => response.json())
        .then(setMsg({registerOk : "Please, confirm your registration by checking your email"}))
        .then(data => {
            if(data.statusCode && data.statusCode === 200)
              history.push({pathname:'/login'})
        })
        .catch(err => console.log("error"))  
  }

  const login = useCallback((data) => {
    fetch('http://localhost:5000/auth/login', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        })
      })
      .then(response => response.json())
      .then(data => {
        if(data.access_token){
          setToken(data.access_token)
          setMsg({loginOK: "Login successfull"})
          history.push({pathname: '/'})
        }else if(data.status && data.status === 401)
          setMsg({loginNotOK: "Please, confirm your registration in your email"}) 
        else
          setMsg({loginNotOK: "Wrong credentials. Please, try again."})
      })
      .catch(err => console.log("error"))
    }, []);

  
  const login_google = useCallback((email, name) => {
    fetch('http://localhost:5000/auth/login/google', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        if(data.access_token){
          setToken(data.access_token)
          setMsg({loginOK: "Login successfull"})
          history.push({pathname: '/'})
        }else if(data.status && data.status === 401)
          setMsg({loginNotOK: "Please, confirm your registration in your email"}) 
        else
          setMsg({loginNotOK: "Wrong credentials. Please, try again."})
      })
      .catch(err => console.log("error"))
  }, []);


    const login_facebook = useCallback((email, name) => {
    fetch('http://localhost:5000/auth/login/facebook', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        if(data.access_token){
          setToken(data.access_token)
          setMsg({loginOK: "Login successfull"})
          history.push({pathname: '/'})
        }else if(data.status && data.status === 401)
          setMsg({loginNotOK: "Please, confirm your registration in your email"}) 
        else
          setMsg({loginNotOK: "Wrong credentials. Please, try again."})
      })
      .catch(err => console.log("error"))
  }, []);

    useEffect(()=> {
      if(!token)
        return
      fetch('http://localhost:5000/profile', {
          method: "get",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        })
        .then(response => response.json())
        .then(data => setUser(data))
    }, [token]);

    useEffect(()=> {
      if(!user || user === null)
        return
      fetch('http://localhost:5000/users/' + user.id, {
          method: "get",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        })
        .then(response => response.json())
        .then(data => setUserProfile(data))
    }, [user]);

    const editProfile = useCallback(( data) => {
      const body_update = data.password == undefined ?
              { name: data.name, email: data.email, phone:data.phone} :
              { name: data.name, email: data.email, phone:data.phone, password: data.password }
      fetch('http://localhost:5000/users/' + user.id, {
          method: "PATCH",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(body_update)
        })
        .then(response => response.json())
        .then(data => setUserProfile({
          name: data.data.username,
          email: data.data.email,
          phone: data.data.phone
        }))
    }, [token, user]);

  const logout = useCallback(() => {
    const auth = gapi?.auth2.getAuthInstance();
    console.log(auth)
    if (auth) {
      auth.signOut().then(
         auth.disconnect())
    };
    setToken(null)
    setUser(null)
    setUserProfile(null)
    history.push({pathname:'/login'})
  }, []);

  const sendResetEmail = useCallback((email) => {
    fetch('http://localhost:5000/users/forgotpassword/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
    .then(alert("Email has been sent ! Please, check your mailbox to reset your password"))
  }, []);

  const reset_password = useCallback((password, token_id) => {
    fetch('http://localhost:5000/users/resetpassword/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        reset_token: token_id,
      })
    })
      .then(response => response.json())
      .then(data => data.statusCode == 200 ? alert("Password updated successfully") : alert("Failed to update password") )
    }, []);

    useEffect(()=> {
      if(!user || user === null)
        return
      fetch('http://localhost:5000/reviews/' + user.id, {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
        })
        .then(response => response.json())
        .then(data => setUserReviews(data))
    },[user, userProfile])

    useEffect(()=> {
      fetch('http://localhost:5000/users/', {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
        })
        .then(response => response.json())
        .then(data => setAllUsers(data))
    },[])

    function getUserbyId(id){
      if(allUsers !== null){
        const user = allUsers.find(el => el.id === id)
        return user
      }
    }
  
      return (
        <UserContext.Provider value={{ token, msg, user, userProfile, userReviews, allUsers, login, login_google, login_facebook, register, editProfile, logout, sendResetEmail, reset_password, getUserbyId}}>
            {children}
        </UserContext.Provider>
    );
  }
  
  export default function useUser() {
      return useContext(UserContext);
  }