import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  // Getting our {user} from our state stored in redux
  const{user} = useSelector((state) => state.auth)

  useEffect(() => {
    // if(user){
    //   setLoggedIn(true)
    // }else{
    //   setLoggedIn(false)
    // }

    user ?
    setLoggedIn(true)
    :
    setLoggedIn(false)

    setCheckingStatus(false)
  }, [user])

  return {loggedIn, checkingStatus}
};
