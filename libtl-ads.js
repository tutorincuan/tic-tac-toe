// LibTL Ad Integration
class LibTLManager {
    constructor() {
        this.adCounter = 0;
        this.interstitialShown = false;
        this.init();
    }

    init() {
        console.log('LibTL ads initialized');
        
        // Auto show interstitial dengan settings
        this.showAutoInterstitial();
    }

    // Banner ads (auto show by LibTL)
    showBannerAd() {
        try {
            // LibTL automatically handles banner display
            console.log('LibTL Banner ad should be auto-displayed');
        } catch (error) {
            console.log('Banner ad error:', error);
        }
    }

    // Manual Interstitial Ad
    showInterstitialAd() {
        this.adCounter++;
        
        // Show interstitial every 2 games
        if (this.adCounter % 2 === 0 && !this.interstitialShown) {
            try {
                show_10138150().then(() => {
                    console.log('Rewarded interstitial shown and completed');
                    this.interstitialShown = true;
                    
                    // Give reward to player
                    this.giveReward();
                }).catch(error => {
                    console.log('Interstitial ad failed:', error);
                });
            } catch (error) {
                console.log('Interstitial ad error:', error);
            }
        }
    }

    // Auto Interstitial dengan settings
    showAutoInterstitial() {
        try {
            show_10138150({
                type: 'inApp',
                inAppSettings: {
                    frequency: 2,        // 2 ads
                    capping: 0.1,        // dalam 6 menit
                    interval: 30,        // interval 30 detik
                    timeout: 5,          // delay 5 detik
                    everyPage: false     // tidak reset di setiap page
                }
            });
            console.log('Auto interstitial configured');
        } catch (error) {
            console.log('Auto interstitial error:', error);
        }
    }

    // Reward Ad (manual trigger)
    showRewardAd() {
        try {
            show_10138150('pop').then(() => {
                console.log('Reward ad completed');
                this.giveBigReward();
            }).catch(error => {
                console.log('Reward ad failed:', error);
            });
        } catch (error) {
            console.log('Reward ad error:', error);
        }
    }

    // Small reward untuk interstitial
    giveReward() {
        // Tambah score atau beri bonus
        const bonus = 10;
        console.log(`Player received ${bonus} bonus points!`);
        
        // Bisa update game state di sini
        if (window.gameManager) {
            window.gameManager.addBonusPoints(bonus);
        }
        
        alert(`🎉 Bonus! You received ${bonus} points for watching the ad!`);
    }

    // Big reward untuk reward ads
    giveBigReward() {
        const bigBonus = 25;
        console.log(`Player received big reward: ${bigBonus} points!`);
        
        if (window.gameManager) {
            window.gameManager.addBonusPoints(bigBonus);
        }
        
        alert(`🏆 Amazing! You received ${bigBonus} points!`);
    }
}

// Initialize LibTL manager
const adManager = new LibTLManager();

// Export functions untuk global access
window.showBannerAd = function() {
    adManager.showBannerAd();
};

window.showInterstitialAd = function() {
    adManager.showInterstitialAd();
};

window.showRewardAd = function() {
    adManager.showRewardAd();
};
