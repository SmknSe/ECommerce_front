import axios, { axiosPrivate } from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import transition from "@/lib/transition"
import { useEffect, useState } from "react"
import { ToastAction } from "@/components/ui/toast"
import { Skeleton } from "@/components/ui/skeleton"
import { useLocation, useNavigate } from "react-router-dom"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import ViewTransitionLink from "@/components/ViewTransitionLink"

const ProductsByCategory = () => {
    const [isLoading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const navigate = useViewNavigate()
    const location = useLocation()
    const path = location.pathname.split('/')
    const currentCategory = path[path.length - 1]

    const addToCart = async (event, productId) => {
        transition(() => {
            event.target.innerText = 'Please wait...'
            event.target.disabled = true
        })
        try {
            await axiosPrivate.post(`/orders/cart/${productId}`, {}, {
                validateStatus: (status) => status === 200
            })
            event.target.innerText = 'Added'
            toast({
                title: 'Success',
                description: 'Product added to cart',
            })
        } catch (err) {
            event.target.innerText = 'Add to cart'
            event.target.disabled = false
            if (err.response?.status === 401)
                toast({
                    title: 'Oops!',
                    description: 'You have to sign in to do that!',
                    action: <ToastAction className="" altText="Sign In" onClick={() => {
                        navigate('/login', { state: { from: location } })
                    }}>Sign In</ToastAction>
                })
            else if (err.response?.status === 400)
                toast({
                    title: 'Oops!',
                    description: err.response.data
                })
        }
    }

    useEffect(() => {
        const fetchProductsByCategory = async (category) => {
            const response = await axios.get(`/categories/${category}`)
            if (response.status === 200) {
                return response.data
            }
            // return []
        }
        fetchProductsByCategory(currentCategory).then((data) => {
            transition(() => {
                setLoading(false)
                setProducts(data.products)
            })
        }).catch((err) => { console.log(err) })
    }, [])
    return (
        <>
            {isLoading && <h2>Loading...</h2>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                {products.map(product =>
                    <Card key={product.id} className="w-full flex flex-col ">
                        <CardHeader className='p-3 flex-1'>
                            <CardTitle className="text-base text-balance flex items-center">
                                <p className="m-auto">
                                    {product ? product.title : "Coming Soon!"}
                                </p>

                            </CardTitle>
                            {product && <CardDescription >
                                <ViewTransitionLink disabled={!product} to={`/catalog/${currentCategory}/${product?.id}`}>
                                    <span className='text-foreground underline-offset-4 hover:underline'>
                                        See more details
                                    </span>
                                </ViewTransitionLink>
                            </CardDescription>}
                        </CardHeader>
                        <CardContent className='p-3 pt-0 flex justify-center items-end border-b' >
                            {product ? (
                                <div className="h-[120px] flex">
                                    <object data={`http://localhost:8080/api/images/${product.productImg}`} type="image/png">
                                        <img className='h-full' src='../furniture.png' alt={`${product.title} image`} />
                                    </object>
                                </div>
                            ) : (
                                // CHECK
                                <Skeleton className='h-[120px] w-full' />
                            )}
                        </CardContent>
                        <CardFooter className='p-3 flex justify-between'>

                            <span className="text-muted-foreground">{product ? <>${product.price}</> : 'N/A'} </span>
                            <Button value='d' disabled={!product || product?.isAdded} onClick={(e) => { addToCart(e, product.id) }}>
                                {product?.isAdded ? 'Already in cart' : 'Add to cart'}
                            </Button>
                        </CardFooter>
                    </Card>

                )}
            </div>
        </>
    )
}

export default ProductsByCategory