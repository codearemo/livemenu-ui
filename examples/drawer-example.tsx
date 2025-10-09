import React, { useState } from 'react';
import { 
  LiveMenuDrawer, 
  DrawerHeader, 
  DrawerBody, 
  DrawerFooter 
} from '@codearemo/livemenu-ui';

/**
 * Example 1: Basic Right Drawer
 */
export function BasicRightDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
      >
        Open Right Drawer
      </button>

      <LiveMenuDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerHeader>
          <h2 className="text-xl font-bold">Right Drawer</h2>
        </DrawerHeader>
        <DrawerBody>
          <p>This is a basic drawer sliding from the right side.</p>
          <p className="mt-4">Click outside or press ESC to close.</p>
        </DrawerBody>
      </LiveMenuDrawer>
    </>
  );
}

/**
 * Example 2: Left Navigation Drawer
 */
export function LeftNavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: '📊', href: '#' },
    { label: 'Projects', icon: '📁', href: '#' },
    { label: 'Team', icon: '👥', href: '#' },
    { label: 'Calendar', icon: '📅', href: '#' },
    { label: 'Documents', icon: '📄', href: '#' },
    { label: 'Settings', icon: '⚙️', href: '#' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
      >
        Open Navigation
      </button>

      <LiveMenuDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
        size="md"
      >
        <DrawerHeader>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍔</span>
            <h2 className="text-xl font-bold">Menu</h2>
          </div>
        </DrawerHeader>
        <DrawerBody>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </DrawerBody>
        <DrawerFooter>
          <div className="flex items-center gap-3 px-4">
            <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
              JD
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
            </div>
          </div>
        </DrawerFooter>
      </LiveMenuDrawer>
    </>
  );
}

/**
 * Example 3: Top Notification Drawer
 */
export function TopNotificationDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New message', message: 'You have a new message from Alice', time: '2 min ago' },
    { id: 2, title: 'Update available', message: 'A new version is available', time: '1 hour ago' },
    { id: 3, title: 'Task completed', message: 'Your export task has finished', time: '3 hours ago' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
      >
        Show Notifications
      </button>

      <LiveMenuDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="top"
        size="md"
      >
        <DrawerHeader>
          <h2 className="text-xl font-bold">Notifications</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{notif.title}</h3>
                  <span className="text-xs text-gray-500">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notif.message}</p>
              </div>
            ))}
          </div>
        </DrawerBody>
        <DrawerFooter>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            Mark all as read
          </button>
        </DrawerFooter>
      </LiveMenuDrawer>
    </>
  );
}

/**
 * Example 4: Bottom Sheet Drawer
 */
export function BottomSheetDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
      >
        Open Bottom Sheet
      </button>

      <LiveMenuDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="bottom"
        size="lg"
      >
        <DrawerHeader>
          <h2 className="text-xl font-bold">Share Options</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="grid grid-cols-4 gap-4">
            {['Email', 'Twitter', 'Facebook', 'LinkedIn', 'WhatsApp', 'Copy Link', 'SMS', 'More'].map((option) => (
              <button
                key={option}
                className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => {
                  alert(`Sharing via ${option}`);
                  setIsOpen(false);
                }}
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  📤
                </div>
                <span className="text-sm">{option}</span>
              </button>
            ))}
          </div>
        </DrawerBody>
      </LiveMenuDrawer>
    </>
  );
}

/**
 * Example 5: Different Sizes
 */
export function DrawerSizes() {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const sizes = ['sm', 'md', 'lg', 'xl'] as const;

  return (
    <div className="space-x-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => setOpenDrawer(size)}
          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
        >
          {size.toUpperCase()} Drawer
        </button>
      ))}

      {sizes.map((size) => (
        <LiveMenuDrawer
          key={size}
          isOpen={openDrawer === size}
          onClose={() => setOpenDrawer(null)}
          size={size}
        >
          <DrawerHeader>
            <h2 className="text-xl font-bold">{size.toUpperCase()} Drawer</h2>
          </DrawerHeader>
          <DrawerBody>
            <p>This is a {size} sized drawer.</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Size: {size === 'sm' ? '256px' : size === 'md' ? '320px' : size === 'lg' ? '384px' : '512px'}
            </p>
          </DrawerBody>
        </LiveMenuDrawer>
      ))}
    </div>
  );
}

/**
 * Example 6: Filter Panel Drawer
 */
export function FilterPanelDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceMin: 0,
    priceMax: 1000,
    inStock: false,
    rating: 0,
  });

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
      >
        Open Filters
      </button>

      <LiveMenuDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        size="lg"
      >
        <DrawerHeader>
          <h2 className="text-xl font-bold">Filters</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="home">Home & Garden</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Price Range: ${filters.priceMin} - ${filters.priceMax}
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilters({ ...filters, rating })}
                    className={`px-3 py-1 rounded ${
                      filters.rating >= rating
                        ? 'bg-yellow-400 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    ⭐ {rating}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">In Stock Only</span>
              </label>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <div className="flex gap-2 justify-between">
            <button
              onClick={() =>
                setFilters({ category: '', priceMin: 0, priceMax: 1000, inStock: false, rating: 0 })
              }
              className="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-6 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
            >
              Apply Filters
            </button>
          </div>
        </DrawerFooter>
      </LiveMenuDrawer>
    </>
  );
}

/**
 * Example 7: Shopping Cart Drawer
 */
export function ShoppingCartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1, image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 199.99, quantity: 1, image: '⌚' },
    { id: 3, name: 'Laptop Stand', price: 49.99, quantity: 2, image: '💻' },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 relative"
      >
        Cart ({cartItems.length})
      </button>

      <LiveMenuDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="right" size="md">
        <DrawerHeader>
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <p className="text-sm text-gray-500">{cartItems.length} items</p>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-3xl">
                  {item.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-lg font-bold text-primary-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DrawerBody>
        <DrawerFooter>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium"
              onClick={() => {
                alert('Proceeding to checkout...');
                setIsOpen(false);
              }}
            >
              Checkout
            </button>
          </div>
        </DrawerFooter>
      </LiveMenuDrawer>
    </>
  );
}

/**
 * Example 8: Form Drawer
 */
export function FormDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsOpen(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
      >
        Contact Us
      </button>

      <LiveMenuDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="right" size="lg">
        <DrawerHeader>
          <h2 className="text-xl font-bold">Contact Form</h2>
          <p className="text-sm text-gray-500">We'll get back to you soon</p>
        </DrawerHeader>
        <form onSubmit={handleSubmit}>
          <DrawerBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
              >
                Send Message
              </button>
            </div>
          </DrawerFooter>
        </form>
      </LiveMenuDrawer>
    </>
  );
}

/**
 * Example 9: Non-dismissable Drawer
 */
export function NonDismissableDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
      >
        Open Important Drawer
      </button>

      <LiveMenuDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        dismissable={false}
        closeOnEscape={false}
      >
        <DrawerHeader>
          <h2 className="text-xl font-bold text-red-600">⚠️ Important Notice</h2>
        </DrawerHeader>
        <DrawerBody>
          <p className="mb-4">
            This drawer cannot be closed by clicking outside or pressing ESC.
          </p>
          <p>You must explicitly click the button to close it.</p>
        </DrawerBody>
        <DrawerFooter>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            I Understand
          </button>
        </DrawerFooter>
      </LiveMenuDrawer>
    </>
  );
}

/**
 * All Examples Component
 */
export function AllDrawerExamples() {
  return (
    <div className="space-y-12 p-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">1. Basic Right Drawer</h2>
        <BasicRightDrawer />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">2. Left Navigation Drawer</h2>
        <LeftNavigationDrawer />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">3. Top Notification Drawer</h2>
        <TopNotificationDrawer />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">4. Bottom Sheet Drawer</h2>
        <BottomSheetDrawer />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">5. Different Sizes</h2>
        <DrawerSizes />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">6. Filter Panel Drawer</h2>
        <FilterPanelDrawer />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">7. Shopping Cart Drawer</h2>
        <ShoppingCartDrawer />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">8. Form Drawer</h2>
        <FormDrawer />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">9. Non-dismissable Drawer</h2>
        <NonDismissableDrawer />
      </section>
    </div>
  );
}

