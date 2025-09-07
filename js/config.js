/**
 * Configuration file for GoldenMM Slot Game
 * Update these settings according to your backend configuration
 */

const CONFIG = {
    // API Configuration
    API_BASE_URL: 'https://tttgamingmm.site/api', // Update this to your Laravel backend URL
    
    // Game Configuration
    GAME_TITLE: 'GoldenMM',
    GAME_SUBTITLE: 'Premium Slot Game Experience',
    
    // UI Configuration
    THEME: {
        colors: {
            gold: '#FFD700',
            darkGold: '#B8860B',
            gameBg: '#0F0F23',
            cardBg: '#1A1A2E'
        }
    },
    
    // Authentication Configuration
    AUTH: {
        TOKEN_KEY: 'auth_token',
        USER_DATA_KEY: 'user_data',
        SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    },
    
    // API Endpoints
    ENDPOINTS: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
        USER: '/user',
        CHANGE_PASSWORD: '/change-password',
        PROFILE: '/profile',
        AGENT: '/agent'
    }
};

// Make config available globally
window.CONFIG = CONFIG;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
