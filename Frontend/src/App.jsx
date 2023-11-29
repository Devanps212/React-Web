import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './Components/Header'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { toast } from 'react-toastify'

function App() {
  

  return (
    <>
    <Header/>
    <ToastContainer />
    <Container className='my-2'>
      <Outlet/>
    </Container>
    
    </>
  )
}

export default App
