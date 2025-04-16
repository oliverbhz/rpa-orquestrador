import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Sair
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-blue-50 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Bem-vindo!</h3>
              <p className="text-blue-600">
                Esta é sua página de dashboard. Personalize este conteúdo de acordo com suas necessidades.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-green-50 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Status</h3>
              <p className="text-green-600">
                Sistema funcionando normalmente
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-purple-50 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Ações</h3>
              <p className="text-purple-600">
                Utilize os cards para exibir informações importantes e ações do sistema
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 