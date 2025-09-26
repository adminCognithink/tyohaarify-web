# Tyohaarify Backend Design - FastAPI Implementation

## Overview
This document outlines the comprehensive design for adding FastAPI backend support to the Tyohaarify festival greeting card application. The backend will handle authentication, user management, template storage, and festival data management.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   FastAPI       │    │   PostgreSQL    │
│   Frontend      │◄──►│   Backend       │◄──►│   Database      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Redis Cache   │    │   File Storage  │    │   Vector DB     │
│   (Sessions)    │    │   (Images/Media)│    │   (Embeddings)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Technology Stack

### Backend Framework
- **FastAPI** - Modern, fast web framework for Python APIs
- **Python 3.11+** - Latest Python version for optimal performance
- **Uvicorn** - ASGI server for production deployment

### Database
- **PostgreSQL 15+** - Primary relational database
- **SQLAlchemy 2.0** - ORM for database interactions
- **Alembic** - Database migration management
- **Redis** - Caching and session storage
- **Pinecone/Weaviate** - Vector database for template similarity search

### Authentication & Security
- **OAuth 2.0** - Industry standard authentication
- **JWT Tokens** - Secure token-based authentication
- **Passlib** - Password hashing with bcrypt
- **CORS** - Cross-origin resource sharing configuration
- **Rate Limiting** - API endpoint protection

### File Storage
- **AWS S3** / **Cloudinary** - Image and media storage
- **Pillow** - Image processing and optimization
- **Background Tasks** - Async image processing

## Database Schema

### User Management
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    subscription_expires_at TIMESTAMP
);

-- User sessions
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    access_token VARCHAR(500) UNIQUE NOT NULL,
    refresh_token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);
```

### Festival Management
```sql
-- Festivals table
CREATE TABLE festivals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(100),
    country VARCHAR(100),
    date_start DATE,
    date_end DATE,
    is_active BOOLEAN DEFAULT TRUE,
    default_message TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Festival images
CREATE TABLE festival_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    festival_id UUID REFERENCES festivals(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Template Management
```sql
-- Template categories
CREATE TABLE template_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- Templates
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES template_categories(id),
    template_code TEXT NOT NULL, -- HTML/CSS/JS code
    template_config JSONB, -- Configuration options
    preview_image_url TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Analytics
    view_count INTEGER DEFAULT 0,
    usage_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    
    -- Versioning
    version INTEGER DEFAULT 1,
    parent_template_id UUID REFERENCES templates(id)
);

-- Template ratings and reviews
CREATE TABLE template_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(template_id, user_id)
);

-- Template likes
CREATE TABLE template_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(template_id, user_id)
);

-- Template usage analytics
CREATE TABLE template_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    festival_id UUID REFERENCES festivals(id),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### User Generated Content
```sql
-- User created cards
CREATE TABLE user_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    template_id UUID REFERENCES templates(id),
    festival_id UUID REFERENCES festivals(id),
    title VARCHAR(200),
    message TEXT,
    sender_name VARCHAR(100),
    custom_image_url TEXT,
    generated_html TEXT,
    generated_image_url TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    share_token VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User collections
CREATE TABLE user_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Collection items
CREATE TABLE collection_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id UUID REFERENCES user_collections(id) ON DELETE CASCADE,
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(collection_id, template_id)
);
```

## API Endpoints Structure

### Authentication Endpoints
```
POST   /auth/register              - User registration
POST   /auth/login                 - User login
POST   /auth/logout                - User logout
POST   /auth/refresh               - Refresh JWT token
POST   /auth/forgot-password       - Request password reset
POST   /auth/reset-password        - Reset password with token
POST   /auth/verify-email          - Verify email address
GET    /auth/me                    - Get current user profile
PUT    /auth/me                    - Update user profile
```

### Festival Endpoints
```
GET    /festivals                  - List all festivals
GET    /festivals/{festival_id}    - Get festival details
POST   /festivals                  - Create new festival (admin)
PUT    /festivals/{festival_id}    - Update festival (admin)
DELETE /festivals/{festival_id}    - Delete festival (admin)
GET    /festivals/{festival_id}/images - Get festival images
POST   /festivals/{festival_id}/images - Upload festival image
```

### Template Endpoints
```
GET    /templates                  - List templates (with filters)
GET    /templates/{template_id}    - Get template details
POST   /templates                  - Create new template
PUT    /templates/{template_id}    - Update template (owner/admin)
DELETE /templates/{template_id}    - Delete template (owner/admin)
POST   /templates/{template_id}/like - Like/unlike template
GET    /templates/{template_id}/reviews - Get template reviews
POST   /templates/{template_id}/reviews - Add template review
GET    /templates/categories       - List template categories
GET    /templates/featured         - Get featured templates
GET    /templates/trending         - Get trending templates
POST   /templates/search           - Search templates with AI
```

### Card Generation Endpoints
```
POST   /cards/generate             - Generate greeting card
GET    /cards/my-cards             - Get user's created cards
GET    /cards/{card_id}            - Get card details
PUT    /cards/{card_id}            - Update card
DELETE /cards/{card_id}            - Delete card
POST   /cards/{card_id}/share      - Generate shareable link
GET    /cards/shared/{share_token} - View shared card
POST   /cards/export               - Export card in various formats
```

### User Management Endpoints
```
GET    /users/profile              - Get user profile
PUT    /users/profile              - Update user profile
POST   /users/upload-avatar        - Upload profile picture
GET    /users/collections          - Get user collections
POST   /users/collections          - Create new collection
PUT    /users/collections/{id}     - Update collection
DELETE /users/collections/{id}     - Delete collection
POST   /users/collections/{id}/items - Add template to collection
DELETE /users/collections/{id}/items/{template_id} - Remove from collection
GET    /users/analytics            - Get user usage analytics
```

### Admin Endpoints
```
GET    /admin/users                - List all users
PUT    /admin/users/{user_id}      - Update user (admin)
DELETE /admin/users/{user_id}      - Delete user
GET    /admin/templates            - List all templates (including private)
PUT    /admin/templates/{id}/feature - Feature/unfeature template
GET    /admin/analytics            - Platform analytics
GET    /admin/reports              - Generate usage reports
```

## Authentication Flow

### JWT Token Strategy
```python
# Token structure
{
    "sub": "user_id",
    "email": "user@example.com",
    "username": "username",
    "is_premium": false,
    "permissions": ["user", "template:create"],
    "exp": 1640995200,
    "iat": 1640908800
}
```

### OAuth Integration
- **Google OAuth** - Primary social login
- **Facebook OAuth** - Secondary social login
- **GitHub OAuth** - For developers
- **Apple Sign-In** - For iOS users

## Security Implementation

### Authentication Middleware
```python
# Rate limiting per endpoint
- Login: 5 attempts per minute per IP
- Registration: 3 attempts per minute per IP
- Template creation: 10 per hour per user
- Card generation: 100 per hour per user (free), unlimited (premium)
```

### Data Validation
- **Pydantic Models** - Request/response validation
- **Input Sanitization** - XSS protection
- **SQL Injection Prevention** - Parameterized queries
- **CSRF Protection** - Token-based protection

## Caching Strategy

### Redis Cache Implementation
```python
# Cache keys structure
user:profile:{user_id}              # TTL: 30 minutes
festivals:list                      # TTL: 1 hour
templates:featured                  # TTL: 15 minutes
templates:category:{category_id}    # TTL: 30 minutes
analytics:daily:{date}              # TTL: 24 hours
```

### Cache Invalidation
- User profile updates → Clear user cache
- Template updates → Clear template and category cache
- Festival updates → Clear festival cache
- New template creation → Clear featured and category cache

## File Storage Strategy

### Image Storage
```python
# Directory structure
/uploads/
  /users/
    /{user_id}/
      /avatars/
      /custom-images/
  /festivals/
    /{festival_id}/
      /images/
  /templates/
    /{template_id}/
      /previews/
      /generated/
```

### Image Processing Pipeline
1. **Upload Validation** - File type, size, dimensions
2. **Virus Scanning** - Security check
3. **Image Optimization** - Compression, format conversion
4. **Multiple Formats** - WebP, JPEG, PNG variants
5. **CDN Distribution** - Global content delivery

## Background Tasks

### Celery Task Queue
```python
# Task types
- Email notifications (welcome, password reset)
- Image processing and optimization
- Template preview generation
- Usage analytics aggregation
- User activity reports
- Template similarity indexing
```

## AI Integration

### Template Recommendation System
```python
# Features for ML model
- User's previous template usage
- Festival preferences
- Template ratings and reviews
- Similar user behavior
- Seasonal trending patterns
- Template visual similarity (using embeddings)
```

### Content Generation
- **AI-powered message suggestions**
- **Auto-generated festival descriptions**
- **Template categorization**
- **Content moderation**

## Monitoring & Analytics

### Application Metrics
```python
# Key metrics to track
- User registration/login rates
- Template usage statistics
- Card generation volume
- API response times
- Error rates by endpoint
- Database query performance
- Cache hit rates
```

### Business Intelligence
- User engagement analytics
- Popular festivals and templates
- Revenue tracking (premium features)
- Conversion funnel analysis
- User retention metrics

## Deployment Architecture

### Production Environment
```yaml
# Docker Compose structure
services:
  fastapi:
    - Load balancer (Nginx)
    - Multiple FastAPI instances
    - Auto-scaling based on load
  
  database:
    - PostgreSQL with read replicas
    - Connection pooling
    - Automated backups
  
  cache:
    - Redis cluster
    - Session storage
    - Application cache
  
  workers:
    - Celery workers
    - Background task processing
    - Queue monitoring
```

### Infrastructure Requirements
- **Web Servers**: 2+ FastAPI instances behind load balancer
- **Database**: PostgreSQL with read replicas
- **Cache**: Redis cluster for high availability
- **Storage**: AWS S3 or Cloudinary for file storage
- **CDN**: CloudFront or Cloudflare for global delivery
- **Monitoring**: Prometheus + Grafana + Sentry

## Migration Strategy

### Phase 1: Core Backend Setup
1. Set up FastAPI application structure
2. Implement authentication system
3. Create database models and migrations
4. Basic CRUD operations for festivals and templates

### Phase 2: Template Management
1. Template creation and editing interface
2. Template versioning system
3. Public template gallery
4. Rating and review system

### Phase 3: Advanced Features
1. AI-powered recommendations
2. Advanced analytics
3. Premium features
4. Social features (sharing, collections)

### Phase 4: Optimization
1. Performance optimization
2. Advanced caching
3. CDN integration
4. Mobile app API support

## Environment Configuration

### Development Environment
```python
# .env.development
DATABASE_URL=postgresql://user:pass@localhost/tyohaarify_dev
REDIS_URL=redis://localhost:6379
SECRET_KEY=dev-secret-key
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=30
CORS_ORIGINS=["http://localhost:3000"]
```

### Production Environment
```python
# .env.production
DATABASE_URL=postgresql://user:pass@prod-db:5432/tyohaarify
REDIS_URL=redis://prod-redis:6379
SECRET_KEY=${SECRET_KEY}
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=15
CORS_ORIGINS=["https://tyohaarify.com"]
```

## API Documentation

### Automatic Documentation
- **Swagger UI** - Interactive API documentation
- **ReDoc** - Alternative documentation interface
- **OpenAPI Schema** - Machine-readable API specification

### Developer Resources
- API usage examples
- SDK for common languages
- Postman collection
- Integration tutorials

## Testing Strategy

### Test Coverage
```python
# Testing layers
- Unit tests (90%+ coverage)
- Integration tests
- API endpoint tests
- Database tests
- Authentication tests
- Performance tests
- Load tests
```

### Test Tools
- **pytest** - Main testing framework
- **pytest-asyncio** - Async test support
- **httpx** - HTTP client for API testing
- **factory-boy** - Test data generation
- **pytest-cov** - Coverage reporting

This comprehensive design provides a solid foundation for implementing a robust FastAPI backend for the Tyohaarify application, supporting all the required features while maintaining scalability, security, and performance.