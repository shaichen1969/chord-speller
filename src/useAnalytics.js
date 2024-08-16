import { useEffect } from 'react';
import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';
import { useLocation } from 'react-router-dom';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, 'page_view', { page_path: location.pathname });
  }, [location]);

  const logCustomEvent = (eventName, eventParams = {}) => {
    logEvent(analytics, eventName, eventParams);
  };

  return { logCustomEvent };
};