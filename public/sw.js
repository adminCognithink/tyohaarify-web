const CACHE_NAME = 'tyohaarify-v1';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/create',
  '/templates',
  '/manifest.json',
  '/images/logos/ios/192.png',
  '/images/logos/ios/512.png',
  // Add core CSS and JS files
  '/_next/static/css/app/layout.css',
  '/_next/static/chunks/webpack.js',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle API requests differently
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleAPIRequest(request));
    return;
  }

  // Handle image requests
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  // Handle other requests (CSS, JS, etc.)
  event.respondWith(handleStaticRequest(request));
});

// Handle API requests - network first, then cache
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: API request failed, trying cache');
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response for failed API calls
    return new Response(
      JSON.stringify({ 
        error: 'offline', 
        message: 'This feature requires an internet connection' 
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle image requests - cache first, then network
async function handleImageRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Image request failed');
    
    // Return placeholder image for failed requests
    return new Response(
      '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".35em" fill="#6b7280">Image unavailable offline</text></svg>',
      {
        headers: { 'Content-Type': 'image/svg+xml' }
      }
    );
  }
}

// Handle navigation requests - cache first with network fallback
async function handleNavigationRequest(request) {
  try {
    // Try network first for navigation requests
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Service Worker: Navigation request failed, trying cache');
  }

  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Fallback to offline page
  const offlineResponse = await caches.match('/');
  if (offlineResponse) {
    return offlineResponse;
  }

  // Last resort - basic offline response
  return new Response(
    `<!DOCTYPE html>
    <html>
    <head>
      <title>Offline - Tyohaarify</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: system-ui, sans-serif; text-align: center; padding: 2rem; }
        .offline-content { max-width: 400px; margin: 0 auto; }
        .icon { font-size: 4rem; margin-bottom: 1rem; }
        h1 { color: #374151; margin-bottom: 1rem; }
        p { color: #6b7280; margin-bottom: 2rem; }
        .retry-btn { 
          background: #3b82f6; color: white; border: none; 
          padding: 0.75rem 1.5rem; border-radius: 0.5rem; 
          cursor: pointer; font-size: 1rem;
        }
        .retry-btn:hover { background: #2563eb; }
      </style>
    </head>
    <body>
      <div class="offline-content">
        <div class="icon">📱</div>
        <h1>You're Offline</h1>
        <p>It looks like you're not connected to the internet. Some features may be limited.</p>
        <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
      </div>
    </body>
    </html>`,
    {
      headers: { 'Content-Type': 'text/html' }
    }
  );
}

// Handle static requests - cache first, then network
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Static request failed');
    
    // For CSS/JS failures, return empty response to prevent breaking
    if (request.destination === 'style') {
      return new Response('/* Offline */', { 
        headers: { 'Content-Type': 'text/css' } 
      });
    }
    
    if (request.destination === 'script') {
      return new Response('// Offline', { 
        headers: { 'Content-Type': 'application/javascript' } 
      });
    }
    
    throw error;
  }
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'card-creation') {
    event.waitUntil(syncCardCreations());
  }
});

async function syncCardCreations() {
  try {
    // Get pending card creations from IndexedDB
    const pendingCards = await getPendingCards();
    
    for (const card of pendingCards) {
      try {
        const response = await fetch('/api/create-card', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(card.data)
        });
        
        if (response.ok) {
          await removePendingCard(card.id);
          console.log('Service Worker: Synced card creation');
        }
      } catch (error) {
        console.error('Service Worker: Failed to sync card:', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: 'Check out new festival templates!',
    icon: '/images/logos/ios/192.png',
    badge: '/images/logos/ios/72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Templates',
        icon: '/images/logos/ios/48.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/logos/ios/48.png'
      }
    ]
  };

  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.data = { ...options.data, ...data };
  }

  event.waitUntil(
    self.registration.showNotification('Tyohaarify', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/templates')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Utility functions for IndexedDB operations
async function getPendingCards() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('tyohaarify-offline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['pending-cards'], 'readonly');
      const store = transaction.objectStore('pending-cards');
      const getAll = store.getAll();
      
      getAll.onsuccess = () => resolve(getAll.result || []);
      getAll.onerror = () => reject(getAll.error);
    };
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('pending-cards')) {
        db.createObjectStore('pending-cards', { keyPath: 'id' });
      }
    };
  });
}

async function removePendingCard(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('tyohaarify-offline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['pending-cards'], 'readwrite');
      const store = transaction.objectStore('pending-cards');
      const deleteRequest = store.delete(id);
      
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    };
  });
}