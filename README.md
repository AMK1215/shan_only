# GoldenMM Slot Game - Complete API Integration

This project integrates a comprehensive authentication and gaming system with your Unity Shan slot game. The system includes authentication, financial management, game launching, and user management functionality.

## Features

- **Mobile-first responsive design** [[memory:6998261]]
- **Complete authentication system** with login, registration, and profile management
- **Financial management** with deposit and withdrawal functionality
- **Shan game integration** with game launching capabilities
- **Transaction history** with detailed logs and summaries
- **Support system** with contact information and help
- **Promotions system** with offers and bonuses
- **Bank management** with payment method information
- **Session management** with automatic token handling
- **Real-time balance updates** and user information

## File Structure

```
├── index.html              # Main entry point (redirects to dashboard)
├── dashboard.html          # Main dashboard with all features
├── login.html              # User login page
├── register.html           # User registration page
├── change-password.html    # Password change page
├── profile.html            # User profile management page
├── shan-game.html          # Shan game launcher (API-based)
├── deposit.html            # Deposit funds page
├── withdraw.html           # Withdraw funds page
├── transactions.html       # Transaction history page
├── banks.html              # Available banks/payment methods
├── contact.html            # Contact support page
├── promotions.html         # Promotions and offers page
├── js/
│   ├── config.js           # Configuration file for API settings
│   ├── auth-service.js     # Authentication service for API calls
│   └── api-service.js      # General API service for all endpoints
└── README.md               # This file
```

## Setup Instructions

### 1. Backend Configuration

Update the API URL in `js/config.js`:

```javascript
const CONFIG = {
    API_BASE_URL: 'http://your-laravel-backend-url/api/v1', // Update this
    // ... other settings
};
```

### 2. Laravel Backend Requirements

Your Laravel backend should have the following API endpoints:

**Authentication Endpoints:**
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user data
- `POST /api/change-password` - Change password
- `POST /api/profile` - Update user profile
- `GET /api/agent` - Get agent information

**Financial Endpoints:**
- `GET /api/banks` - Get available banks/payment methods
- `GET /api/agentfinicialPaymentType` - Get agent payment types
- `POST /api/depositfinicial` - Submit deposit request
- `GET /api/depositlogfinicial` - Get deposit logs
- `GET /api/paymentTypefinicial` - Get payment types
- `POST /api/withdrawfinicial` - Submit withdrawal request
- `GET /api/withdrawlogfinicial` - Get withdrawal logs

**Game Endpoints:**
- `POST /api/shankomee/launch-game` - Launch Shan game

**Support Endpoints:**
- `GET /api/contact` - Get contact information
- `GET /api/promotion` - Get promotions

### 3. API Response Format

The backend should return responses in this format:

```json
{
    "success": true,
    "message": "Success message",
    "data": {
        "token": "bearer_token_here",
        "user": {
            "id": 1,
            "name": "User Name",
            "phone": "1234567890",
            "user_name": "Pi12345678",
            "status": 1,
            "is_changed_password": 1,
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
        }
    }
}
```

### 4. Application Flow

1. **First Visit**: Users are redirected to `login.html`
2. **Login**: After successful login, users are redirected to `dashboard.html`
3. **Dashboard**: Main hub with all features and quick actions
4. **Game Access**: Unity game can be launched from dashboard
5. **Financial Management**: Deposit/withdraw funds with transaction history
6. **Session Management**: Tokens are stored in localStorage and automatically included in API requests
7. **Logout**: Users can logout from the user menu in any page

### 5. User Registration Process

1. Users need a valid agent referral code to register
2. Registration requires:
   - Agent referral code
   - Full name
   - Phone number
   - Password (minimum 6 characters)
   - Payment method selection
   - Account name and number
   - Terms and conditions acceptance

### 6. Mobile Responsiveness

The design is optimized for mobile devices with:
- Touch-friendly interface elements
- Responsive layouts that adapt to different screen sizes
- Mobile-first CSS approach
- Optimized form inputs for mobile keyboards

## Usage

### Starting the Application

1. Open `index.html` in a web browser
2. If not logged in, you'll be redirected to the login page
3. After successful login, you'll be redirected to the dashboard

### Dashboard Features

- **Quick Actions**: Access all major features from the dashboard
- **Balance Display**: View current account balance
- **Recent Activity**: See latest transactions
- **Navigation**: Easy access to all features

### Financial Management

- **Deposits**: Add funds to your account with receipt upload
- **Withdrawals**: Cash out winnings with password verification
- **Transaction History**: View detailed logs of all transactions
- **Payment Methods**: View available banks and payment options

### Game Access

- **Shan Game**: Launch Shan gaming platform games via API
- **Game Information**: View balance and account details
- **Game Launching**: API-based game integration for seamless experience

### User Management

- **Profile**: Update personal information
- **Change Password**: Secure password management
- **Agent Information**: View agent details and referral codes
- **Logout**: Secure session termination

### Support & Information

- **Contact Support**: Get help from support team
- **Promotions**: View available offers and bonuses
- **Banks**: View payment method information

## Security Features

- JWT token-based authentication
- Automatic token expiration handling
- Secure password validation
- Session management with localStorage
- CSRF protection through Laravel backend

## Browser Compatibility

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Check the `API_BASE_URL` in `js/config.js`
2. **Authentication Failures**: Verify backend API endpoints and response format
3. **Mobile Display Issues**: Ensure viewport meta tag is present
4. **Token Expiration**: The system automatically handles token refresh

### Development Tips

- Use browser developer tools to monitor API calls
- Check localStorage for stored authentication data
- Verify CORS settings on your Laravel backend
- Test on both desktop and mobile devices

## Customization

### Styling

The design uses Tailwind CSS with custom color schemes. You can modify:
- Colors in the Tailwind config
- Component styles in the HTML files
- Animation effects and transitions

### API Integration

The `AuthService` class handles all API communication. You can extend it for additional features:
- Add new API endpoints
- Implement additional authentication methods
- Add data validation and error handling

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify API endpoint responses
3. Ensure all required files are present
4. Test with a working Laravel backend

## License

This authentication integration is part of the GoldenMM slot game project.
