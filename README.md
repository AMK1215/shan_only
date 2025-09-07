# GoldenMM Slot Game - Authentication Integration

This project integrates a comprehensive authentication system with your Unity Shan slot game. The system includes login, registration, profile management, and password change functionality.

## Features

- **Mobile-first responsive design** [[memory:6998261]]
- **Login page** with username/phone and password authentication
- **Registration page** with agent referral code validation
- **User profile management** with account information display
- **Password change functionality** with current password verification
- **User menu integration** in the main game interface
- **Session management** with automatic token handling
- **Agent information display** showing referral details

## File Structure

```
├── index.html              # Main game page with authentication integration
├── login.html              # User login page
├── register.html           # User registration page
├── change-password.html    # Password change page
├── profile.html            # User profile management page
├── js/
│   ├── config.js           # Configuration file for API settings
│   └── auth-service.js     # Authentication service for API calls
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

- `POST /api/v1/login` - User login
- `POST /api/v1/register` - User registration
- `POST /api/v1/logout` - User logout
- `GET /api/v1/user` - Get current user data
- `POST /api/v1/change-password` - Change password
- `POST /api/v1/profile` - Update user profile
- `GET /api/v1/agent` - Get agent information

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

### 4. Authentication Flow

1. **First Visit**: Users are redirected to `login.html`
2. **Login**: After successful login, users are redirected to `index.html`
3. **Game Access**: The main game page checks authentication before loading
4. **Session Management**: Tokens are stored in localStorage and automatically included in API requests
5. **Logout**: Users can logout from the user menu in the game interface

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

### Starting the Game

1. Open `index.html` in a web browser
2. If not logged in, you'll be redirected to the login page
3. After successful login, the Unity game will load

### User Management

- **Profile**: Click the user menu (profile icon) in the top navigation
- **Change Password**: Access from user menu or direct link
- **Logout**: Available in the user menu

### Registration

- New users can register by clicking "Register here" on the login page
- A valid agent referral code is required for registration

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
