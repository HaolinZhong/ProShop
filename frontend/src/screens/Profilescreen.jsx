import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { getUserDetails } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const Profilescreen = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [message, setMessage] = useState('')

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confPassword) {
            setMessage('Passwords do not match!')
        } else {
            setMessage('')
            // dispatch update profile
        }
    }

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h2 className='my-2'>Update Profile</h2>
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler} >

                        <FormGroup controlId='name' className='py-2'>
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type='name'
                                placeholder='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='email' className='py-2'>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl
                                type='email'
                                placeholder='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='password' className='py-2'>
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='confPassword' className='py-2'>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl
                                type='password'
                                placeholder='Confirm password'
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>

                        {message && <Message variant='danger'>{message}</Message>}

                        <Button type='submit' variant='primary' className='my-3'>
                            Update
                        </Button>
                    </Form>

                </Col>
                <Col md={9}><h2 className='my-2'>My Orders</h2></Col>
            </Row>
        </Container>
    )
}

export default Profilescreen