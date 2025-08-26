class OpenRouterManager {
  apiKeys: string[];
  currentKeyIndex: number;
  keyStatuses: Map<
    string,
    { lastUsed: number; isRateLimited: boolean; rateLimitExpiry: number | null }
  >;

  constructor(apiKeys: string[]) {
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
      ])
    );
  }

  getCurrentKey() {
    return this.apiKeys[this.currentKeyIndex];
  }

  rotateToNextKey() {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
  }

  resetKeyStatus(key: string) {
    const status = this.keyStatuses.get(key);
    if (!status) return;
    status.isRateLimited = false;
    status.rateLimitExpiry = null;
  }

  markKeyAsRateLimited(key: string, retryAfterMs: number = 60000) {
    const status = this.keyStatuses.get(key);
    if (!status) return;
    status.isRateLimited = true;
    status.rateLimitExpiry = Date.now() + retryAfterMs;
    this.rotateToNextKey();
  }

  getAvailableKey() {
    const now = Date.now();

    // Reset keys that expired
    this.keyStatuses.forEach((status, key) => {
      if (status.isRateLimited && status.rateLimitExpiry! <= now) {
        this.resetKeyStatus(key);
      }
    });

    for (let attempt = 0; attempt < this.apiKeys.length; attempt++) {
      const currentKey = this.getCurrentKey();
      const status = this.keyStatuses.get(currentKey);

      if (!status?.isRateLimited) {
        return currentKey;
      }

      this.rotateToNextKey();
    }

    return null;
  }

  /**
   * Wrapper to make a request with rate-limit handling
   */
  async fetchWithKey(url: string, options: RequestInit = {}) {
    for (let attempt = 0; attempt < this.apiKeys.length; attempt++) {
      const key = this.getAvailableKey();
      if (!key) throw new Error("No available API keys");

      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${key}`,
          },
        });

        if (response.status === 429) {
          // Parse Retry-After header if present
          const retryAfter =
            (response.headers.get("retry-after") &&
              parseInt(response.headers.get("retry-after"), 10) * 1000) ||
            60000;

          this.markKeyAsRateLimited(key, retryAfter);
          continue; // Try next key
        }

        return response;
      } catch (err) {
        console.error(`Request failed with key ${key}:`, err);
        this.rotateToNextKey();
      }
    }

    throw new Error("All API keys are rate-limited or failed");
  }
}

const openRouterKeys = new OpenRouterManager(
  process.env.OPENROUTER_KEYS!.split(",")
);

export default openRouterKeys;
