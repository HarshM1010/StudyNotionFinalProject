import { createRoot } from 'react-dom/client'
import './index.css'
import { UserProvider } from './Pages/Contexts/UserContext.jsx';
import { AuthProvider } from './Pages/Contexts/AuthContext.jsx';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { RatingProvider } from './Pages/Contexts/RatingContext'
import { CourseProvider } from './Pages/Contexts/CourseContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <CourseProvider>
          <RatingProvider>
            <App />
          </RatingProvider>
        </CourseProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>,
)
