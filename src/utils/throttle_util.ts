export function throttle<T extends (...args: any[]) => void>(cb: T, delay: number) {
    let shouldWait = false;
    let waitingArgs: Parameters<T> | null;

    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false;
        } else {
            cb(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
        };

    return (...args: Parameters<T>) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }
        cb(...args);
        shouldWait = true;
        setTimeout(timeoutFunc, delay);
        };
    }