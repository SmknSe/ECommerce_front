import axios, { axiosPrivate } from "@/api/axios"
import Loader from "@/components/Loader"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import transition from "@/lib/transition"
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import useAuth from "@/lib/hooks/useAuth"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import { ToastAction } from "@/components/ui/toast"
import { useLocation, useNavigate } from "react-router-dom"


const Catalog = () => {
    const { auth } = useAuth()
    const navigate = useViewNavigate()
    const location = useLocation()
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState({})
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
        const fetchCategories = async () => {
            const response = await axios.get('/categories')
            return response.data
        }
        fetchCategories().then((categories) => {
            if (categories) {
                transition(() => {
                    setCategories(categories)
                    setLoading(false)
                })
                for (const category of categories) {
                    const name = category.name
                    const products = category.products;
                    transition(() => {
                        setProducts(prev => ({ ...prev, [name]: products }))
                    })
                }
            }
            !categories && transition(() => setLoading(false))
        })
    }, [])
    return (
        <>
            {isLoading
                ? (
                    <Loader />
                ) :
                (
                    <>
                        {categories.length !== 0 && categories.map((category, idx) =>

                        (
                            <div key={idx} className="p-6 px-12 flex flex-col gap-y-3">

                                <ViewTransitionLink key={category.id} to={`/catalog/${category.name}`}>
                                    <span className="text-2xl font-semibold leading-none tracking-tight text-secondary-foreground">
                                        {category.name.charAt(0).toUpperCase() + category.name.substr(1)}
                                    </span>
                                </ViewTransitionLink>
                                <Carousel
                                    opts={{
                                        align: "start",
                                    }}
                                    className="w-full"
                                >
                                    <CarouselContent className=''>
                                        {
                                            Array.from({ length: 5 }).map((_, idx) => {
                                                const product = products?.[category.name]?.[idx]
                                                return (
                                                    <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4  ">
                                                        <div className="p-1 flex justify-center h-full  ">

                                                            <Card className="w-full flex flex-col ">
                                                                <CardHeader className='p-3 flex-1'>
                                                                    <CardTitle className="text-base text-balance flex items-center">
                                                                        <p className="m-auto">
                                                                            {product ? product.title : "Coming Soon!"}
                                                                        </p>

                                                                    </CardTitle>
                                                                    {product && <CardDescription >
                                                                        <ViewTransitionLink disabled={!product} to={`/catalog/${category.name}/${product?.id}`}>
                                                                            <span className='text-foreground underline-offset-4 hover:underline'>
                                                                                See more details
                                                                            </span>
                                                                        </ViewTransitionLink>
                                                                    </CardDescription>}
                                                                </CardHeader>
                                                                <CardContent className='p-3 pt-0 flex justify-center items-end border-b' >
                                                                    {product ? (
                                                                        <div className="h-[120px] flex">
                                                                            <object data={`https://ecommerce-1dbp.onrender.com/api/images/${product.productImg}`} type="image/png">
                                                                                <img className='h-full' src='furniture.png' alt={`${product.title} image`} />
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

                                                        </div>
                                                    </CarouselItem>
                                                )
                                            })
                                            //     products &&
                                            //     Object.values(products[category.name]).map((product) => {

                                            //         return (

                                            // )
                                            //     })
                                        }
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                        ))}

                        {categories.length == 0 && (
                            <div className="absolute inset-0 bottom-20 flex flex-col gap-6 justify-center items-center">
                                <h2 className="text-2xl font-semibold">No categories added yet</h2>
                                <Button>
                                    <ViewTransitionLink to='/'>Back to home page</ViewTransitionLink>
                                </Button>
                            </div>
                        )}
                    </>
                )
            }
        </>
    )
}

export default Catalog