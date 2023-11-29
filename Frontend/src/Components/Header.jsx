import {Nav, Navbar, Container, NavDropdown, Badge} from 'react-bootstrap'
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {useLogoutMutation} from '../Slices/UserApiSlice'
import {logout} from '../Slices/AuthSlice'
import {useNavigate} from 'react-router-dom'


const Header = () => {

  const {userInfo} = useSelector((state)=> state.auth)
  
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async()=>{
    try
    {
       await logoutApiCall().unwrap()
       dispatch(logout())
       Navigate('/')
    }
    catch(err)
    {
       console.log
    }
  }
    // const { userInfo } = useSelector((state) => state.auth);
  
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
  
    // const [logoutApiCall] = useLogoutMutation();
  
    // const logoutHandler = async () => {
    //   try {
    //     await logoutApiCall().unwrap();
    //     dispatch(logout());
    //     navigate('/login');
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
  
    return (
      <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>MERN Auth</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                {userInfo ? (
                  <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
                ) : (
                  <>
                  <LinkContainer to='/login'>
                      <Nav.Link>
                        <FaSignInAlt href='/login'/> Sign In
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                      <Nav.Link>
                        <FaSignOutAlt href='/login'/> Sign Up
                      </Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  };
  
  export default Header;