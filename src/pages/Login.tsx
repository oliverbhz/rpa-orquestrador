import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageMeta from '../components/common/PageMeta'

interface LocationState {
  from: {
    pathname: string;
  };
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login, error } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await login(email, password)
      const state = location.state as LocationState
      const from = state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
    } catch {
      // O erro já está sendo tratado no contexto
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageMeta
        title="Login - RPA Orquestrador"
        description="Página de login do RPA Orquestrador"
      />
      <div className="min-h-screen flex">
        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center">
          <img src="/images/logo/logo-dark.svg" alt="Logo" className="h-20" />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-boxdark-2 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Logo for mobile */}
            <div className="lg:hidden flex justify-center mb-8">
              <img src="/images/logo/logo.svg" alt="Logo" className="h-16" />
            </div>

            {/* Login Form */}
            <div className="bg-white dark:bg-boxdark rounded-lg shadow-md p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-black dark:text-white text-center">
                  Bem-vindo de volta
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
                  Entre com suas credenciais para acessar o sistema
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 rounded">
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label 
                    htmlFor="email" 
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
                    className="block w-full p-2.5 text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label 
                    htmlFor="password" 
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="block w-full p-2.5 text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded text-sm px-5 py-2.5 text-center disabled:opacity-50"
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
