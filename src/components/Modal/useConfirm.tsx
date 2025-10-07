import { useModal } from './ModalProvider';
import { LiveMenuConfirm, ConfirmOptions } from './Confirm';
import { ModalOptions } from './Modal';

interface UseConfirmReturn {
  /**
   * Show a confirmation dialog
   * @param options - Confirmation options
   * @returns Modal ID
   */
  confirm: (options: ConfirmOptions & { modalOptions?: Omit<ModalOptions, 'props'> }) => string;
}

/**
 * Hook to easily trigger confirmation dialogs
 * 
 * @returns Object with confirm function
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { confirm } = useConfirm();
 *   
 *   const handleDelete = () => {
 *     confirm({
 *       title: 'Delete Item',
 *       message: 'Are you sure you want to delete this item?',
 *       variant: 'danger',
 *       confirmText: 'Delete',
 *       cancelText: 'Cancel',
 *       onConfirm: async () => {
 *         await deleteItem();
 *       }
 *     });
 *   };
 *   
 *   return <button onClick={handleDelete}>Delete</button>;
 * }
 * ```
 */
export const useConfirm = (): UseConfirmReturn => {
  const { showModal } = useModal();

  const confirm = (options: ConfirmOptions & { modalOptions?: Omit<ModalOptions, 'props'> }): string => {
    const { modalOptions, ...confirmOptions } = options;

    return showModal(LiveMenuConfirm, {
      size: 'sm',
      dismissable: true,
      ...modalOptions,
      props: confirmOptions,
    });
  };

  return { confirm };
};

