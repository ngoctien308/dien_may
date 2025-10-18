import { Menu, X, Package, MessageSquare, BarChart3, LogOut } from "lucide-react"

const AdminSidebar = ({ setActiveTab, sidebarOpen, activeTab, setSidebarOpen }) => {
    return (
        <div
            className={`${sidebarOpen ? "w-64" : "w-20"
                } bg-gray-900 text-white transition-all duration-300 fixed h-screen left-0 top-0 z-40 flex flex-col`}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
                {sidebarOpen && <span className="font-bold text-lg">Admin</span>}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-2">
                <button
                    onClick={() => setActiveTab("products")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "products" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                        }`}
                >
                    <Package className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span>Sản phẩm</span>}
                </button>

                <button
                    onClick={() => setActiveTab("comments")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "comments" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                        }`}
                >
                    <MessageSquare className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span>Bình luận</span>}
                </button>

                <button
                    onClick={() => setActiveTab("statistics")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "statistics" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                        }`}
                >
                    <BarChart3 className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span>Thống kê</span>}
                </button>
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-gray-800">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 transition-colors">
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span>Đăng xuất</span>}
                </button>
            </div>
        </div>
    )
}

export default AdminSidebar