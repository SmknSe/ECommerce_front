import axios, { axiosPrivate } from "@/api/axios"
import Loader from "@/components/Loader"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import transition from "@/lib/transition"
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import { ToastAction } from "@/components/ui/toast"
import { useLocation, useParams } from "react-router-dom"
import { CanceledError } from "axios"

const Product = () => {
    const navigate = useViewNavigate()
    const location = useLocation()
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [isLoading, setLoading] = useState(true)

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
        let isMounted = true
        const controller = new AbortController()
        const fetchData = async (id) => {
            try {
                const response = await axios.get(`/products/${id}`, {
                    signal: controller.signal
                })
                return response.data?.data
            } catch (err) {
                console.log(err)
                if (err instanceof CanceledError)
                    return
                if (err.response.status !== 404)
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong',
                        description: 'There was a problem with request, try again later',
                    })
                navigate('/404', { replace: true })
            }
        }
        fetchData(id).then((product) => {
            isMounted && transition(() => {
                setProduct(product)
                setLoading(false)
            })
        })
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])
    return (
        <>
            {isLoading
                ? (
                    <Loader />
                ) :
                (
                    <>
                        <div className="m-auto">
                            <div className="flex flex-col gap-y-4">
                                <h2 className="text-2xl font-semibold tracking-tight text-secondary-foreground">
                                    {product?.title}
                                </h2>

                                <Card className="bg-secondary p-1 w-2/3 sm:max-w-[400px]  sm:w-[300px]  md:w-[400px] lg:w-[500px]">
                                    <object className="w-full  rounded-sm" data={`http://localhost:8080/api/images/${product?.productImg}`} type="image/png">
                                        <img className='h-full transition' src='../../furniture.png' alt={`${product?.title} image`} />
                                    </object>
                                </Card>


                                <p className="text-xl font-semibold text-secondary-foreground tracking-tight ">
                                    {product?.description}
                                </p>

                                <span className="text-xl font-semibold tracking-tight">
                                    USD ${product?.price}
                                </span>

                                <Button className='w-fit' disabled={!product || product?.isAdded} onClick={(e) => { addToCart(e, product.id) }}>
                                    {product?.isAdded ? 'Already in cart' : 'Add to cart'}
                                </Button>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Product