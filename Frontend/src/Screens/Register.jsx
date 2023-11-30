import { useState, useEffect } from "react"
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import { toast } from "react-toastify"
import Loader from "../Components/Loader"
import { useRegisterMutation } from "../Slices/UserApiSlice"
import { setCredentials } from '../Slices/AuthSlice'
import Header from "../Components/Header"


function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispacth = useDispatch()

    const { userInfo } = useSelector((state)=> state.auth);

    useEffect(()=>{
      if(userInfo)
      {
        navigate('/')
      }
    }, [navigate, userInfo])

    const [register, { isLoading }] = useRegisterMutation()

    const submitHandler = async(e)=>{
      console.log("reached register")
        e.preventDefault()
        if(password !== confirmPassword)
        {
          console.log("password isnt matching")
          toast.error('Password do not match')
        }
        else
        {
          try
          {
            console.log("checking user")
            const res = await register({ name, email, password}).unwrap();
            console.log('Unwraping')
            dispacth(setCredentials({...res}))
            navigate('/')
          }
          catch(err)
          {
            
            toast.error(err.data.message || err.error)
            console.log("Error details:", err.response.data || err.message || err);

          }
        }
    }
  return (
    <>
    <Header/>
<FormContainer>
    <h1>Sign Up</h1>
    <Form onSubmit={submitHandler}>
    <Form.Group className="my-2" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e)=>setName(e.target.value)}>
            
        </Form.Control>
       </Form.Group>

       <Form.Group className="my-2" controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}>
            
        </Form.Control>
       </Form.Group>

       <Form.Group className="my-2" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        placeholder="Enter password"    
        value={password}
        onChange={(e)=>setPassword(e.target.value)}>
            
        </Form.Control>
       </Form.Group>

       <Form.Group className="my-2" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
        type="password"
        placeholder="Confirm password"    
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}>
            
        </Form.Control>
       </Form.Group>

       {isLoading && <Loader/>}
       <Button type="submit" variant="primary" className="mt-3">
        Sign Up
       </Button>
       
       <Row className="py-3">
        <Col>
        Already have account ? <Link to='/login'>Login Here</Link>
        </Col>
       </Row>
    </Form>
</FormContainer>
</>
  )
}

export default Register
