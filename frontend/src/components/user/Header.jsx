import { SignInButton, SignOutButton, useAuth, UserButton } from "@clerk/clerk-react"
import { Heart, Search, ShoppingCart } from "lucide-react"
import {Link} from 'react-router-dom'

const Header = () => {
    const { isSignedIn } = useAuth();
    const categories = ["Điện thoại", "Laptop", "Tablet", "Phụ kiện", "Âm thanh"];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-10 md:px-6">
                {/* LOGO */}
                <div className="flex items-center gap-8">
                    <Link to={'/user/home'} className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white font-bold text-lg">
                            L
                        </div>
                        <span className="hidden font-semibold text-lg text-gray-900 sm:inline-block">Logo</span>
                    </Link>
                </div>

                {/* SEARCH INPUT */}
                <div className="flex-1 max-w-md mx-4 md:mx-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="w-full h-10 pl-10 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* CART & AUTH */}
                <div className="flex items-center gap-3">
                    {/* Shopping Cart */}
                    <Link to={'/user/cart'} className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                        <ShoppingCart className="h-5 w-5 text-gray-700" />
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] font-medium text-white">
                            0
                        </span>
                    </Link>

                    <Link to='/user/liked-products' className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                        <Heart className="h-5 w-5 text-gray-700" />
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] font-medium text-white">
                            0
                        </span>
                    </Link>

                    {/* Sign In Button */}
                    {!isSignedIn && <SignInButton mode="modal" asChild>
                        <button className="cursor-pointer h-8 px-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                            Đăng nhập
                        </button>
                    </SignInButton>}

                    {isSignedIn && <div className="flex items-center gap-2 ">
                        <UserButton />
                    </div>
                    }
                </div>
            </div>
            <div className="border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors whitespace-nowrap"
                            >
                                {category}
                                {index === categories.length - 1 && (
                                    <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-red-500 text-white rounded">HOT</span>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
