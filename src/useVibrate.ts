import { useEffect } from 'react';

export type VibrationPattern = number | number[];

const isNavigator = typeof navigator !== 'undefined';
const noop = () => { };

const isVibrationApiSupported = isNavigator && 'vibrate' in navigator;

/**
 * @param enabled
 * @param pattern
 * @param loop
 * @description
 * Hook that allows to vibrate a device with certain vibration patterns based off of the
 * vibration api.
 * @example
 * const [vibrating, toggleVibrating] = useToggle(false);
  useVibrate(vibrating, [300, 100, 200, 100, 1000, 300], false);
  toggleVibrating()
 */
export async function useVibrate(
    enabled: boolean = true,
    pattern: VibrationPattern = [1000, 1000],
    loop: boolean = true
): Promise<void> {
    if (!isVibrationApiSupported) throw new Error("vibration api is not supported on this operating system")
    else useEffect(() => {
        let interval: number;

        if (enabled) {
            navigator.vibrate(pattern)
            if (loop) {
                const duration = pattern instanceof Array ? pattern.reduce((a, b) => a + b) : (pattern as number)

                interval = setInterval(() => {
                    navigator.vibrate(pattern)
                }, duration)
            }
        }

        return () => {
            if (enabled) {
                navigator.vibrate(0)
                if (loop) clearInterval(interval)
            }
        }
    }, [enabled]);
}