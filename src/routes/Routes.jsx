import {Routes,Route} from "react-router-dom"
import DashboardsPage from "../pages/DashboardsPage"
import NotFoundPage from '../component/common/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/"  element={<DashboardsPage />}/> 
        <Route path="*"  element={<NotFoundPage />}/> 
      </Routes>
  )
}

export default AppRoutes