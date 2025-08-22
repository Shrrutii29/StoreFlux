import { Navbar } from "../../components/Navbar"
import { useEffect, useState } from "react"
import { getAllProducts } from "../../api/getAllProducts"
import { ProductCard } from "../../components/ProductCard"
import { useCard } from "../../context/card.context.jsx"
import { getAllCategories } from "../../api/getAllCategories.js"
import { findProductsByCategory } from "../../utils/findProductsByCategory.js"

export const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("ALL")
    const { cart } = useCard()

    useEffect(() => {
        (async () => {
            const products = await getAllProducts()
            const categories = await getAllCategories()
            const updatedCategories = [{id: '1a', name: 'ALL'}, ...categories] // ALL first
            setProducts(products)
            setCategories(updatedCategories)
        })()
    }, [])

    const onCategoryClick = ({ category }) => {
        setSelectedCategory(category)
    }

    const filterByCategories = findProductsByCategory(products, selectedCategory)

    return (
        <>
            <Navbar />
            <main className="pt-8 px-4 md:px-8">
                
                {/* Categories */}
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                    {categories?.length > 0 && categories.map(category => (
                        <div
                            key={category.id}
                            onClick={() => onCategoryClick({ category: category.name })}
                            className={`px-4 py-2 rounded-full font-semibold cursor-pointer transition 
                                ${selectedCategory === category.name 
                                    ? "bg-green-500 text-white shadow-md" 
                                    : "bg-slate-200 text-gray-700 hover:bg-slate-300"}`}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="flex flex-wrap gap-8 justify-center">
                    {filterByCategories?.length > 0 ? (
                        filterByCategories.map(product => <ProductCard key={product.id} product={product} />)
                    ) : (
                        <div className="w-full text-center py-16">
                            <h2 className="text-2xl font-semibold text-gray-700">
                                No products found.
                            </h2>
                            <p className="mt-2 text-gray-500">Try selecting another category</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
