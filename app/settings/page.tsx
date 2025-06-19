'use client';

import { useAuth } from '@/lib/auth';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  Download, 
  Trash2,
  AlertTriangle
} from 'lucide-react';

export default function SettingsPage() {
  const { user, loading, signOut } = useAuth();

  // Show loading state
  if (loading) {
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
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">
              Manage your application preferences and account settings
            </p>
          </div>

          <div className="max-w-2xl space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="task-reminders">Task Reminders</Label>
                    <p className="text-sm text-gray-600">
                      Get notified about upcoming task deadlines
                    </p>
                  </div>
                  <Switch id="task-reminders" disabled />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="daily-summary">Daily Summary</Label>
                    <p className="text-sm text-gray-600">
                      Receive daily progress summaries
                    </p>
                  </div>
                  <Switch id="daily-summary" disabled />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="achievement-alerts">Achievement Alerts</Label>
                    <p className="text-sm text-gray-600">
                      Get notified when you complete goals
                    </p>
                  </div>
                  <Switch id="achievement-alerts" disabled />
                </div>

                <Badge variant="secondary" className="text-xs">
                  Coming Soon - Push notifications will be available in the next update
                </Badge>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Moon className="h-5 w-5" />
                  <span>Appearance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-gray-600">
                      Switch to dark theme for better visibility
                    </p>
                  </div>
                  <Switch id="dark-mode" disabled />
                </div>

                <Badge variant="secondary" className="text-xs">
                  Coming Soon - Dark mode theme support
                </Badge>
              </CardContent>
            </Card>

            {/* Language & Region */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Language & Region</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Language</Label>
                    <p className="text-sm text-gray-600">English (US)</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Time Zone</Label>
                    <p className="text-sm text-gray-600">
                      {Intl.DateTimeFormat().resolvedOptions().timeZone}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Change
                  </Button>
                </div>

                <Badge variant="secondary" className="text-xs">
                  Multi-language support coming in future updates
                </Badge>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Account Status</Label>
                    <p className="text-sm text-gray-600">
                      Your account is secure and verified
                    </p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Verified
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Setup
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password</Label>
                    <p className="text-sm text-gray-600">
                      Last changed when you created your account
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Change
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Data Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Export Data</Label>
                    <p className="text-sm text-gray-600">
                      Download a copy of your learning data
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Export
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-red-600">Delete Account</Label>
                    <p className="text-sm text-gray-600">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200" disabled>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-800">
                        Advanced Features Coming Soon
                      </h4>
                      <p className="text-sm text-amber-700 mt-1">
                        Data export, account deletion, and other advanced settings will be available in future updates.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={signOut} variant="outline" className="w-full">
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}