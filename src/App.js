import './App.css';
import { Routes,Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Signin from './Components/Signin';
import Reportpage from './Components/Reportpage';
import Signup from './Components/Signup';
import Reset_pass from './Components/Password Reset Components/Reset_pass';
import Confirm_password from './Components/Password Reset Components/Confirm_password';
import Reset_instructions from './Components/Password Reset Components/Reset_instructions';
import Deatiled_report from './Components/Deatiled_report';
import Tiles from './Components/Tiles';
function App() {
  const PrivateRoute = ({ element: Element }) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      // Redirect to the login page if the user is not authenticated
      return <Navigate to="/" />;
    }
  
    // Render the protected component
    return <Element />;
  };
  return (

    // <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signin />} />
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/dashboard" element={<Homepage />} />
          <Route path="/reportpage" element={<Reportpage />} />
          <Route path="/forgot_pwd" element={<Reset_pass />} />
          <Route path="/resetpass" element={<Confirm_password />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset_instructions" element={<Reset_instructions />} />
          <Route path="/detailed_report" element={<Deatiled_report />} />
          <Route path="/tiles" element={<Tiles />} />


          {/* Use PrivateRoute for protected routes */}
          <Route
            path="/home"
            element={<PrivateRoute element={Homepage} />}
          />
          <Route
            path="/reportpage"
            element={<PrivateRoute element={Reportpage} />}
          />
        </Routes>
      </div>
  );
}

export default App;
