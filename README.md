# Personal Learning Planner

A comprehensive task management web application built specifically for students and learners to organize their studies, track progress, and achieve their learning goals.

## 🚀 Live Demo

**Demo URL:** https://brainfrys-sable.vercel.app/

**Test Credentials:**
- Email: `venky200364@gmail.com`
- Password: `123@brainfrys`

## 📋 Project Overview

This project was built as part of the application process for **BrainFrys** - Full Stack Developer position. It demonstrates proficiency in modern web development technologies and best practices.

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
   ```

4. **Set up the database**
   
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

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
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

**Developer:** Karri Venkata Ramana
**Email:** venkataramanakarri.official@gmail.com
**GitHub:** https://github.com/KVRL17
**LinkedIn:** https://www.linkedin.com/in/venkata-ramana-karri/

This project is created for the BrainFrys job application and is not intended for commercial use.

---