import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useModalHistory = (isOpen: boolean, onClose: () => void, modalPath: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Push a new history entry when modal opens
      window.history.pushState({ modal: true }, '', modalPath);
    }

    const handlePopState = (event: PopStateEvent) => {
      // Check if we're going back from a modal state
      if (event.state?.modal) {
        // Prevent default navigation
        event.preventDefault();
        // Close the modal
        onClose();
        // Replace the current history entry
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose, modalPath, navigate]);
}; 