/**
 * API Service for GoldenMM Slot Game
 * Handles all API calls for the application
 */

class ApiService {
    constructor() {
        this.API_BASE_URL = window.CONFIG?.API_BASE_URL || 'https://tttgamingmm.site/api';
    }

    /**
     * Get authorization headers
     */
    getAuthHeaders() {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const token = localStorage.getItem(window.CONFIG?.AUTH?.TOKEN_KEY || 'auth_token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
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
            if (response.status === 401 && localStorage.getItem(window.CONFIG?.AUTH?.TOKEN_KEY || 'auth_token')) {
                // Redirect to login
                window.location.href = 'login.html';
                throw new Error('Session expired. Please login again.');
            }

            return { response, data };
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    /**
     * Get current user data
     */
    async getCurrentUser() {
        try {
            const { response, data } = await this.makeRequest('/user');

            if (response.ok) {
                return {
                    success: true,
                    data: data.data
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
     * Get banks/payment types
     */
    async getBanks() {
        try {
            const { response, data } = await this.makeRequest('/banks');

            if (response.ok) {
                return {
                    success: true,
                    data: data.data
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to get banks'
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
     * Get contact information
     */
    async getContact() {
        try {
            const { response, data } = await this.makeRequest('/contact');

            if (response.ok) {
                return {
                    success: true,
                    data: data.data
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to get contact information'
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
     * Get promotions
     */
    async getPromotions() {
        try {
            const { response, data } = await this.makeRequest('/promotion');

            if (response.ok) {
                return {
                    success: true,
                    data: data.data
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to get promotions'
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
     * Launch Shan game
     */
    async launchShanGame(gameData) {
        try {
            const { response, data } = await this.makeRequest('/shankomee/launch-game', {
                method: 'POST',
                body: JSON.stringify(gameData)
            });

            if (response.ok) {
                return {
                    success: true,
                    data: data
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to launch game'
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
     * Get agent financial payment types
     */
    async getAgentFinancialPaymentTypes() {
        try {
            const { response, data } = await this.makeRequest('/agentfinicialPaymentType');

            if (response.ok) {
                return {
                    success: true,
                    data: data.data
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to get payment types'
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
     * Submit financial deposit
     */
    async submitFinancialDeposit(depositData) {
        try {
            const formData = new FormData();
            
            // Add text fields
            formData.append('agent_payment_type_id', depositData.agent_payment_type_id);
            formData.append('amount', depositData.amount);
            formData.append('refrence_no', depositData.refrence_no);
            
            // Add image if provided
            if (depositData.image) {
                formData.append('image', depositData.image);
            }

            const token = localStorage.getItem(window.CONFIG?.AUTH?.TOKEN_KEY || 'auth_token');
            const response = await fetch(`${this.API_BASE_URL}/depositfinicial`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    data: data.data,
                    message: data.message
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to submit deposit'
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
     * Get deposit logs
     */
    async getDepositLogs() {
        try {
            const { response, data } = await this.makeRequest('/depositlogfinicial');

            if (response.ok) {
                return {
                    success: true,
                    data: data.data
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to get deposit logs'
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
     * Get payment types for financial transactions
     */
    async getPaymentTypes() {
        try {
            const { response, data } = await this.makeRequest('/paymentTypefinicial');

            if (response.ok) {
                return {
                    success: true,
                    data: data.data
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to get payment types'
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
     * Submit financial withdraw
     */
    async submitFinancialWithdraw(withdrawData) {
        try {
            const { response, data } = await this.makeRequest('/withdrawfinicial', {
                method: 'POST',
                body: JSON.stringify(withdrawData)
            });

            if (response.ok) {
                return {
                    success: true,
                    data: data.data,
                    message: data.message
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to submit withdraw request'
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
     * Get withdraw logs
     */
    async getWithdrawLogs() {
        try {
            const { response, data } = await this.makeRequest('/withdrawlogfinicial');

            if (response.ok) {
                return {
                    success: true,
                    data: data.data
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'Failed to get withdraw logs'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Network error occurred'
            };
        }
    }
}

// Create global instance
window.apiService = new ApiService();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiService;
}
