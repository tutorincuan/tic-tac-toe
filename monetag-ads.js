// Monetag Ad Integration
class MonetagManager {
    constructor() {
        this.adCounter = 0;
        this.init();
    }

    init() {
        // Monetag sudah di-load via script tag di HTML
        console.log('Monetag ads initialized');
    }

    // Show banner ad
    showBannerAd() {
        try {
            monetag.cmd.push(function() {
                monetag.displayAd("banner-ad");
            });
            console.log('Banner ad displayed');
        } catch (error) {
            console.log('Banner ad error:', error);
        }
    }

    // Show interstitial ad
    showInterstitialAd() {
        this.adCounter++;
        
        // Show interstitial every 2 games or on special events
        if (this.adCounter % 2 === 0) {
            try {
                monetag.cmd.push(function() {
                    monetag.displayAd("interstitial-ad");
                });
                console.log('Interstitial ad displayed');
            } catch (error) {
                console.log('Interstitial ad error:', error);
            }
        }
    }

    // Show reward ad (for future features)
    showRewardAd() {
        try {
            monetag.cmd.push(function() {
                monetag.displayAd("reward-ad");
            });
            console.log('Reward ad displayed');
        } catch (error) {
            console.log('Reward ad error:', error);
        }
    }
}

// Initialize Monetag manager
const adManager = new MonetagManager();

// Export functions for use in main script
function showBannerAd() {
    adManager.showBannerAd();
}

function showInterstitialAd() {
    adManager.showInterstitialAd();
}

function showRewardAd() {
    adManager.showRewardAd();
}
