import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom";

const UserProtectedRoute = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isSignedIn) {
      navigate('/user/home');
    } else if(!isSignedIn)
      navigate('/user/signin');
  }, [isSignedIn])

  return (
    <Outlet />
  )
}

export default UserProtectedRoute