import React, { useState } from 'react';
import { LiveMenuButton } from '../Button';

export interface ConfirmOptions {
  title?: string;
  message: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  variant?: 'primary' | 'danger' | 'warning' | 'success';
  icon?: React.ReactNode;
  customActions?: React.ReactNode;
}

export interface LiveMenuConfirmProps extends ConfirmOptions {
  onClose: () => void;
  modalId?: string;
}

export const LiveMenuConfirm: React.FC<LiveMenuConfirmProps> = ({
  title = 'Confirm',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  onClose,
  variant = 'primary',
  icon,
  customActions,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) {
      onClose();
      return;
    }

    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Confirm action failed:', error);
      // Don't close the modal if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  // Variant configurations
  const variantConfig = {
    primary: {
      iconColor: 'text-livemenu',
      buttonVariant: 'primary' as const,
    },
    danger: {
      iconColor: 'text-danger',
      buttonVariant: 'danger' as const,
    },
    warning: {
      iconColor: 'text-warning',
      buttonVariant: 'warning' as const,
    },
    success: {
      iconColor: 'text-success',
      buttonVariant: 'success' as const,
    },
  };

  const config = variantConfig[variant];

  // Default icons based on variant
  const defaultIcons = {
    primary: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    danger: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    warning: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    success: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  const displayIcon = icon !== undefined ? icon : defaultIcons[variant];

  return (
    <div className="p-6">
      {/* Icon */}
      {displayIcon && (
        <div className={`flex justify-center mb-4 ${config.iconColor}`}>
          {displayIcon}
        </div>
      )}

      {/* Title */}
      <h2 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-gray-100">
        {title}
      </h2>

      {/* Message */}
      <div className="text-center mb-6 text-gray-600 dark:text-gray-300">
        {typeof message === 'string' ? <p>{message}</p> : message}
      </div>

      {/* Actions */}
      {customActions ? (
        // Custom actions - user provided
        <div className="flex justify-center gap-3">{customActions}</div>
      ) : (
        // Default actions
        <div className="flex justify-end gap-3">
          <LiveMenuButton
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelText}
          </LiveMenuButton>
          <LiveMenuButton
            variant={config.buttonVariant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </LiveMenuButton>
        </div>
      )}
    </div>
  );
};

// Legacy alias
export const Confirm = LiveMenuConfirm;

