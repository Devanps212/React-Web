import { useState, useEffect } from "react"
// import { useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import { toast } from "react-toastify"
import Loader from "../Components/Loader"
import { setCredentials } from '../Slices/AuthSlice'
import { useUpdateUserMutation } from "../Slices/UserApiSlice"
import Header from "../Components/Header"


function PofileScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [profilePic, setPpicture] = useState(null)
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const imageServerURL = 'http://localhost:5000/Images/';


    const { userInfo } = useSelector((state)=> state.auth);

    const [updateProfiile, {isLoading}] = useUpdateUserMutation()

    useEffect(()=>{
      setName(userInfo.name)
      setEmail(userInfo.email)
      setPpicture(userInfo.profilePic)

    }, [userInfo.setName, userInfo.setEmail, userInfo.profilePic])

    const submitHandler = async (e) => {
      e.preventDefault();
    
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
    
      // Create a FormData object
      const formData = new FormData();
    
      // Append form data to FormData object
      formData.append('_id', userInfo._id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
    
      // Check if a profile picture is selected and append it to the FormData
      if (profilePic) {
        formData.append('profilePic', profilePic);
      }
    
      try {
        const res = await updateProfiile(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile Updated');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  setPpicture(file);
};

  return (
    <>
    <Header/>
<FormContainer>
    <h1>Update Profile</h1>
     {/* Display profile picture */}
     {userInfo.profilePic && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <img
            src={`${imageServerURL}${userInfo.profilePic}`}
            alt="Profile"
            style={{
              width: '187px',
              height: '142px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #ccc',
            }}
          />
        </div>
      )}
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

       <Form.Group className="my-2" controlId="profilePic">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
          type="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        
      </Form.Group>

       
       {isLoading && <Loader/>}

       <Button type="submit" variant="primary" className="mt-3">
        Update
       </Button>
       
       
    </Form>
</FormContainer>
</>
  )
}

export default PofileScreen
