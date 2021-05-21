import { createContext, useContext, useState, useCallback} from 'react';
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
    const [msg, setMsg]= useState({
        registerOk:"",
        loginOK:"",
        loginNotOK:"",
      })

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

    return (
        <UserContext.Provider value={{token, msg, login, register}}>
            {children}
        </UserContext.Provider>
    );
  }
  
  export default function useUser() {
      return useContext(UserContext);
  }