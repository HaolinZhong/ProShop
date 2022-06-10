import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Container, ListGroupItem, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, createProductReview, listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { listMyorders } from '../actions/orderActions'
import Star from '../components/Star'

const Productscreen = () => {
  const params = useParams()
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } = productReviewCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const orderList = useSelector(state => state.orderList)
  const { orders } = orderList

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
    }
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    dispatch(listProductDetails(params.id))
  }, [dispatch, params, successProductReview]);

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(listMyorders())
    dispatch(createProductReview(params.id, {
      rating,
      comment
    }))
  }

  return (
    <Container>
      <Link className='btn btn-outline-dark my-3' to="/">GO BACK</Link>
      {loading ? <Loader /> : (
        error ? <Message variant='danger'>{error}</Message> : (
          <>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid></Image>
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroupItem>Price: ${product.price}</ListGroupItem>
                  <ListGroupItem>Description: {product.description}</ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroupItem>
                      <Row>
                        <Col>Price:</Col>
                        <Col><strong>${product.price}</strong></Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>Status:</Col>
                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                      </Row>
                    </ListGroupItem>
                    {product.countInStock > 0 && (
                      <ListGroupItem>
                        <Row>
                          <Col>Qty:</Col>
                          <Col>
                            <Form.Select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}>
                              {
                                [...Array(product.countInStock).keys()].map(x => {
                                  return (<option key={x + 1} value={x + 1}>{x + 1}</option>)
                                })
                              }
                            </Form.Select>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )}
                    <ListGroupItem>
                      <Row>
                        <Button
                          onClick={addToCartHandler}
                          className='btn-block'
                          type="button"
                          disabled={product.countInStock === 0}>
                          Add To Cart
                        </Button>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row className='py-5'>
              <Col md={6} className='py-2'>
                <ListGroup variant='flush'>
                  <h2>Reviews</h2>
                  {product.reviews.length === 0 && <Message>No Reviews</Message>}
                  {product.reviews.map(review => (
                    <ListGroupItem key={review._id} className='my-2'>
                      <strong>{review.name} </strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  ))}

                  <ListGroupItem>
                    <h2 className='py-4'>Write a Customer Review</h2>
                    {errorProductReview && (
                      <Message variant='danger'>{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <FormGroup controlId='rating'>
                          <FormLabel>Rating</FormLabel>
                          <FormControl
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup controlId='comment'>
                          <FormLabel>Comment</FormLabel>
                          <FormControl
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></FormControl>
                        </FormGroup>
                        <Row className='justify-content-end'>
                          <Col md={2}>
                            <Button type='submit' size='sm' variant='outline-dark' className='my-3'>
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    ) : (
                      <Message variant='danger'>
                        Please <Link to='/login'>sign in</Link> to write a review. {' '}
                      </Message>
                    )}
                  </ListGroupItem>

                </ListGroup>

              </Col>
            </Row>


          </>
        )
      )}
    </Container>
  )
}

export default Productscreen