// need node/npm
// npx create-react-app sidebar-app (Good command to create all the dependencies/configs for the app)
//npm install --save cdbreact
//npm install react-router-dom
//npm start (To start app)

//Main file
import './App.css';
import Home from './Components/home'
import Homepage from './Components/homepage'
import Rfid from './Components/RFID-NFC'
import Camera from './Components/camera'
import Ir from './Components/IR'
import Loginpage from './login/Login'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Photos from './Components/camera/photos-page'
import Video from './Components/camera/Video-page';
import Userfront from "@userfront/react"

import { useLocation,Navigate,Route,Routes,BrowserRouter as Router } from 'react-router-dom';



function App() {
  // function RequireAuth({ children }) {
  //   let location = useLocation();
  //   if (!Userfront.tokens.accessToken) {
  //     // Redirect to the /login page
  //     return <Navigate to="/login" state={{ from: location }} replace />;
  //   }
  
  //   return children;
  // }

  return (
    <div className="App">

      <Router>
        
      {Userfront.tokens.accessToken?
      <>
      <Routes>

        < Route path ="/RFID-NFC" element={<Rfid />} />
        < Route path ="/camera" element={<Camera />} />
        < Route path ="/IR" element={<Ir />} />
        < Route path ="/Videos" element={<Video />} />
        < Route path ="/Photos" element={<Photos />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/*' element={<Navigate to="/RFID-NFC" />} />
          {/* <Route
            path="/Video"
            element={
              <RequireAuth>
                <Video />
              </RequireAuth>
            }
          /> */}
        </Routes>
        </>
        :
        <Routes>
        <Route path='/Login' element={<Loginpage />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/*' element={<Navigate to="/Login" />} />
        </Routes > }
      </Router>
    </div>
  );
}


export default App;

