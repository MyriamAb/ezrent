import { createContext, useContext, useState, useCallback, useEffect} from 'react';
import  { useHistory } from 'react-router-dom'

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

export function UserProvider({children}) {
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
        .then(data =>
          setUserProfile({
          name: data[0].name,
          email: data[0].email,
          phone: data[0].phone, 
          profile_picture: data[0].profile_picture
        }))
    }, [user]);

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

    const logout = useCallback(() => {
      setToken(null)
      setUser(null)
      setUserProfile(null)
      history.push({pathname:'/login'})
    }, []);

    return (
        <UserContext.Provider value={{token, msg, user, userProfile, userReviews, allUsers, login, register, editProfile ,logout, getUserbyId}}>
            {children}
        </UserContext.Provider>
    );
  }
  
  export default function useUser() {
      return useContext(UserContext);
  }