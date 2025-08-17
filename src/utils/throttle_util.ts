// I put this function in a separate file because it can be used across the project.
// This function receives a callback as an argument. Initially, the callback function will run immediately, then it will set the
// shouldWait flag to true. After the delay is over, if there are no waiting args, it will be set to false again.
// If there are waiting args, we execute them and wait for the delay period again.
// The waiting args come from a call when shouldWait is true, and are always overridden by the last call,
// because shouldWait and waitingArgs are created once when we declare the function later in the controller, and used
// as a closure to store and share these two variables.


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