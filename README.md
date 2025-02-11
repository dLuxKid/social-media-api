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
- View individual and aggregated posts
- Delete own posts

### Social Interactions

- Follow/unfollow other users
- Like/unlike posts
- Reply to posts and comments
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

### Post Routes

```
GET    /post/get-posts      - Get timeline posts
GET    /post/get-posts/:username  - Get user's posts
GET    /post/get-post/:post_id   - Get single post
POST   /post/create-post    - Create new post
DELETE /post/delete-post/:post_id - Delete post
```

### Reply Routes

```
POST   /reply/reply-post     - Reply to a post
POST   /reply/reply-reply     - Reply to a reply
DELETE /reply/delete-reply/:reply_id - Delete reply
```

### Like Routes

```
POST   /like/like-post       - Like a post
DELETE /like/unlike-post     - Unlike a post
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
- Post attachments
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
