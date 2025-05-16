import { jwtDecode } from 'jwt-decode';

export function getUserIdFromToken(token) {
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT token:", decoded);
        return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
    } catch (error) {
        console.error("Failed to decode JWT token:", error);
        return null;
    }
}

export function getUserRoleFromToken(token) {
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.role || null;
    } catch (error) {
        console.error("Failed to decode JWT token:", error);
        return null;
    }
}