import { createContext, useEffect, useState } from "react";

export let userContext = createContext();
export default function userContextProvider(props) {
    const [UserLogin, setUserLogin] = useState(null);
    
    useEffect(() => {
        if (localStorage.getItem("UserToken"))
            setUserLogin(localStorage.getItem("UserToken"));
    })

  return (
    <userContext.Provider value={{ UserLogin, setUserLogin }}>
      {props.children}
    </userContext.Provider>
  );
}
