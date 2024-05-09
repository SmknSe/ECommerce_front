import axios from "@/api/axios"
import Loader from "@/components/Loader"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import transition from "@/lib/transition"
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

// const getImage = async (product) => {
//     try {
//         const response = await fetch(`http://localhost:8080/api/images/${product.imgName}`);

//         if (!response.ok)
//             return {
//                 ...product,
//                 isLoaded: true,
//                 imgUrl: null
//             };
//         const imgData = await response.blob();
//         const imgUrl = URL.createObjectURL(imgData);
//         return {
//             ...product,
//             isLoaded: true,
//             imgUrl
//         };
//     } catch (error) {
//         console.error(error);
//     }
// };
// const getImages = async () => {
//     const fetchedProductsCopy = [...fetchedProducts];
//     for (let i = 0; i < fetchedProductsCopy.length; i++) {
//         fetchedProductsCopy[i] = await getImage(fetchedProductsCopy[i]);
//         products.set(fetchedProductsCopy);
//     }
// };

const Catalog = () => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState({})
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('/categories')
            return response.data
        }
        const fetchProductsByCategory = async (category) => {
            try {
                const response = await axios.get(`/products?category=${category}&limit=5`)
                return response.data.products
            } catch (err) {
                console.error(err);
            }
        }
        fetchCategories().then((categories) => {
            transition(() => {
                setCategories(categories)
                setLoading(false)
                for (const category of categories) {
                    const name = category.name
                    fetchProductsByCategory(name).then((response) => {
                        console.log(response);
                        setProducts(prev => ({ ...prev, [name]: response }))
                    }
                    )
                }
            })
        })
        fetchProductsByCategory('storage')

        axios.get('/images/Sofa_4091.ico').then((response) => {
            console.log(response)
        })
    }, [])
    return (
        <>
            {isLoading
                ? (
                    <Loader />
                ) :
                categories.length !== 0 && categories.map((category, idx) =>
                (
                    <div key={`afa${idx}`} className="p-6 px-12 flex flex-col gap-y-3">

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
                            <CarouselContent>
                                {
                                    Array.from({ length: 5 }).map((_, index) => {
                                        const product = products[category?.name]?.[index];
                                        return (
                                            <CarouselItem key={`carousel${index}`} className="md:basis-1/2 lg:basis-1/3">
                                                <div className="p-1">
                                                    <div className="flex justify-center ">
                                                        <Card className="max-w-[400px] w-full">
                                                            <CardHeader className='p-3'>
                                                                <CardTitle className="text-base text-balance">
                                                                    {product ? product.title : "Coming Soon!"}
                                                                </CardTitle>
                                                            </CardHeader>
                                                            <CardContent className='p-3 pt-0 flex items-center justify-center' >
                                                                {product ? (
                                                                    <img src={`http://localhost:8080/api/images/${product.imgName}`} alt="IMAGE" />
                                                                    // <Skeleton className="h-[120px] w-full rounded-xl" />
                                                                ) : (
                                                                    <Skeleton className="h-[120px] w-full rounded-xl" />
                                                                )}
                                                            </CardContent>
                                                            {product && (
                                                                <CardFooter className='p-3 pt-0'>
                                                                    ${product.price}
                                                                </CardFooter>
                                                            )}

                                                        </Card>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        )
                                    })
                                }
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                ))
            }
        </>
    )
}

export default Catalog