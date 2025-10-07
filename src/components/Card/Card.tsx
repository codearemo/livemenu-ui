import React from 'react';

export interface LiveMenuCardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Card title displayed in the header
   */
  title?: string | React.ReactNode;
  /**
   * Card subtitle displayed below the title
   */
  subtitle?: string | React.ReactNode;
  /**
   * Footer content with gray background
   */
  footer?: React.ReactNode;
  /**
   * Whether the card should have hover effects
   */
  hoverable?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuCard - A flexible card component with optional header, footer, and hover effects
 * 
 * @example
 * ```tsx
 * <LiveMenuCard 
 *   title="Card Title" 
 *   subtitle="Card subtitle"
 *   hoverable
 *   footer={<button>Action</button>}
 * >
 *   Card content goes here
 * </LiveMenuCard>
 * ```
 */
export const LiveMenuCard: React.FC<LiveMenuCardProps> = ({
  children,
  title,
  subtitle,
  footer,
  hoverable = false,
  className = '',
}) => {
  // Base card class
  const baseClass = 'livemenu-card';
  
  // Hoverable effect
  const hoverClass = hoverable ? 'cursor-pointer hover:shadow-xl' : '';
  
  // Combine all classes
  const cardClasses = [
    baseClass,
    hoverClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  
  // Check if header should be rendered
  const hasHeader = title || subtitle;
  
  return (
    <div className={cardClasses}>
      {/* Conditional Header Section */}
      {hasHeader && (
        <div className="livemenu-card-header">
          {title && (
            <div className="text-lg font-semibold text-gray-900">
              {title}
            </div>
          )}
          {subtitle && (
            <div className="text-sm text-gray-600 mt-1">
              {subtitle}
            </div>
          )}
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="livemenu-card-body">
        {children}
      </div>
      
      {/* Optional Footer Section */}
      {footer && (
        <div className="livemenu-card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

// Legacy export for backwards compatibility
export const Card = LiveMenuCard;
export type CardProps = LiveMenuCardProps;

