import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../API/AuthContext";

export function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    // Se o usuário estiver autenticado, renderiza a página filha.
    // Se não, redireciona para a página de login.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}