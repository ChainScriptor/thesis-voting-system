import React from 'react';

/**
 * ProfileLayout wraps profile pages with consistent padding and background.
 */
const ProfileLayout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      {children}
    </div>
  );
};

export default ProfileLayout;
