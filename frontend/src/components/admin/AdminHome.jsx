import { useState } from "react"
import AdminSidebar from "./AdminSidebar"
import AdminProductsTab from "./AdminProductsTab";
import AdminCommentsTab from "./AdminCommentsTab";
import AdminStatisticsTab from "./AdminStatisticsTab";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-20"} flex-1 transition-all duration-300`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === "products" && "Quản lý sản phẩm"}
              {activeTab === "comments" && "Bình luận đánh giá"}
              {activeTab === "statistics" && "Thống kê"}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Products Tab */}
          {activeTab === "products" && (
            <AdminProductsTab />
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <AdminCommentsTab />
          )}

          {/* Statistics Tab */}
          {activeTab === "statistics" && (
            <AdminStatisticsTab />
          )}
        </div>
      </div>
    </div>
  )
}
