class GeminiKeyManager {
  apiKeys: string[];
  currentKeyIndex: number;
  keyStatuses: Map<
    string,
    { lastUsed: number; isRateLimited: boolean; rateLimitExpiry: number | null }
  >;

  constructor(apiKeys) {
    this.apiKeys = apiKeys;
    this.currentKeyIndex = 0;
    this.keyStatuses = new Map(
      apiKeys.map((key) => [
        key,
        {
          lastUsed: 0,
          isRateLimited: false,
          rateLimitExpiry: null,
        },
      ]),
    );
  }

  getCurrentKey() {
    return this.apiKeys[this.currentKeyIndex];
  }

  markKeyAsRateLimited(key) {
    const status = this.keyStatuses.get(key);
    status.isRateLimited = true;
    status.rateLimitExpiry = Date.now() + 60 * 1000; // Assume 1 minute cooldown
    this.rotateToNextKey();
  }

  rotateToNextKey() {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
  }

  resetKeyStatus(key) {
    const status = this.keyStatuses.get(key);
    status.isRateLimited = false;
    status.rateLimitExpiry = null;
  }

  getAvailableKey() {
    const now = Date.now();

    // Check if any rate-limited keys have expired
    this.keyStatuses.forEach((status, key) => {
      if (status.isRateLimited && status.rateLimitExpiry <= now) {
        this.resetKeyStatus(key);
      }
    });

    // Try all keys until we find an available one
    for (let attempt = 0; attempt < this.apiKeys.length; attempt++) {
      const currentKey = this.getCurrentKey();
      const status = this.keyStatuses.get(currentKey);

      if (!status.isRateLimited) {
        return currentKey;
      }

      this.rotateToNextKey();
    }

    // If all keys are rate-limited, return null
    return null;
  }
}

// Initialize the GeminiKeyManager with API keys
const keyManager = new GeminiKeyManager([
  "AIzaSyDV7ZEdqPcoPZArkS4WMW7CEogvYQgkvtI",
  "AIzaSyCFSsx1wLrt_Ygvkgjy7JkZgr6jxV5Outo",
]);

export default keyManager;
