import { useState , useEffect} from "react"
import { Link, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { useLoginMutation } from '../Slices/UserApiSlice'
import { setCredentials } from '../Slices/AuthSlice'
import { toast } from "react-toastify"
import Loader from "../Components/Loader"


function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()
    const dispacth = useDispatch() 

    const [login, { isLoading }] = useLoginMutation()
    
    const { userInfo } = useSelector((state)=> state.auth);

    useEffect(()=>{
      if(userInfo)
      {
        navigate('/')
      }
    }, [navigate, userInfo])

    const submitHandler = async(e)=>{
        e.preventDefault()
        try
        {
            const res = await login({ email, password}).unwrap();
            dispacth(setCredentials({...res}))
            navigate('/')
          }
        catch(err)
        {
           toast.error(err.data.message || err.error) 
        }
    }
  return (
<FormContainer>
    <h1>Sign In</h1>
    <Form onSubmit={submitHandler}>
       <Form.Group className="my-2" controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}>
            
        </Form.Control>
       </Form.Group>

       <Form.Group className="my-2" controlId="email">
        <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        placeholder="Enter password"    
        value={password}
        onChange={(e)=>setPassword(e.target.value)}>
            
        </Form.Control>
       </Form.Group>
       { isLoading &&  <Loader/>}
       <Button type="submit" variant="primary" className="mt-3">
        Sign In
       </Button>
       
       <Row className="py-3">
        <Col>
        New User ? <Link to='/register'>Register Here</Link>
        </Col>
       </Row>
    </Form>
</FormContainer>
  )
}

export default LoginScreen