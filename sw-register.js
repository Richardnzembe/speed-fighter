// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('Service Worker update found!');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New update available
              if (confirm('A new version of Speed Fighter is available. Reload to update?')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
      
    // Listen for controller change (update activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Controller changed, page will reload for update');
      window.location.reload();
    });
  });
  
  // Check if app is running in standalone mode
  window.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true) {
      console.log('Running in PWA standalone mode');
      
      // Add install prompt for iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isIOS && isSafari && !window.navigator.standalone) {
        // Show iOS install instructions
        setTimeout(() => {
          if (confirm('For best experience, install Speed Fighter to your home screen. Tap share button and select "Add to Home Screen".')) {
            // User acknowledged
          }
        }, 3000);
      }
    }
  });
}

// Install prompt for non-iOS devices
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show install button or notification
  setTimeout(() => {
    if (confirm('Install Speed Fighter for offline play and quick access?')) {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    }
  }, 5000);
});

// Detect online/offline status
window.addEventListener('online', () => {
  console.log('App is online');
  if (typeof showNotification === 'function') {
    showNotification('Back online!', 'You are now connected to the internet.');
  }
});

window.addEventListener('offline', () => {
  console.log('App is offline');
  if (typeof showNotification === 'function') {
    showNotification('Offline mode', 'Playing in offline mode. Some features may be limited.');
  }
});

// Helper function to show notifications
function showNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: 'icons/icon-192.png' });
  }
}

// Request notification permission on user interaction
document.addEventListener('DOMContentLoaded', () => {
  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };
  
  // Request permission when user interacts with game buttons
  document.addEventListener('click', requestNotificationPermission, { once: true });
});