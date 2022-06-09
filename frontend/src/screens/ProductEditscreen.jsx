import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

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
    const [uploading, setUploading] = useState(false)
    const [errUpload, setErrUpload] = useState('')


    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch(listProductDetails(params.id))
            navigate('/admin/productlist')
        } else {
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
        }

    }, [dispatch, params, navigate, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        if (!file.name.endsWith('.jpg' || '.jpeg' || '.png')) {
            setErrUpload('Wrong file type: please upload .jpg, .jpeg or .png file')
            e.target.value = ''
            return
        }
        setErrUpload('')
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const { data, error: errorUpload } = await axios.post('/api/upload', formData, config)
            if (errorUpload) {
                setErrUpload(errorUpload)
            } else {
                setImage(data)
            }
                setUploading(false)
            
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: params.id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }))
    }

    return (
        <Container>
            <Link to='/admin/productlist' className='btn btn-outline-dark my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1 className='my-2'>Edit Product</h1>
                {loadingUpdate && <Loader />}
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
                            <FormLabel>Image Url</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <Form.Group controlId="imageFile" className="py-2">
                            <Form.Label>Use Local Image File</Form.Label>
                            <Form.Control 
                                type="file" 
                                onChange={uploadFileHandler}
                            />
                        </Form.Group>
                        {uploading && <Loader />}
                        {errUpload && <Message variant='danger'>{errUpload}</Message>}
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