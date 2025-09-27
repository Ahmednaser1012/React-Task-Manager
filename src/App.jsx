import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import MainLayout from "./pages/MainLayout";
import { DashBoardLayout } from "./pages/DashBoardLayout";
import { TaskPage } from "./pages/TaskPage";
import { SetingPage } from "./pages/SetingPage";  
import { useSelector } from "react-redux";

function App() {
  // protected route thing
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <div className="App min-h-screen">
      <div className="bg-gray-900 text-red-800 overflow-hidden">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashBoardLayout />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/settings" element={<SetingPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
