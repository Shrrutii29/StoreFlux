import { Navbar } from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/getAllProducts";
import { ProductCard } from "../../components/ProductCard";
import { useCard } from "../../context/card.context.jsx";
import { getAllCategories } from "../../api/getAllCategories.js";
import { findProductsByCategory } from "../../utils/findProductsByCategory.js";

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [loading, setLoading] = useState(true); // <-- loading state
    const { cart } = useCard();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const products = await getAllProducts();
                const categories = await getAllCategories();
                const updatedCategories = [{ id: '1a', name: 'ALL' }, ...categories];
                setProducts(products);
                setCategories(updatedCategories);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const onCategoryClick = ({ category }) => {
        setSelectedCategory(category);
    };

    const filterByCategories = findProductsByCategory(products, selectedCategory);

    return (
        <>
            <Navbar />
            <main className="pt-8 px-4 sm:px-6 md:px-8 lg:px-12">
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
                <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto px-4">
                    {loading ? (
                        <div className="text-center py-16 flex flex-col justify-center items-center w-full">
                            <p className="text-gray-500 text-lg animate-pulse">Loading products...</p>
                        </div>
                    ) : filterByCategories?.length > 0 ? (
                        filterByCategories.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="text-center py-16 flex flex-col justify-center items-center w-full">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
                                No products found.
                            </h2>
                            <p className="mt-2 text-gray-500">Try selecting another category</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};
