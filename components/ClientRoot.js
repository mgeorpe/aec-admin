'use client';

import { Toaster } from 'react-hot-toast';

export default function ClientRoot({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#ffffff', // white background
            color: '#1c375b', // dark text
            border: '1px solid #ddd',
          },
          success: {
            iconTheme: {
              primary: '#4caf50',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f44336',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </>
  );
}
