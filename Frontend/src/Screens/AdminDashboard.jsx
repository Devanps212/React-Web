import { Container, Table, Image } from 'react-bootstrap';
import { createContext, useEffect, useState } from "react";
import AdminHeader from '../Components/AdminHeader';
import { toast } from "react-toastify";
import {useDeleteUserMutation, useEditUserMutation, useGetUserMutation} from '../Slices/AdminApiSlice'
import { setCredentials, userDetails } from '../Slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../Slices/AdminApiSlice';
import { logoutUser } from '../Slices/AuthSlice';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import './CSS/Dashboard.css'



const AdminDashboard = () => {
//  const context = createContext(null)

 const navigate = useNavigate()
 const dispatch = useDispatch()

 const [userData, setUserData] = useState([]);
 const [data, setData] = useState([])

 const [users, {isLoading}] = useGetUserMutation()
 
 const [deleteUser , {isLoadings}] = useDeleteUserMutation()
 const [editUserData, {isLoad}] = useState(false)
 
 const [userDelete, setUserDelete] = useState(false);
 
 
 const { adminInfo } = useSelector((state) => state.auth);
 const { userInfo } = useSelector((state) => state.auth);
 const imageUrl = 'http://localhost:5000/Images/'

 
 const [logoutApiCall] = useLogoutMutation();

console.log("Admin :", adminInfo)

useEffect(()=>{
    if(!adminInfo || adminInfo?.email !== "devanps515@gmail.com")
    {
        navigate('/loginadmin')
    }
},[adminInfo, navigate])

useEffect(()=>{
    const fetchData = async()=>{
        try{
            console.log("Fetch starting")
            const {data} = await users()
            console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:" , data.data)
            if(!data)
            {
              console.log("No data found")
                navigate('/loginadmin')
            }
            setUserData(data.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    fetchData()
 }, [users, userDelete, adminInfo, logoutApiCall, navigate])

 useEffect(()=>{
    setData(userData)
    console.log('userData:', userData);
    console.log('datahhhhhhhhhhhhhhhhhhhhhhhhh:', data);
 }, [userData, data])

 useEffect(()=>{}, [data])

 const filteredData = (letter)=>{
  console.log('Letter:', letter);
    setData(userData.filter((val)=>
    val.name.toLowerCase().includes(letter.toLowerCase())
    )) &&
    setData(
        userData.filter((val)=>
        val.email.toLowerCase().includes(letter.toLowerCase()))
    )
    console.log('Filtered Data:', data);
 }
 

 const newDate = (dates)=>{
    const isDate = dates
    const date = new Date(isDate)
    const options = { year: "numeric", month: "long", day: "numeric"}
    const formattedDate = date.toLocaleDateString(undefined, options)
    return formattedDate
 }

 const removeUser = async(id, userId)=>{
    try{
        await deleteUser({id}).unwrap()
        setUserDelete(!userDelete);
        toast.success("User deleted")
    }
    catch(err)
    {
        console.log(err, "errorrr");
        toast.error(err?.data?.message || err.message);
    }
 }

 const editUser = (user)=>{

    console.log("User details for editing:", user); // Log the user details here
    dispatch(userDetails(user))
    console.log('User details in EditUser:]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]', userDetails);
    console.log("gouing to edit user]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]")
    navigate('/editUser')
 }
 


  return (
  <>
  <AdminHeader />
    <Container className="mb-5">
  
  <div className="col-lg-9 mt-4 mt-lg-0">
    <div className="row">
      <div className="input-group">
        <div className="form-outline mt-3 ms-3 mb-3 border rounded">
          <input
            type="search"
            id="form1"
            className="form-control"
            onChange={(e) => {
              filteredData(e.target.value);
            }}
          />
          <label className="form-label" htmlFor="form1">
            Search
          </label>
        </div>
      </div>
      <div className="col-md-12">
        <div className="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
          <Table bordered hover className="user-table">
          <thead>
                  <tr>
                    <th className="fw-bold">Users</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length ? (
                    data.map((val, i) => (
                      <tr key={i} className="candidates-list">
                        <td className="title">
                          <div className="thumb">
                          <Image
                              className="img-fluid"
                              src={val.profilePic ?
                                `${imageUrl}${val.profilePic}` :
                                'https://static.vecteezy.com/system/resources/previews/016/293/983/non_2x/profile-avatar-ui-element-template-user-account-editable-isolated-dashboard-component-flat-user-interface-visual-data-presentation-web-design-widget-for-mobile-application-with-dark-theme-vector.jpg'}
                              alt=""
                            />
                          </div>
                          <div className="candidate-list-details">
                            <div className="candidate-list-info">
                              <div className="candidate-list-title">
                                <h5 className="mb-0">
                                  <p className="fw-bold">
                                    {val.name}{' '}
                                    <span className="ms-5 fw-normal">
                                      {val.email}
                                    </span>
                                  </p>
                                </h5>
                              </div>
                              <div className="candidate-list-option">
                                <ul className="list-unstyled">
                                  <li>
                                    <i className="" />
                                     {newDate(val.createdAt)}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <ul className="list-unstyled mb-0 d-flex justify-content-end">
                            <li>
                            <button
                              className="text-info ms-3"
                              onClick={() => editUser(val)}
                              data-toggle="tooltip"
                              title=""
                              data-original-title="Edit"
                            >
                              <FaPencilAlt />
                            </button>
                            </li>
                            <li>
                            <button
                              onClick={() => removeUser(val.createdAt, val._id)}
                              className="text-danger ms-3"
                              data-toggle="tooltip"
                              title=""
                              data-original-title="Delete"
                            >
                              <FaTrashAlt />
                            </button>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">
                        <Image
                          src="https://static.thenounproject.com/png/55393-200.png"
                          alt="No Users"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
          </Table>
        </div>
      </div>
    </div>
  </div>
</Container>
</>
  );

  

};

export default AdminDashboard;
