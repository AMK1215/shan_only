/**
 * Authentication Service for GoldenMM Slot Game
 * Handles all authentication-related API calls and token management
 */

class AuthService {
    constructor() {
        this.API_BASE_URL = window.CONFIG?.API_BASE_URL || 'https://tttgamingmm.site/api';
        this.token = localStorage.getItem(window.CONFIG?.AUTH?.TOKEN_KEY || 'auth_token');
        this.user = this.getStoredUser();
    }

    /**
     * Get stored user data from localStorage
     */
    getStoredUser() {
        const userData = localStorage.getItem(window.CONFIG?.AUTH?.USER_DATA_KEY || 'user_data');
        return userData ? JSON.parse(userData) : null;
    }

    /**
     * Get authorization headers
     */
    getAuthHeaders() {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    /**
     * Make authenticated API request
     */
    async makeRequest(endpoint, options = {}) {
        const url = `${this.API_BASE_URL}${endpoint}`;
        const config = {
            headers: this.getAuthHeaders(),
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            // Handle token expiration
            if (response.status === 401 && this.token) {
                this.logout();
                throw new Error('Session expired. Please login again.');
            }

            return { response, data };
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    /**
     * Login user
     */
    async login(credentials) {
        try {
            const { response, data } = await this.makeRequest('/login', {
                method: 'POST',
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                this.token = data.data.token;
                this.user = data.data.user;
                
                // Store in localStorage
                localStorage.setItem(window.CONFIG?.AUTH?.TOKEN_KEY || 'auth_token', this.token);
                localStorage.setItem(window.CONFIG?.AUTH?.USER_DATA_KEY || 'user_data', JSON.stringify(this.user));
                
                return {
                    success: true,
                    user: this.user,
                    token: this.token,
                    message: data.message
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Login failed'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Network error occurred'
            };
        }
    }

    /**
     * Register new user
     */
    async register(userData) {
        try {
            const { response, data } = await this.makeRequest('/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                return {
                    success: true,
                    user: data.data,
                    message: data.message
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Registration failed'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Network error occurred'
            };
        }
    }

    /**
     * Logout user
     */
    async logout() {
        try {
            if (this.token) {
                await this.makeRequest('/logout', {
                    method: 'POST'
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage regardless of API call result
            this.token = null;
            this.user = null;
            localStorage.removeItem(window.CONFIG?.AUTH?.TOKEN_KEY || 'auth_token');
            localStorage.removeItem(window.CONFIG?.AUTH?.USER_DATA_KEY || 'user_data');
        }
    }

    /**
     * Get current user data
     */
    async getCurrentUser() {
        try {
            const { response, data } = await this.makeRequest('/user');

            if (response.ok) {
                this.user = data.data;
                localStorage.setItem(window.CONFIG?.AUTH?.USER_DATA_KEY || 'user_data', JSON.stringify(this.user));
                return {
                    success: true,
                    user: this.user
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to get user data'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Network error occurred'
            };
        }
    }

    /**
     * Change password
     */
    async changePassword(passwordData) {
        try {
            const { response, data } = await this.makeRequest('/change-password', {
                method: 'POST',
                body: JSON.stringify(passwordData)
            });

            if (response.ok) {
                return {
                    success: true,
                    message: data.message
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Password change failed'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Network error occurred'
            };
        }
    }

    /**
     * Update user profile
     */
    async updateProfile(profileData) {
        try {
            const { response, data } = await this.makeRequest('/profile', {
                method: 'POST',
                body: JSON.stringify(profileData)
            });

            if (response.ok) {
                this.user = data.data;
                localStorage.setItem(window.CONFIG?.AUTH?.USER_DATA_KEY || 'user_data', JSON.stringify(this.user));
                return {
                    success: true,
                    user: this.user,
                    message: data.message
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Profile update failed'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Network error occurred'
            };
        }
    }

    /**
     * Get agent information
     */
    async getAgent() {
        try {
            const { response, data } = await this.makeRequest('/agent');

            if (response.ok) {
                return {
                    success: true,
                    agent: data.data
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to get agent information'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Network error occurred'
            };
        }
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!this.token && !!this.user;
    }

    /**
     * Get current token
     */
    getToken() {
        return this.token;
    }

    /**
     * Get current user
     */
    getCurrentUserData() {
        return this.user;
    }

    /**
     * Validate token and refresh user data
     */
    async validateSession() {
        if (!this.token) {
            return false;
        }

        try {
            const result = await this.getCurrentUser();
            return result.success;
        } catch (error) {
            console.error('Session validation error:', error);
            return false;
        }
    }
}

// Create global instance
window.authService = new AuthService();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthService;
}
