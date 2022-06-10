import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useParams } from 'react-router'
import Paginate from '../components/Paginate'

const Homescreen = () => {

    const dispatch = useDispatch()
    const params = useParams()

    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1

    console.log(keyword)

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber]);

    return (
        <Container>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => {
                            return (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}></Product>
                                </Col>
                            )

                        })}
                    </Row>
                    <Paginate 
                        page={page} 
                        pages={pages} 
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </Container>
    )
}

export default Homescreen