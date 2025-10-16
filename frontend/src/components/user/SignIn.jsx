import { SignInButton } from "@clerk/clerk-react"

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-black mb-2">Đăng nhập</h1>
            <p className="text-sm text-gray-600">Đăng nhập vào tài khoản của bạn</p>
          </div>
          <SignInButton mode="modal" asChild>
            <button
              className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
            >
              Đăng nhập
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  )
}

export default SignIn