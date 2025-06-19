'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Calendar
} from 'lucide-react';
import { format, isAfter } from 'date-fns';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Task } from '@/lib/supabase';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onTasksChange: () => void;
}

export function TaskList({ tasks, onEditTask, onTasksChange }: TaskListProps) {
  const [deletingTasks, setDeletingTasks] = useState<Set<string>>(new Set());

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const isOverdue = (task: Task) => {
    return task.due_date && task.status !== 'completed' && isAfter(new Date(), new Date(task.due_date));
  };

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', taskId);

      if (error) throw error;
      
      toast.success('Task status updated!');
      onTasksChange();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error('Failed to update task status');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setDeletingTasks(prev => new Set(prev).add(taskId));
    
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      
      toast.success('Task deleted successfully!');
      onTasksChange();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error('Failed to delete task');
    } finally {
      setDeletingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500">Try adjusting your search or filters, or create a new task.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <Card 
          key={task.id} 
          className={`transition-all duration-200 hover:shadow-md ${
            isOverdue(task) ? 'border-red-200 bg-red-50' : ''
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                {getStatusIcon(task.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {task.title}
                    </h3>
                    {isOverdue(task) && (
                      <Badge variant="destructive" className="text-xs">
                        Overdue
                      </Badge>
                    )}
                  </div>
                  
                  {task.description && (
                    <p className="text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {task.category}
                    </Badge>
                    <Badge className={`text-xs border ${getPriorityColor(task.priority)}`}>
                      {task.priority} priority
                    </Badge>
                    <Badge className={`text-xs border ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </Badge>
                  </div>

                  {task.due_date && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {task.status !== 'completed' && (
                  <Button
                    onClick={() => handleStatusChange(task.id, 'completed')}
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditTask(task)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    {task.status !== 'in-progress' && (
                      <DropdownMenuItem 
                        onClick={() => handleStatusChange(task.id, 'in-progress')}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Mark In Progress
                      </DropdownMenuItem>
                    )}
                    {task.status !== 'pending' && (
                      <DropdownMenuItem 
                        onClick={() => handleStatusChange(task.id, 'pending')}
                      >
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Mark Pending
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-600"
                      disabled={deletingTasks.has(task.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {deletingTasks.has(task.id) ? 'Deleting...' : 'Delete'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}