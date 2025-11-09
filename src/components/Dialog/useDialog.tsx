import React, { useCallback } from 'react';
import { ModalOptions } from '../Modal/Modal';
import { useModal } from '../Modal/ModalProvider';
import {
  LiveMenuDialogContent,
  LiveMenuDialogContentProps,
  createDialogActionContext,
  DialogActionContext,
} from './Dialog';

type DialogContentInput = LiveMenuDialogContentProps;

interface DialogWrapperProps extends DialogContentInput {
  onClose: () => void;
  modalId: string;
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({ onClose, modalId, ...dialogProps }) => (
  <LiveMenuDialogContent
    {...dialogProps}
    actionContext={createDialogActionContext(onClose, modalId)}
  />
);

export interface ShowDialogOptions {
  dialog: DialogContentInput;
  modal?: Partial<ModalOptions>;
}

export type DialogResult = 'confirm' | 'cancel';

export interface ConfirmDialogOptions extends Omit<DialogContentInput, 'hideCancelButton'> {
  hideCancelButton?: boolean;
  modal?: Partial<ModalOptions>;
}

export interface AlertDialogOptions extends Omit<DialogContentInput, 'hideCancelButton'> {
  modal?: Partial<ModalOptions>;
}

/**
 * Hook that exposes dialog helpers built on top of the modal infrastructure.
 */
export const useDialog = () => {
  const { showModal } = useModal();

  const showDialog = useCallback(
    ({ dialog, modal }: ShowDialogOptions): string => {
      const mergedOptions: ModalOptions = {
        dismissable: false,
        showCloseButton: false,
        size: 'sm',
        backdrop: true,
        closeOnEscape: true,
        className: '',
        overlayClassName: '',
        zIndex: 50,
        ...(modal || {}),
      };

      return showModal(DialogWrapper, {
        ...mergedOptions,
        props: dialog,
      });
    },
    [showModal]
  );

  const confirm = useCallback(
    (options: ConfirmDialogOptions): Promise<DialogResult> =>
      new Promise<DialogResult>((resolve) => {
        const {
          modal: modalOptions,
          onConfirm,
          onCancel,
          hideCancelButton,
          ...rest
        } = options;

        const dialogProps: DialogContentInput = {
          ...rest,
          hideCancelButton: hideCancelButton ?? false,
        };

        dialogProps.onConfirm = async (context) => {
          if (onConfirm) {
            await onConfirm(context);
          }
          resolve('confirm');
        };

        dialogProps.onCancel = async (context) => {
          if (onCancel) {
            await onCancel(context);
          }
          resolve('cancel');
        };

        showDialog({ dialog: dialogProps, modal: modalOptions });
      }),
    [showDialog]
  );

  const alert = useCallback(
    (options: AlertDialogOptions): Promise<void> =>
      new Promise<void>((resolve) => {
        const { modal: modalOptions, onConfirm, ...rest } = options;

        const dialogProps: DialogContentInput = {
          ...rest,
          hideCancelButton: true,
        };

        dialogProps.onConfirm = async (context) => {
          if (onConfirm) {
            await onConfirm(context);
          }
          resolve();
        };

        showDialog({ dialog: dialogProps, modal: modalOptions });
      }),
    [showDialog]
  );

  return {
    showDialog,
    confirm,
    alert,
  };
};


