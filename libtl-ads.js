// LibTL Ad Integration - Focus on Banner & Interstitial Only
class LibTLManager {
    constructor() {
        this.adCounter = 0;
        this.init();
    }

    init() {
        console.log('LibTL ads initialized');
        
        // Auto show banner ads
        this.showBannerAd();
        
        // Configure auto interstitial
        this.setupAutoInterstitial();
    }

    // Banner ads - Let LibTL handle automatically
    showBannerAd() {
        try {
            // LibTL will automatically display banners based on their algorithm
            console.log('LibTL Banner ads enabled');
        } catch (error) {
            console.log('Banner ad error:', error);
        }
    }

    // Setup auto interstitial without rewards
    setupAutoInterstitial() {
        try {
            show_10138150({
                type: 'inApp',
                inAppSettings: {
                    frequency: 3,        // 3 ads max
                    capping: 0.2,        // dalam 12 menit
                    interval: 45,        // interval 45 detik
                    timeout: 8,          // delay 8 detik
                    everyPage: false     // tidak reset di setiap page
                }
            });
            console.log('Auto interstitial configured');
        } catch (error) {
            console.log('Auto interstitial setup error:', error);
        }
    }

    // Manual trigger interstitial (for game events)
    showInterstitialAd() {
        this.adCounter++;
        
        // Show interstitial every 2-3 game events
        if (this.adCounter % 2 === 0) {
            try {
                // Simple interstitial call without rewards
                show_10138150();
                console.log('Manual interstitial triggered');
            } catch (error) {
                console.log('Interstitial ad error:', error);
            }
        }
    }

    // Remove reward-related functions completely
}

// Initialize LibTL manager
const adManager = new LibTLManager();

// Export functions
window.showBannerAd = function() {
    adManager.showBannerAd();
};

window.showInterstitialAd = function() {
    adManager.showInterstitialAd();
};

// Remove showRewardAd function completely
