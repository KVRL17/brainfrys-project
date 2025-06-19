# Personal Learning Planner

A comprehensive task management web application built specifically for students and learners to organize their studies, track progress, and achieve their learning goals.

## 🚀 Live Demo

**Demo URL:** [Your deployed app URL will go here]

**Test Credentials:**
- Email: `demo@brainfrys.com`
- Password: `demo123`

## 📋 Project Overview

This project was built as part of the application process for **BrainFrys Private Limited** - Full Stack Developer position. It demonstrates proficiency in modern web development technologies and best practices.

## ✨ Features

### Core Functionality
- **User Authentication**: Complete registration and login system with secure password handling
- **Task Management**: Create, edit, delete, and organize tasks with categories and priorities
- **Dashboard**: Interactive overview with progress tracking and statistics
- **Search & Filter**: Advanced filtering by status, category, priority, and search functionality
- **Analytics**: Visual progress tracking with charts and insights
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices

### Advanced Features
- **Real-time Updates**: Live data synchronization across all components
- **Progress Visualization**: Interactive charts showing completion rates and trends
- **Category Management**: Organize tasks by subject/category
- **Priority System**: High, medium, and low priority task organization
- **Due Date Tracking**: Calendar integration with overdue task alerts
- **Status Management**: Pending, In Progress, and Completed task states

## 🛠️ Tech Stack

### Frontend
- **Next.js 13.5.1** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling and responsive design
- **shadcn/ui** - High-quality UI component library
- **Recharts** - Data visualization and charts
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Lucide React** - Modern icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication system
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Auto-generated APIs

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🏗️ Architecture

### Database Schema
```sql
-- Users table (handled by Supabase Auth)
-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT CHECK (status IN ('pending', 'in-progress', 'completed')),
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);
```

### Project Structure
```
/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── tasks/            # Task management page
│   ├── analytics/        # Analytics and charts page
│   ├── profile/          # User profile page
│   ├── settings/         # Application settings
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage with auth
│   └── globals.css       # Global styles
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/           # Layout components (sidebar, etc.)
│   ├── tasks/            # Task management components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility libraries
│   ├── auth.tsx          # Authentication context
│   ├── supabase.ts       # Supabase client and types
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd personal-learning-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your credentials
   - Copy the database schema from `/supabase/migrations/` (if you have migrations)

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Set up the database**
   
   Execute this SQL in your Supabase SQL editor:
   ```sql
   -- Create tasks table
   CREATE TABLE tasks (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title TEXT NOT NULL,
     description TEXT,
     category TEXT NOT NULL,
     priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
     status TEXT CHECK (status IN ('pending', 'in-progress', 'completed')) DEFAULT 'pending',
     due_date TIMESTAMPTZ,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW(),
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
   );

   -- Enable RLS
   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can read own tasks" ON tasks
     FOR SELECT TO authenticated
     USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert own tasks" ON tasks
     FOR INSERT TO authenticated
     WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update own tasks" ON tasks
     FOR UPDATE TO authenticated
     USING (auth.uid() = user_id);

   CREATE POLICY "Users can delete own tasks" ON tasks
     FOR DELETE TO authenticated
     USING (auth.uid() = user_id);
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Key Features Demonstration

### Authentication System
- Secure user registration and login
- Password validation and error handling
- Session management with Supabase Auth
- Demo credentials provided for testing

### Task Management
- Create tasks with title, description, category, priority, and due date
- Edit existing tasks with real-time updates
- Delete tasks with confirmation
- Status tracking (Pending → In Progress → Completed)

### Dashboard Analytics
- Task completion statistics
- Visual progress charts
- Category distribution analysis
- Recent tasks overview
- Overdue task alerts

### Advanced Filtering
- Search tasks by title, description, or category
- Filter by status, category, and priority
- Multiple filter combinations
- Clear all filters functionality

## 🎯 Development Decisions

### Why Next.js?
- Server-side rendering for better SEO and performance
- App Router for modern React patterns
- Built-in TypeScript support
- Excellent developer experience

### Why Supabase?
- Rapid development with instant APIs
- Built-in authentication system
- Real-time capabilities
- PostgreSQL with full SQL support
- Row Level Security for data protection

### Why Tailwind CSS?
- Utility-first approach for rapid styling
- Consistent design system
- Responsive design made easy
- Small bundle size in production

### Why shadcn/ui?
- High-quality, accessible components
- Customizable design system
- TypeScript support
- Modern React patterns

## 📈 Performance Optimizations

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized loading
- **Static Generation**: Pre-rendered pages where possible
- **Database Indexing**: Optimized queries with proper indexing
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React hooks for preventing unnecessary re-renders

## 🔒 Security Features

- **Row Level Security**: Database-level security with Supabase RLS
- **Authentication**: Secure JWT-based authentication
- **Input Validation**: Client and server-side validation with Zod
- **SQL Injection Prevention**: Parameterized queries through Supabase
- **XSS Protection**: Sanitized inputs and outputs

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Configure Domain**
   - Add custom domain if needed
   - Update Supabase authentication settings with new domain

### Build Locally
```bash
npm run build
npm start
```

## 📱 Mobile Responsiveness

- **Mobile-First Design**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **Responsive Navigation**: Collapsible sidebar for mobile
- **Adaptive Layouts**: Flexible grids and components
- **Performance**: Optimized for slower mobile connections

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Task creation, editing, and deletion
- [ ] Search and filtering functionality
- [ ] Dashboard statistics accuracy
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### Automated Testing (Future Enhancement)
- Unit tests with Jest and React Testing Library
- Integration tests with Cypress
- Performance testing with Lighthouse

## 🔮 Future Enhancements

### Planned Features
- [ ] Dark mode theme support
- [ ] Push notifications for due dates
- [ ] Collaborative task sharing
- [ ] Export data functionality
- [ ] Mobile app with React Native
- [ ] Offline functionality with PWA
- [ ] Advanced analytics and reporting
- [ ] Integration with calendar applications
- [ ] File attachments for tasks
- [ ] Task templates and automation

### Scalability Considerations
- [ ] Redis caching for frequently accessed data
- [ ] CDN integration for static assets
- [ ] Database optimization and sharding
- [ ] Microservices architecture
- [ ] Load balancing and auto-scaling

## 📞 Contact Information

**Developer:** [Your Name]
**Email:** [Your Email]
**GitHub:** [Your GitHub Profile]
**LinkedIn:** [Your LinkedIn Profile]

## 📄 License

This project is created for the BrainFrys Private Limited job application and is not intended for commercial use.

---

**Built with ❤️ for BrainFrys Private Limited**

*Demonstrating modern web development skills with Next.js, TypeScript, Supabase, and Tailwind CSS*