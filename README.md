# Social Media API

A RESTful API for a social media platform that enables user authentication, content sharing, and social interactions.

## Features

### Authentication

- User registration with email verification
- Secure login with multi-factor authentication support
- Password management (reset, update, forgot password)

### Profile Management

- Create and customize user profiles
- Update profile information and media
- View other users' profiles

### Content Management

- Create posts with text and media support
- View individual and aggregated tweets
- Delete own tweets

### Social Interactions

- Follow/unfollow other users
- Like/unlike tweets
- Reply to tweets and comments
- Nested reply functionality

### Notifications

- Real-time notification system
- Mark notifications as read
- Track social interactions

## API Endpoints

### Authentication Routes

```
POST   /auth/login            - User login
POST   /auth/signup           - New user registration
POST   /auth/forgot-password  - Initiate password reset
PUT    /auth/reset-password   - Reset password
PUT    /auth/update-password  - Update password (Protected)
```

### User Routes

```
GET    /user/get-user         - Get current user
GET    /user/get-profile/:username  - Get user profile
PUT    /user/update-user      - Update user profile
PUT    /user/delete-user      - Delete account
```

### Tweet Routes

```
GET    /tweet/get-tweets      - Get timeline tweets
GET    /tweet/get-tweets/:username  - Get user's tweets
GET    /tweet/get-tweet/:tweet_id   - Get single tweet
POST   /tweet/create-tweet    - Create new tweet
DELETE /tweet/delete-tweet/:tweet_id - Delete tweet
```

### Reply Routes

```
POST   /reply/reply-tweet     - Reply to a tweet
POST   /reply/reply-reply     - Reply to a reply
DELETE /reply/delete-reply/:reply_id - Delete reply
```

### Like Routes

```
POST   /like/like-tweet       - Like a tweet
DELETE /like/unlike-tweet     - Unlike a tweet
```

### Follow Routes

```
POST   /follow/follow-user    - Follow a user
DELETE /follow/unfollow-user  - Unfollow a user
```

### Notification Routes

```
GET    /notification/get-notifications    - Get all notifications
POST   /notification/create-notification  - Create notification
PATCH  /notification/read-notification/:id - Mark as read
```

## Authentication

The API uses token-based authentication. Protected routes require a valid authentication token.

- `protectRoute`: Middleware for authenticated routes
- `isAuthenticated`: Middleware for optional authentication
- `handleMediaUpload`: Middleware for handling media uploads

## Media Support

The API supports media uploads for:

- Profile pictures
- Tweet attachments
- Handled through the `handleMediaUpload` middleware

## Security Features

- Email verification for new accounts
- Multi-factor authentication support
- Secure password reset flow
- Protected routes with authentication middleware
- Media upload validation and processing

## Error Handling

The API implements comprehensive error handling for:

- Authentication errors
- Resource not found
- Invalid requests
- Server errors
- Media upload failures

## Getting Started

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Run the development server

Detailed setup instructions and environment configuration guide to be added.
