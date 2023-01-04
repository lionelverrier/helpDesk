import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import PrivateRoute from './components/privateRoute';
import Home from './app/pages/home';
import Login from './app/pages/login';
import Register from './app/pages/register';
import NewTicket from './app/pages/newTicket';
import Tickets from './app/pages/tickets';
import Ticket from './app/pages/ticket';


function App() {
  return <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/newTicket' element={<PrivateRoute/>} >
            <Route path='/newTicket' element={<NewTicket />} />
          </Route>
          <Route path='/tickets' element={<PrivateRoute />} >
            <Route path='/tickets' element={<Tickets />} />
          </Route>
          <Route path='/ticket/:ticketId' element={<PrivateRoute />} >
            <Route path='/ticket/:ticketId' element={<Ticket />} />
          </Route>

        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </>
};

export default App;
