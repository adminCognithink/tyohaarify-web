interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
  timestamp?: number;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private events: AnalyticsEvent[] = [];

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  track(event: AnalyticsEvent) {
    // Store event
    this.events.push({
      ...event,
      timestamp: Date.now()
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
    }

    // In production, you'd send to your analytics service
    this.sendToAnalytics(event);
  }

  private async sendToAnalytics(event: AnalyticsEvent) {
    try {
      // Replace with your analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.warn('Failed to send analytics event:', error);
    }
  }

  // Predefined tracking methods
  trackCardCreation(festival: string, template: string) {
    this.track({
      event: 'card_created',
      category: 'engagement',
      label: festival,
      properties: {
        template,
        timestamp: new Date().toISOString()
      }
    });
  }

  trackDownload(format: string, festival: string) {
    this.track({
      event: 'card_downloaded',
      category: 'conversion',
      label: format,
      properties: {
        festival,
        timestamp: new Date().toISOString()
      }
    });
  }

  trackShare(platform: string) {
    this.track({
      event: 'card_shared',
      category: 'engagement',
      label: platform,
      properties: {
        timestamp: new Date().toISOString()
      }
    });
  }

  trackPageView(page: string) {
    this.track({
      event: 'page_view',
      category: 'navigation',
      label: page,
      properties: {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }
    });
  }

  trackError(error: string, context: string) {
    this.track({
      event: 'error',
      category: 'technical',
      label: error,
      properties: {
        context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }
    });
  }

  getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  clearEvents(): void {
    this.events = [];
  }
}

// React hook for analytics
import { useEffect } from 'react';

export function useAnalytics() {
  const analytics = AnalyticsService.getInstance();

  useEffect(() => {
    // Track page view on mount
    analytics.trackPageView(window.location.pathname);
  }, [analytics]);

  return {
    track: analytics.track.bind(analytics),
    trackCardCreation: analytics.trackCardCreation.bind(analytics),
    trackDownload: analytics.trackDownload.bind(analytics),
    trackShare: analytics.trackShare.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
  };
}

export default AnalyticsService;