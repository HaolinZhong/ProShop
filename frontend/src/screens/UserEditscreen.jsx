import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form, FormCheck, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { adminUpdateUser, getUserDetails } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditscreen = () => {

    let navigate = useNavigate()

    const params = useParams()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            dispatch(getUserDetails(params.id))
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== params.id) {
                dispatch(getUserDetails(params.id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, params, user, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(adminUpdateUser({_id: params.id, name, email, isAdmin}))
    }



    return (
        <Container>
            <Link to='/admin/userlist' className='btn btn-outline-dark my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1 className='my-2'>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>

                        <FormGroup controlId='name' className='py-2'>
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='email' className='py-2'>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='isadmin' className='py-2'>
                            <FormCheck
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></FormCheck>
                        </FormGroup>

                        <Button type='submit' variant='primary' className='my-3'>
                            Update
                        </Button>
                    </Form>
                )}

            </FormContainer>
        </Container>
    )
}

export default UserEditscreen