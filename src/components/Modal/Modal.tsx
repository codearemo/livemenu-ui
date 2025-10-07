import React, { useEffect, useRef, useCallback } from 'react';

export interface ModalOptions {
  dismissable?: boolean;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  backdrop?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  overlayClassName?: string;
  zIndex?: number;
}

export interface LiveMenuModalProps extends ModalOptions {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const LiveMenuModal: React.FC<LiveMenuModalProps> = ({
  isOpen,
  onClose,
  children,
  dismissable = true,
  showCloseButton = true,
  size = 'md',
  backdrop = true,
  closeOnEscape = true,
  className = '',
  overlayClassName = '',
  zIndex = 50,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

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
    modalRef.current?.focus();

    return () => {
      previousActiveElement?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${overlayClassName}`}
      style={{ zIndex }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      {backdrop && (
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300 ease-in-out"
          style={{ opacity: 0.5 }}
          aria-hidden="true"
        />
      )}

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`
          relative bg-white dark:bg-gray-800 rounded-lg shadow-xl
          w-full ${sizeClasses[size]}
          max-h-[90vh] overflow-auto
          transform transition-all duration-300 ease-in-out
          animate-modal-enter
          ${className}
        `}
        tabIndex={-1}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="
              absolute top-4 right-4 z-10
              text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-livemenu focus:ring-opacity-50 rounded
              p-1
            "
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

        {/* Modal Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Legacy alias
export const Modal = LiveMenuModal;

