import { authService } from './auth-service.js';

class RouteGuard {
    static requireAuth(redirectTo = 'index.html') {
        if (!authService.isAuthenticated()) {
            window.location.href = redirectTo;
            return false;
        }
        return true;
    }
    
    static redirectIfAuthenticated(redirectTo = 'index.html') {
        if (authService.isAuthenticated()) {
            window.location.href = redirectTo;
            return false;
        }
        return true;
    }
}

export { RouteGuard };