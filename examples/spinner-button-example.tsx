import React, { useState } from 'react';
import { LiveMenuButton, LiveMenuSpinner } from '../src';

/**
 * Example demonstrating the LiveMenuSpinner component and Button loading state
 */
export const SpinnerButtonExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Simulate async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Spinner Component</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span>Small:</span>
            <LiveMenuSpinner size="sm" />
          </div>
          <div className="flex items-center gap-4">
            <span>Medium:</span>
            <LiveMenuSpinner size="md" />
          </div>
          <div className="flex items-center gap-4">
            <span>Large:</span>
            <LiveMenuSpinner size="lg" />
          </div>
          <div className="flex items-center gap-4 bg-primary p-4 rounded">
            <span className="text-white">Custom color (white):</span>
            <LiveMenuSpinner color="border-white" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Button Loading State</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <LiveMenuButton 
              variant="primary" 
              loading={isLoading}
              onClick={handleClick}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </LiveMenuButton>
            <LiveMenuButton 
              variant="secondary" 
              loading={isLoading}
              onClick={handleClick}
            >
              Submit
            </LiveMenuButton>
            <LiveMenuButton 
              variant="outline" 
              loading={isLoading}
              onClick={handleClick}
            >
              Delete
            </LiveMenuButton>
          </div>
          
          <div className="flex items-center gap-4">
            <LiveMenuButton 
              variant="success" 
              size="sm"
              loading={isLoading}
            >
              Small Loading
            </LiveMenuButton>
            <LiveMenuButton 
              variant="danger" 
              size="md"
              loading={isLoading}
            >
              Medium Loading
            </LiveMenuButton>
            <LiveMenuButton 
              variant="warning" 
              size="lg"
              loading={isLoading}
            >
              Large Loading
            </LiveMenuButton>
          </div>

          <div>
            <LiveMenuButton 
              variant="primary" 
              fullWidth
              loading={isLoading}
            >
              Full Width Loading Button
            </LiveMenuButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpinnerButtonExample;

