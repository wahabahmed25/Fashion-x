import { Routes, Route, Navigate } from "react-router-dom"
import MainPage from "./pages/MainPage"
const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path = "/" element={<Navigate to="/main" replace />} />
        <Route path="/main" element = {<MainPage />}/>
      </Routes>
    </div>
  )
}

export default App
