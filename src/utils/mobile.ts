/**
 * Mobile-specific utilities and optimizations
 */

// Detect if user is on a mobile device
export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Detect if user is on iOS
export const isIOSDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Check if device supports touch
export const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

// Get optimal image size based on device
export const getOptimalImageSize = (baseSize: number): number => {
  if (typeof window === "undefined") return baseSize;

  const devicePixelRatio = window.devicePixelRatio || 1;
  const isMobile = isMobileDevice();

  // Use smaller images on mobile to save bandwidth
  if (isMobile) {
    return Math.min(baseSize * devicePixelRatio, baseSize * 2);
  }

  return baseSize * devicePixelRatio;
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Preload audio on user interaction (required for iOS)
export const enableAudioContext = async (): Promise<void> => {
  if (typeof window === "undefined") return;

  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      const audioContext = new AudioContext();
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
    }
  } catch (error) {
    console.warn("Could not enable audio context:", error);
  }
};

// Check if reduced motion is preferred
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Get safe area insets for devices with notches
export const getSafeAreaInsets = () => {
  if (typeof window === "undefined")
    return { top: 0, bottom: 0, left: 0, right: 0 };

  const style = getComputedStyle(document.documentElement);

  return {
    top: parseInt(style.getPropertyValue("env(safe-area-inset-top)") || "0"),
    bottom: parseInt(
      style.getPropertyValue("env(safe-area-inset-bottom)") || "0"
    ),
    left: parseInt(style.getPropertyValue("env(safe-area-inset-left)") || "0"),
    right: parseInt(
      style.getPropertyValue("env(safe-area-inset-right)") || "0"
    ),
  };
};
