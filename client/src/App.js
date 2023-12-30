import logo from './logo.svg';
import './App.css';
// import WebRTCComponent from './components/WebRTCComponent';
import { Route,Routes } from 'react-router-dom';
import Lobby from './screens/Lobby';
import Room from './screens/Room';

function App() {
  return (
    <div className="App">
     <Routes>
        {/* <Route path='/wrtc' element={<WebRTCComponent/>}/> */}
        <Route path='/lobby' element={<Lobby/>}/>
        <Route path='/room/:roomID' element={<Room/>}/>
      </Routes>
    </div>
  );
}

export default App;
