import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import transition from "@/lib/transition"
import axios from "axios"
import { useEffect, useState } from "react"

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        // transition(() => setLoading(true))
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
            <h2 className="text-2xl">All products</h2>
            {isLoading && (
                <h2>Loading...</h2>
            )}
            {categories.length !== 0 && categories.map((category) =>
                <Card key={category.id}>
                    <CardTitle>
                        <ViewTransitionLink to={`/${category.name}`}>
                            {category.name}

                        </ViewTransitionLink>
                    </CardTitle>
                </Card>
            )}
        </>
    )
}

export default Categories