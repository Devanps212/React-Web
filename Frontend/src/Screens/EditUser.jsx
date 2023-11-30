import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEditUserMutation } from '../Slices/AdminApiSlice'
import { setCredentials } from '../Slices/AuthSlice'
import {useForm} from 'react-hook-form'


function EditUser() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [editUser, {isLoad}] = useEditUserMutation()
    const {userForEdit} = useSelector((state)=> state.auth)
    const [name, setName] = useState(userForEdit.name)
    const [email, setEmail] = useState(userForEdit.email)
    const {adminInfo} = useSelector((state)=>state.auth)
    const [update, setUpdate] = useState(false)

    // useEffect(()=>{
    //     if(!userForEdit.name)
    //     {
    //         console.log('Problem here')
    //         navigate('/')
    //     }
    //     if(adminInfo)
    //     {
    //         navigate('/loginadmin')
    //     }
    // }, [adminInfo, userForEdit, navigate])

    useEffect(()=>{}, [update])

    const {handleSubmit, register, formState: {errors},} = useForm()

    const submit = async(data)=>{
        try
        {
            const res = await editUser({
                _id:userForEdit._id,
                name: data.name,
                email:data.email
            }).unwrap()

            dispatch(setCredentials({...res}))
            toast.success("update success")
            setUpdate(!update)
            navigate('/dashboard')
        }
        catch(err)
        {
            toast.error(err?.data?.message || err.error);
        }
    }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <img
              className="card-img-top"
              src={userForEdit.profilePic || "https://via.placeholder.com/150"}
              alt="User Profile"
            />
            <div className="card-body text-center">
              <form onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                  <input
                    {...register("name", {
                      pattern: {
                        value:
                          /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/,
                        message: "Full name required",
                      },
                    })}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name..."
                    className="form-control"
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid Email",
                      },
                    })}
                    placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email.message}</small>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-dark btn-block mt-3"
                >
                  Update
                </button>
                <p className="mt-3">
                  Already have an account?{" "}
                  <Link to={"/login"}>Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
