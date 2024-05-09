import axios from "@/api/axios"
import Loader from "@/components/Loader"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import transition from "@/lib/transition"
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const Catalog = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('/categories')
            return response.data
        }
        fetchCategories().then((categories) => {
            transition(() => {
                setCategories(categories)
                setLoading(false)
            })
        })
    }, [])
    return (
        <>
            {isLoading && (
                <Loader />
            )}
            {categories.length !== 0 && categories.map((category) =>
                <>
                <ViewTransitionLink/>
                    <span key={category.id} className="text-2xl font-semibold leading-none tracking-tight text-secondary-foreground">
                        {category.name}
                    </span>

                    
                        <CardTitle>
                            <ViewTransitionLink to={`/${category.name}`}>
                                {category.name}

                            </ViewTransitionLink>
                        </CardTitle>
                        <CardContent>
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full max-w-sm"
                            >
                                <CarouselContent>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        <span className="text-3xl font-semibold">{index + 1}</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </CardContent>
                    

                </>

            )}
        </>
    )
}

export default Catalog