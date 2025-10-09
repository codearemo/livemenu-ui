import React, { useEffect, useRef, useCallback } from 'react';

export interface DrawerOptions {
  /**
   * Whether clicking outside the drawer closes it
   */
  dismissable?: boolean;
  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;
  /**
   * Position of the drawer
   */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * Size of the drawer
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * Whether to show backdrop overlay
   */
  backdrop?: boolean;
  /**
   * Whether to close on Escape key
   */
  closeOnEscape?: boolean;
  /**
   * Additional CSS classes for the drawer
   */
  className?: string;
  /**
   * Additional CSS classes for the overlay
   */
  overlayClassName?: string;
  /**
   * Z-index for the drawer
   */
  zIndex?: number;
  /**
   * Whether to lock body scroll when drawer is open
   */
  lockScroll?: boolean;
}

export interface LiveMenuDrawerProps extends DrawerOptions {
  /**
   * Whether the drawer is open
   */
  isOpen: boolean;
  /**
   * Callback when drawer should close
   */
  onClose: () => void;
  /**
   * Content to display in the drawer
   */
  children: React.ReactNode;
}

/**
 * LiveMenuDrawer - A slide-in panel component
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <LiveMenuDrawer
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   position="right"
 * >
 *   <DrawerHeader>Navigation</DrawerHeader>
 *   <DrawerBody>
 *     <p>Drawer content goes here</p>
 *   </DrawerBody>
 * </LiveMenuDrawer>
 * ```
 */
export const LiveMenuDrawer: React.FC<LiveMenuDrawerProps> = ({
  isOpen,
  onClose,
  children,
  dismissable = true,
  showCloseButton = true,
  position = 'right',
  size = 'md',
  backdrop = true,
  closeOnEscape = true,
  className = '',
  overlayClassName = '',
  zIndex = 50,
  lockScroll = true,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle body scroll lock
  useEffect(() => {
    if (!isOpen || !lockScroll) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, lockScroll]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (dismissable && event.target === event.currentTarget) {
        onClose();
      }
    },
    [dismissable, onClose]
  );

  // Focus management
  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement;
    drawerRef.current?.focus();

    return () => {
      previousActiveElement?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Size classes based on position
  const getSizeClasses = () => {
    const isHorizontal = position === 'left' || position === 'right';
    
    if (isHorizontal) {
      switch (size) {
        case 'sm':
          return 'w-64';
        case 'md':
          return 'w-80';
        case 'lg':
          return 'w-96';
        case 'xl':
          return 'w-[32rem]';
        case 'full':
          return 'w-full';
        default:
          return 'w-80';
      }
    } else {
      switch (size) {
        case 'sm':
          return 'h-64';
        case 'md':
          return 'h-80';
        case 'lg':
          return 'h-96';
        case 'xl':
          return 'h-[32rem]';
        case 'full':
          return 'h-full';
        default:
          return 'h-80';
      }
    }
  };

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'top-0 left-0 h-full';
      case 'right':
        return 'top-0 right-0 h-full';
      case 'top':
        return 'top-0 left-0 w-full';
      case 'bottom':
        return 'bottom-0 left-0 w-full';
      default:
        return 'top-0 right-0 h-full';
    }
  };

  // Animation classes
  const getAnimationClasses = () => {
    const base = 'transition-transform duration-300 ease-in-out';
    
    switch (position) {
      case 'left':
        return `${base} animate-slide-in-left`;
      case 'right':
        return `${base} animate-slide-in-right`;
      case 'top':
        return `${base} animate-slide-in-top`;
      case 'bottom':
        return `${base} animate-slide-in-bottom`;
      default:
        return `${base} animate-slide-in-right`;
    }
  };

  // Overlay classes
  const overlayClasses = [
    'fixed inset-0',
    backdrop ? 'bg-black/50 dark:bg-black/70' : '',
    'transition-opacity duration-300',
    overlayClassName,
  ]
    .filter(Boolean)
    .join(' ');

  // Drawer classes
  const drawerClasses = [
    'livemenu-drawer',
    'fixed',
    getPositionClasses(),
    getSizeClasses(),
    getAnimationClasses(),
    'bg-white dark:bg-gray-900',
    'shadow-xl',
    'overflow-y-auto',
    'focus:outline-none',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className="livemenu-drawer-container"
      style={{ zIndex }}
    >
      {/* Backdrop */}
      <div
        className={overlayClasses}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={drawerClasses}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close drawer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

/**
 * DrawerHeader - Header section for drawer
 */
export interface DrawerHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  className = '',
}) => {
  const classes = [
    'livemenu-drawer-header',
    'px-6 py-4',
    'border-b border-gray-200 dark:border-gray-700',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

/**
 * DrawerBody - Main content section for drawer
 */
export interface DrawerBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerBody: React.FC<DrawerBodyProps> = ({
  children,
  className = '',
}) => {
  const classes = [
    'livemenu-drawer-body',
    'px-6 py-4',
    'flex-1',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

/**
 * DrawerFooter - Footer section for drawer
 */
export interface DrawerFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerFooter: React.FC<DrawerFooterProps> = ({
  children,
  className = '',
}) => {
  const classes = [
    'livemenu-drawer-footer',
    'px-6 py-4',
    'border-t border-gray-200 dark:border-gray-700',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

// Legacy exports for backwards compatibility
export const Drawer = LiveMenuDrawer;
export type DrawerProps = LiveMenuDrawerProps;

