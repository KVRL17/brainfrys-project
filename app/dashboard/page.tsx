'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { Sidebar } from '@/components/layout/sidebar';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentTasks } from '@/components/dashboard/recent-tasks';
import { supabase } from '@/lib/supabase';
import type { Task, TaskStats } from '@/lib/supabase';
import { isAfter } from 'date-fns';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    in_progress: 0,
    overdue: 0,
  });
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      setTasks(data || []);
      
      // Calculate stats
      const { data: allTasks } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user?.id);

      if (allTasks) {
        const completed = allTasks.filter(task => task.status === 'completed').length;
        const pending = allTasks.filter(task => task.status === 'pending').length;
        const inProgress = allTasks.filter(task => task.status === 'in-progress').length;
        const overdue = allTasks.filter(task => 
          task.due_date && 
          task.status !== 'completed' && 
          isAfter(new Date(), new Date(task.due_date))
        ).length;

        setStats({
          total: allTasks.length,
          completed,
          pending,
          in_progress: inProgress,
          overdue,
        });
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setTasksLoading(false);
    }
  };

  // Show loading state
  if (loading || tasksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    window.location.href = '/';
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="md:pl-64">
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.user_metadata?.full_name || user.email}!
            </h1>
            <p className="text-gray-600 mt-2">
              Here&apos;s an overview of your learning progress
            </p>
          </div>

          <div className="space-y-8">
            <StatsCards stats={stats} />
            <RecentTasks tasks={tasks} />
          </div>
        </main>
      </div>
    </div>
  );
}