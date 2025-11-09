import React, { useMemo, useState } from 'react';
import { Button, ButtonProps } from '../Button/Button';

export interface DialogActionContext {
  close: () => void;
  modalId: string;
}

export type DialogActionHandler = (context: DialogActionContext) => void | Promise<void>;

export interface LiveMenuDialogContentProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  hideCancelButton?: boolean;
  destructive?: boolean;
  closeOnConfirm?: boolean;
  closeOnCancel?: boolean;
  confirmButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
  onConfirm?: DialogActionHandler;
  onCancel?: DialogActionHandler;
}

interface DialogContentInternalProps extends LiveMenuDialogContentProps {
  actionContext: DialogActionContext;
}

/**
 * Presentational dialog content component rendered inside the modal system.
 * Handles layout, icon/title/description rendering, and default action buttons.
 */
export const LiveMenuDialogContent: React.FC<DialogContentInternalProps> = ({
  title,
  description,
  icon,
  content,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  hideCancelButton = false,
  destructive = false,
  closeOnConfirm = true,
  closeOnCancel = true,
  confirmButtonProps,
  cancelButtonProps,
  onConfirm,
  onCancel,
  actionContext,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const {
    loading: confirmLoadingProp,
    disabled: confirmDisabledProp,
    variant: confirmVariantProp,
    ...restConfirmButtonProps
  } = confirmButtonProps || {};

  const {
    loading: cancelLoadingProp,
    disabled: cancelDisabledProp,
    variant: cancelVariantProp,
    ...restCancelButtonProps
  } = cancelButtonProps || {};

  const confirmVariant: ButtonProps['variant'] =
    confirmVariantProp ?? (destructive ? 'danger' : 'primary');

  const confirmDisabled =
    confirmDisabledProp !== undefined ? confirmDisabledProp : confirmLoading || cancelLoading;
  const cancelDisabled =
    cancelDisabledProp !== undefined ? cancelDisabledProp : confirmLoading || cancelLoading;

  const handleConfirm = async () => {
    if (confirmLoading || cancelLoading || confirmLoadingProp) {
      return;
    }

    try {
      setConfirmLoading(true);
      if (onConfirm) {
        await onConfirm(actionContext);
      }
      if (closeOnConfirm) {
        actionContext.close();
      }
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = async () => {
    if (cancelLoading || confirmLoading || cancelLoadingProp) {
      return;
    }

    try {
      setCancelLoading(true);
      if (onCancel) {
        await onCancel(actionContext);
      }
      if (closeOnCancel) {
        actionContext.close();
      }
    } finally {
      setCancelLoading(false);
    }
  };

  const hasBodyContent = icon || title || description;
  const body = useMemo(() => {
    if (content) {
      return content;
    }
    if (!hasBodyContent) {
      return null;
    }

    return (
      <div className="flex gap-4">
        {icon && <div className="mt-1 text-livemenu">{icon}</div>}
        <div className="space-y-2">
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
          )}
        </div>
      </div>
    );
  }, [content, description, hasBodyContent, icon, title]);

  return (
    <div className="px-6 pb-6 pt-4">
      {body}
      {children && <div className={hasBodyContent ? 'mt-4' : ''}>{children}</div>}
      <div className="mt-6 flex justify-end gap-3">
        {!hideCancelButton && (
          <Button
            variant={cancelVariantProp ?? 'secondary'}
            onClick={handleCancel}
            loading={cancelLoadingProp ?? cancelLoading}
            disabled={cancelDisabled}
            {...restCancelButtonProps}
          >
            {cancelLabel}
          </Button>
        )}
        <Button
          variant={confirmVariant}
          onClick={handleConfirm}
          loading={confirmLoadingProp ?? confirmLoading}
          disabled={confirmDisabled}
          {...restConfirmButtonProps}
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
};

/**
 * Utility to build the context object passed to dialog action handlers.
 */
export const createDialogActionContext = (
  onClose: () => void,
  modalId: string
): DialogActionContext => ({
  close: onClose,
  modalId,
});


