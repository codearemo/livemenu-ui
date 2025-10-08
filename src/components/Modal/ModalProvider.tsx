import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { LiveMenuModal, ModalOptions } from './Modal';

export interface ModalInstance {
  id: string;
  component: React.ComponentType<any> | React.ReactNode;
  props?: Record<string, any>;
  options: ModalOptions;
}

interface ModalContextValue {
  showModal: (
    component: React.ComponentType<any> | React.ReactNode,
    options?: ModalOptions & { props?: Record<string, any> }
  ) => string;
  hideModal: (id: string) => void;
  hideAllModals: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export interface LiveMenuModalProviderProps {
  children: React.ReactNode;
  /**
   * Base z-index for modals. Each stacked modal will increment from this value.
   * @default 1000
   */
  baseZIndex?: number;
}

export const LiveMenuModalProvider: React.FC<LiveMenuModalProviderProps> = ({
  children,
  baseZIndex = 1000,
}) => {
  const [modals, setModals] = useState<ModalInstance[]>([]);
  const modalIdCounter = useRef(0);

  const showModal = useCallback(
    (
      component: React.ComponentType<any> | React.ReactNode,
      options?: ModalOptions & { props?: Record<string, any> }
    ): string => {
      const id = `modal-${++modalIdCounter.current}`;
      const { props, ...modalOptions } = options || {};

      const newModal: ModalInstance = {
        id,
        component,
        props: props || {},
        options: {
          dismissable: true,
          showCloseButton: true,
          size: 'md',
          backdrop: true,
          closeOnEscape: true,
          ...modalOptions,
        },
      };

      setModals((prev) => [...prev, newModal]);
      return id;
    },
    []
  );

  const hideModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  const hideAllModals = useCallback(() => {
    setModals([]);
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, hideModal, hideAllModals }}>
      {children}
      {modals.map((modal, index) => {
        const zIndex = baseZIndex + index;
        
        // Check if component is a React element or a component type
        const isReactElement = React.isValidElement(modal.component);
        
        let content: React.ReactNode;
        if (isReactElement) {
          // If it's already a React element, render it directly
          content = modal.component as React.ReactNode;
        } else if (typeof modal.component === 'function') {
          // If it's a component function/class, instantiate it with props
          const ModalComponent = modal.component as React.ComponentType<any>;
          content = (
            <ModalComponent
              {...modal.props}
              onClose={() => hideModal(modal.id)}
              modalId={modal.id}
            />
          );
        } else {
          // For other React nodes (strings, numbers, etc.)
          content = modal.component as React.ReactNode;
        }

        return (
          <LiveMenuModal
            key={modal.id}
            isOpen={true}
            onClose={() => hideModal(modal.id)}
            {...modal.options}
            zIndex={zIndex}
          >
            {content}
          </LiveMenuModal>
        );
      })}
    </ModalContext.Provider>
  );
};

// Legacy alias
export const ModalProvider = LiveMenuModalProvider;

/**
 * Hook to access modal functions
 * @returns {ModalContextValue} Modal control functions
 * @example
 * ```tsx
 * const { showModal, hideModal } = useModal();
 * 
 * const handleOpenModal = () => {
 *   const modalId = showModal(MyModalContent, {
 *     size: 'lg',
 *     dismissable: true,
 *     props: { title: 'Hello' }
 *   });
 * };
 * ```
 */
export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a LiveMenuModalProvider');
  }
  return context;
};

// Standalone modal manager for use outside of React components
let standaloneModalContext: ModalContextValue | null = null;

export const setModalContext = (context: ModalContextValue) => {
  standaloneModalContext = context;
};

/**
 * Show a modal programmatically without using hooks
 * @param component - The component or React element to render in the modal
 * @param options - Modal options and props
 * @returns {string} Modal ID for later reference
 * @example
 * ```tsx
 * import { showModal } from 'livemenu-ui';
 * 
 * // Using a component
 * showModal(ConfirmDialog, {
 *   size: 'sm',
 *   dismissable: false,
 *   props: {
 *     title: 'Confirm Action',
 *     message: 'Are you sure?'
 *   }
 * });
 * 
 * // Using a React element
 * showModal(<div>Hello World</div>, {
 *   size: 'md'
 * });
 * ```
 */
export const showModal = (
  component: React.ComponentType<any> | React.ReactNode,
  options?: ModalOptions & { props?: Record<string, any> }
): string => {
  if (!standaloneModalContext) {
    throw new Error(
      'Modal system not initialized. Make sure LiveMenuModalProvider is mounted in your app.'
    );
  }
  return standaloneModalContext.showModal(component, options);
};

/**
 * Hide a specific modal by ID
 * @param id - Modal ID returned from showModal
 */
export const hideModal = (id: string): void => {
  if (!standaloneModalContext) {
    throw new Error(
      'Modal system not initialized. Make sure LiveMenuModalProvider is mounted in your app.'
    );
  }
  standaloneModalContext.hideModal(id);
};

/**
 * Hide all open modals
 */
export const hideAllModals = (): void => {
  if (!standaloneModalContext) {
    throw new Error(
      'Modal system not initialized. Make sure LiveMenuModalProvider is mounted in your app.'
    );
  }
  standaloneModalContext.hideAllModals();
};

// Internal component to connect standalone functions to context
export const ModalContextConnector: React.FC = () => {
  const context = useModal();
  React.useEffect(() => {
    setModalContext(context);
  }, [context]);
  return null;
};

