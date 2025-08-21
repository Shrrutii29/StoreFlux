import { useNavigate } from "react-router-dom"
export const Navbar = () => {   
    const navigate = useNavigate()

    return (
        <header className="flex bg-sky-700 py-6 text-slate-50 items-center px-8">
            <div>
                <h1 className="text-5xl font-bold" onClick={() => navigate('/')}>StoreFlux</h1>
            </div>
            <nav className="ml-auto flex gap-8">
                <span onClick={() => navigate('/wishlist')} className="material-symbols-outlined hover:cursor-pointer" style={{ fontSize: '48px' }}>
                    favorite
                </span>
                <span onClick={() => navigate('/cart')} className="material-symbols-outlined hover:cursor-pointer" style={{ fontSize: '48px' }}>
                    shopping_cart
                </span>
                <span className="material-symbols-outlined hover:cursor-pointer" style={{ fontSize: '48px' }}>
                    account_circle
                </span>
            </nav>
        </header>
    )
}
