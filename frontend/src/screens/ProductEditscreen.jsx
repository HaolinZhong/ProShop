import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'

const ProductEditscreen = () => {

    let navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')


    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails


    useEffect(() => {

            if (!product.name || product._id !== params.id) {
                dispatch(listProductDetails(params.id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        
    }, [dispatch, params, navigate, product])

    const submitHandler = (e) => {
        e.preventDefault()
        // update product
    }



    return (
        <Container>
            <Link to='/admin/productlist' className='btn btn-outline-dark my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1 className='my-2'>Edit Product</h1>
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
                        
                        <FormGroup controlId='price' className='py-2'>
                            <FormLabel>Price</FormLabel>
                            <FormControl
                                type='price'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='image' className='py-2'>
                            <FormLabel>Image</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='brand' className='py-2'>
                            <FormLabel>Brand</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='countInStock' className='py-2'>
                            <FormLabel>CountInStock</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter CountInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='category' className='py-2'>
                            <FormLabel>Category</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='description' className='py-2'>
                            <FormLabel>Description</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </FormControl>
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

export default ProductEditscreen