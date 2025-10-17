import { SignInButton } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import Header from './Header'

const SignIn = () => {
  return (
    <>
      <Header />
      <div className="mt-40 flex items-center justify-center bg-white p-4">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-semibold text-black mb-2">Đăng nhập</h1>
              <p className="text-sm text-gray-600">Đăng nhập vào tài khoản của bạn</p>
            </div>
            <SignInButton mode="modal" asChild>
              <button
                className="mb-2 w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
              >
                Đăng nhập
              </button>
            </SignInButton>
            <Link className="underline" to='/user/home'>Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn