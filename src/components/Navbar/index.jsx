export const Navbar = () => {
    return (
        <header className="flex bg-sky-700 py-6 text-slate-50 items-center px-8">
            <div>
                <h1 className="text-5xl font-bold">StoreFlux</h1>
            </div>
            <nav className="ml-auto flex gap-8">
                <span className="material-symbols-outlined hover:cursor-pointer" style={{ fontSize: '48px' }}>
                    favorite
                </span>
                <span className="material-symbols-outlined hover:cursor-pointer" style={{ fontSize: '48px' }}>
                    shopping_cart
                </span>
                <span className="material-symbols-outlined hover:cursor-pointer" style={{ fontSize: '48px' }}>
                    account_circle
                </span>
            </nav>
        </header>
    )
}
