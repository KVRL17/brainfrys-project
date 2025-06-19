'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';
import { BookOpen, Users, BarChart3, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (user) {
    window.location.href = '/dashboard';
    return null;
  }

  const features = [
    {
      icon: BookOpen,
      title: 'Smart Task Management',
      description: 'Organize your learning tasks with categories, priorities, and due dates.'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Visualize your learning progress with detailed analytics and insights.'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Share goals and achievements with your learning community.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your learning data is encrypted and stored securely in the cloud.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Personal Learning Planner
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={isLogin ? 'default' : 'outline'}
                onClick={() => setIsLogin(true)}
                size="sm"
              >
                Sign In
              </Button>
              <Button
                variant={!isLogin ? 'default' : 'outline'}
                onClick={() => setIsLogin(false)}
                size="sm"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Master Your Learning
                <span className="text-blue-600 block">Journey</span>
              </h1>
              <p className="text-xl text-gray-600 mt-4">
                Transform your study habits with our intelligent task management system. 
                Track progress, set goals, and achieve academic success.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats */}
            <div className="flex space-x-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10k+</div>
                <div className="text-sm text-gray-600">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50k+</div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Auth Forms */}
          <div className="lg:pl-8">
            {isLogin ? (
              <LoginForm onToggleMode={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onToggleMode={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2025 Personal Learning Planner. Built for the BrainFrys job application.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Developed with Next.js, TypeScript, Supabase, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}