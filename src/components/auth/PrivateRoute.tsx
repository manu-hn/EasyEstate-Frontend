import { useAppSelector } from "@/redux/hooks/hooks.ts"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const {isAuthenticated} = useAppSelector(store => store.user)
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute