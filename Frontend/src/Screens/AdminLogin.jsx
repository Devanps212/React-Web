import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import {useLoginMutation} from '../Slices/AdminApiSlice'
import FormContainer from '../Components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setAdminCredentials } from '../Slices/AuthSlice'
import AdminHeader from '../Components/AdminHeader';
import { toast } from "react-toastify"
import Loader from "../Components/Loader"


const AdminSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, {isLoading}] = useLoginMutation()

  const {adminInfo} = useSelector((state)=> state.auth);

  useEffect(()=>{
    if(adminInfo && adminInfo.email == 'devanps515@gmail.com')
    {
      console.log(adminInfo)
        navigate('/dashboard')//Give the adminDashboard URL////Imprtant
    }
  }, [navigate, adminInfo])

  const onSubmit = async(e)=>{
    e.preventDefault()
    try
    {
      const res = await login({email, password}).unwrap();
      console.log("Admin response :", res)
      dispatch(setAdminCredentials({...res}))
      navigate('/dashboard') //Give the adminDashboard URL////Imprtant
    }
    catch (err) {
      const errorMessage = err?.data?.message || err?.error?.message || 'An error occurred';
      toast.error(errorMessage);
    }
   }

  

  return (
    <>
    <AdminHeader />
    <FormContainer>
    <Form onSubmit={onSubmit}>
      <h1>Admin Sign In</h1>
      <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {isLoading && <Loader />}

      <Button type="submit" variant="primary" className="mt-3">
        Sign In
      </Button>
    </Form>
    </FormContainer>
    </>
  );
};

export default AdminSignInForm;
