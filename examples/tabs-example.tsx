import React, { useState } from 'react';
import { LiveMenuTabs, TabItem } from '@codearemo/livemenu-ui';

/**
 * Example 1: Basic Tabs (Underline Variant)
 */
export function BasicTabsExample() {
  const tabs: TabItem[] = [
    { id: 'home', label: 'Home', content: <div className="p-4">Home content goes here</div> },
    { id: 'about', label: 'About', content: <div className="p-4">About content goes here</div> },
    { id: 'contact', label: 'Contact', content: <div className="p-4">Contact content goes here</div> }
  ];

  return <LiveMenuTabs tabs={tabs} defaultActiveTab="home" />;
}

/**
 * Example 2: Pills Variant
 */
export function PillsTabsExample() {
  const tabs: TabItem[] = [
    { id: 'profile', label: 'Profile', content: <div className="p-4">Profile settings</div> },
    { id: 'security', label: 'Security', content: <div className="p-4">Security settings</div> },
    { id: 'notifications', label: 'Notifications', content: <div className="p-4">Notification preferences</div> }
  ];

  return <LiveMenuTabs tabs={tabs} variant="pills" />;
}

/**
 * Example 3: Bordered Variant
 */
export function BorderedTabsExample() {
  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview', content: <div className="p-4">Dashboard overview</div> },
    { id: 'analytics', label: 'Analytics', content: <div className="p-4">Analytics data</div> },
    { id: 'reports', label: 'Reports', content: <div className="p-4">Generated reports</div> }
  ];

  return <LiveMenuTabs tabs={tabs} variant="bordered" />;
}

/**
 * Example 4: With Icons and Badges
 */
export function TabsWithIconsAndBadges() {
  const tabs: TabItem[] = [
    { 
      id: 'inbox', 
      label: 'Inbox',
      icon: <span>📧</span>,
      badge: 12,
      content: <div className="p-4">You have 12 new messages</div>
    },
    { 
      id: 'sent', 
      label: 'Sent',
      icon: <span>📤</span>,
      content: <div className="p-4">Sent messages</div>
    },
    { 
      id: 'drafts', 
      label: 'Drafts',
      icon: <span>📝</span>,
      badge: 3,
      content: <div className="p-4">You have 3 drafts</div>
    }
  ];

  return <LiveMenuTabs tabs={tabs} variant="pills" />;
}

/**
 * Example 5: With Disabled Tab
 */
export function TabsWithDisabledExample() {
  const tabs: TabItem[] = [
    { id: 'active1', label: 'Active Tab 1', content: <div className="p-4">Content 1</div> },
    { id: 'disabled', label: 'Disabled Tab', content: <div className="p-4">Content 2</div>, disabled: true },
    { id: 'active2', label: 'Active Tab 2', content: <div className="p-4">Content 3</div> }
  ];

  return <LiveMenuTabs tabs={tabs} />;
}

/**
 * Example 6: Full Width Pills
 */
export function FullWidthTabsExample() {
  const tabs: TabItem[] = [
    { id: 'monthly', label: 'Monthly', content: <div className="p-4">Monthly statistics</div> },
    { id: 'weekly', label: 'Weekly', content: <div className="p-4">Weekly statistics</div> },
    { id: 'daily', label: 'Daily', content: <div className="p-4">Daily statistics</div> }
  ];

  return <LiveMenuTabs tabs={tabs} variant="pills" fullWidth />;
}

/**
 * Example 7: Different Sizes
 */
export function TabsSizesExample() {
  const tabs: TabItem[] = [
    { id: 'tab1', label: 'Tab 1', content: <div className="p-4">Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div className="p-4">Content 2</div> },
    { id: 'tab3', label: 'Tab 3', content: <div className="p-4">Content 3</div> }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 font-semibold">Small</h3>
        <LiveMenuTabs tabs={tabs} size="sm" />
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Medium (Default)</h3>
        <LiveMenuTabs tabs={tabs} size="md" />
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Large</h3>
        <LiveMenuTabs tabs={tabs} size="lg" />
      </div>
    </div>
  );
}

/**
 * Example 8: Controlled Tabs
 */
export function ControlledTabsExample() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs: TabItem[] = [
    { id: 'tab1', label: 'Tab 1', content: <div className="p-4">Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div className="p-4">Content 2</div> },
    { id: 'tab3', label: 'Tab 3', content: <div className="p-4">Content 3</div> }
  ];

  return (
    <div>
      <LiveMenuTabs 
        tabs={tabs} 
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <p>Current active tab: <strong>{activeTab}</strong></p>
        <div className="mt-2 space-x-2">
          <button 
            onClick={() => setActiveTab('tab1')}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Go to Tab 1
          </button>
          <button 
            onClick={() => setActiveTab('tab2')}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Go to Tab 2
          </button>
          <button 
            onClick={() => setActiveTab('tab3')}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Go to Tab 3
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Example 9: Complex Content
 */
export function ComplexContentTabsExample() {
  const tabs: TabItem[] = [
    { 
      id: 'dashboard', 
      label: 'Dashboard',
      icon: <span>📊</span>,
      content: (
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded">
              <h3 className="font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">1,234</p>
            </div>
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded">
              <h3 className="font-semibold">Revenue</h3>
              <p className="text-3xl font-bold">$12,345</p>
            </div>
            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded">
              <h3 className="font-semibold">Orders</h3>
              <p className="text-3xl font-bold">567</p>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'users', 
      label: 'Users',
      icon: <span>👥</span>,
      badge: 'New',
      content: (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">John Doe</td>
                <td className="p-2">john@example.com</td>
                <td className="p-2">Active</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Jane Smith</td>
                <td className="p-2">jane@example.com</td>
                <td className="p-2">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    { 
      id: 'settings', 
      label: 'Settings',
      icon: <span>⚙️</span>,
      content: (
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">Settings</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded">
              <span>Email Notifications</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <span>Push Notifications</span>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <span>Dark Mode</span>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </div>
      )
    }
  ];

  return <LiveMenuTabs tabs={tabs} variant="pills" size="lg" />;
}

/**
 * All Examples Component
 */
export function AllTabsExamples() {
  return (
    <div className="space-y-12 p-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">1. Basic Tabs (Underline)</h2>
        <BasicTabsExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">2. Pills Variant</h2>
        <PillsTabsExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">3. Bordered Variant</h2>
        <BorderedTabsExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">4. With Icons and Badges</h2>
        <TabsWithIconsAndBadges />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">5. With Disabled Tab</h2>
        <TabsWithDisabledExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">6. Full Width Pills</h2>
        <FullWidthTabsExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">7. Different Sizes</h2>
        <TabsSizesExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">8. Controlled Tabs</h2>
        <ControlledTabsExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">9. Complex Content</h2>
        <ComplexContentTabsExample />
      </section>
    </div>
  );
}
