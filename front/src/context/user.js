import { createContext, useContext, useState, useCallback, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useGoogleApi } from 'react-gapi';
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
    const clientId = '814535166282-uj0rs7jnubeqglcaie0lm4j0gg8625pi.apps.googleusercontent.com';
    const gapi = useGoogleApi({ scopes: ['profile'], clientId: clientId })
    const history = useHistory();
    const [token, setToken] = useLocalStorage('token')
    const [user, setUser] = useLocalStorage('user')
    const [userProfile, setUserProfile] = useState({})
    const [msg, setMsg]= useState({
        registerOk:"",
        loginOK:"",
        loginNotOK:"",
        editProfileOK:""
      })
    const [statusCode, setStatusCode] = useState("");
    const [userReviews, setUserReviews] = useState(null)
    const [allReviews, setAllReviews] = useState(null)
    const [allUsers, setAllUsers] = useState(null)
    const [refresh, setRefresh] = useState(false)

  function register(data) {
      fetch('http://localhost:5000/users', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "name": `${data.firstname} ${data.lastname}`,
            "email": data.email,
            "password": data.password
          })
        })
        .then(response => response.json())
        .then(setMsg({registerOk : "Please, confirm your registration by checking your email"}))
        .then(data => {
          console.log(data)
            if(data.statusCode && data.statusCode === 200)
              history.push({pathname:'/login'})
        })
        .catch(err => console.log(err))  
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
      if(!user || user === null || user.statusCode === 401)
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
        .then(data =>
          setUserProfile({
          name: data[0].name,
          email: data[0].email,
          phone: data[0].phone, 
          profile_picture: data[0].profile_picture,
          stripeCustomerId:data[0].stripeCustomerId
        }))
    }, [token, user]);

    function editProfile(data, profile_picture){
      const body_update = data.password == undefined ?
              { name: data.name, email: data.email, phone:data.phone, profile_picture:profile_picture} :
              { name: data.name, email: data.email, phone:data.phone, password: data.password, profile_picture:profile_picture }
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
          name: data.data.name,
          email: data.data.email,
          phone: data.data.phone, 
          profile_picture: data.data.profile_picture
        }))
        .then(setMsg({editProfileOK : "Profile updated successfully"}))
    }

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
  }, []);

  const sendPaymentEmail = useCallback((amount, nbDay) => {
    fetch('http://localhost:5000/users/paymentmail', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: user.username,
        email: user.email,
        amount: amount,
        nbDay: nbDay,          
      })
    })
  }, [])

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
      .then(data => setStatusCode(data.statusCode))
    console.log(statusCode)
    return (statusCode);
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
    },[token, user, userProfile, refresh])

    useEffect(()=> {
      fetch('http://localhost:5000/users/', {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(data => setAllUsers(data))
    }, [token, refresh])
  
    useEffect(() => {
      fetch('http://localhost:5000/reviews/', {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      })
        .then(response => response.json())
        .then(data => setAllReviews(data))
      console.log(allReviews)
    }, [token, refresh])


    const getUserbyId= useCallback((id) => {
      if(allUsers !== null){
        const user = allUsers.find(el => el.id === id)
        return user
      }
    },[allUsers])

  const postReviewFromClient = useCallback((review, reviewer, reviewed) => {
    fetch('http://localhost:5000/reviews', {
      method: "post",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        grade: review.grade,
        comment: review.comment,
        reviewed_id: reviewed,
        reviewer_id: reviewer,
      })
    })
    .then(refreshFct)
    }, [])


  function refreshFct(){
    setRefresh(prev => (!prev))
  }
  
      return (
        <UserContext.Provider value={{
          token, msg, user, userProfile, userReviews, allUsers, allReviews,
          login, login_google, login_facebook, register, editProfile,
          logout, sendResetEmail, reset_password, getUserbyId, postReviewFromClient, sendPaymentEmail
        }}>
            {children}
        </UserContext.Provider>
    );
  }
  
  export default function useUser() {
      return useContext(UserContext);
  }