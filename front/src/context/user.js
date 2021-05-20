import { createContext, useContext, useState } from 'react';
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

    return (
        <UserContext.Provider value={{token, register}}>
            {children}
        </UserContext.Provider>
    );
  }
  
  export default function useUser() {
      return useContext(UserContext);
  }