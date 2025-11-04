// LibTL Ad Integration
class LibTLManager {
    constructor() {
        this.adCounter = 0;
        this.init();
    }

    init() {
        // LibTL sudah auto-load via script tag
        console.log('LibTL ads initialized');
        
        // Tunggu sampai LibTL siap
        if (typeof show_10138150 !== 'undefined') {
            this.showBannerAd();
        }
    }

    // Show banner ad
    showBannerAd() {
        try {
            // LibTL auto menampilkan iklan di element dengan id yang sesuai
            console.log('LibTL Banner ad displayed');
        } catch (error) {
            console.log('Banner ad error:', error);
        }
    }

    // Show interstitial ad
    showInterstitialAd() {
        this.adCounter++;
        
        // Show interstitial every 2 games
        if (this.adCounter % 2 === 0) {
            try {
                // Untuk interstitial, bisa refresh banner atau gunakan method khusus
                // LibTL biasanya auto handle berdasarkan traffic
                console.log('LibTL Interstitial triggered');
            } catch (error) {
                console.log('Interstitial ad error:', error);
            }
        }
    }

    // Show reward ad
    showRewardAd() {
        try {
            // Untuk fitur reward nanti
            console.log('LibTL Reward ad displayed');
        } catch (error) {
            console.log('Reward ad error:', error);
        }
    }
}

// Initialize LibTL manager
const adManager = new LibTLManager();

// Export functions
function showBannerAd() {
    adManager.showBannerAd();
}

function showInterstitialAd() {
    adManager.showInterstitialAd();
}

function showRewardAd() {
    adManager.showRewardAd();
}
