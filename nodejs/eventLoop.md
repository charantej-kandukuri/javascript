# The Node.jsEvent Loop ([Source](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick))

## What is the Event Loop?
The event loop is what allow nodejs to perform non-blocking I/O operations -- despite the fact that single JavaScript thread is used by default -- by offloading the operations to the system kernal whenever possible.

Since most modern kernals are multi-threaded, they can handle multiple operations executing in the background. When one of these operation completes, kernal tells Node.js so that the appropriate callback may be added to the poll queue to eventually be executed.

## Event Loop Phases
Each phase has a FIFO queue of callbacks to execute. While each phase is special in its own way, generally when the event loop enters a given phase, it will perform any operations specific to that phase, then executes callbacks in that phase until the queue has been exhausted or the maximum number of callbacks has executed. When the queue has been exhausted or  callbacks limit reached, the event loop move to the next phase, and so on.

## Phases in detail
This phases executes callbacks for some system operations such as types of TCP errors. For example if a TCP socket receives `ECONNREFUSED` when attempting to connect, some *nix system wants to wait to report the error. This will be queued to execute in the **pending callbacks** phase.

## Poll
When the event loop enters the poll phase and there are no timers scheduled, one of two things will happen:

- If the poll queue is not empty, the event loop will iterate through the queue of callbacks, executing then synchronously until the queue has been exhausted or system-dependent hard limit is reached.
- If the poll queue is empty, one of two more things will happen:
    - If the scripts have been scheduled by setImmidiate(), the event loop will end the poll phase and continue to the check phase to execute those scheduled scripts.
    - If the scripts have not been scheduled the event loop will wait for callbacks to be added to the queue, then execute them immediately.

Once the poll queue is empty the event loop will check the timers *whose time thresholds have been reached.* If one of more timers are ready the event loop wrap back to the timers phase to execute those timers' callbacks.

## check
This phase allows the event loop to execute callbacks immediately after the **poll** phase has completed. If the **poll** phase become idle and scripts have been queued with `setImmediate()`, the event loop may continue to the check phase rather then waiting.

`setImmidate()` is actually a **special timer** that runs is a **separate phase in the event loop**. It uses a libuv API that that schedules callbacks to execute after the **poll** phase has completed.

## close callbacks
If a socket or handle closed abruptly(e.g. `socket.distroy() `), the `'close'` event will be emitted in this phase. Otherwise it will be emitted via `process.nextTick()`.

## timers
A timer specifies a **thereshold** *after which a provided callback may be executed* rather than the **exact** time a person wants it to be executed.

Timers callbacks will run as early as they can be scheduled after the specified amount of time has passed.

Operating System scheduling or the running of other callbacks may delay them.
```
Technically, the poll phase controls when timers are executed.
```

## Event Loop Propogation

I/O poll phase &rarr; check phase

In you call `setTimeout(fn, 0)` and `setImmdiate(fn)` in the `main global context`, their execution order in `unpredictable` because it depends on the exact millisecond performance of the machine.

However, **inside a I/O callback (like reading a file), `setImmidiate` is guarenteed to execute first.** This is because the event loop moves from the I/O polling phase directly into  the **Check phase**.

```javaScript
const fs = require('node:fs');


fs.readFile(__filename, () => {
    setTimeout(() => console.log('Timeout'), 0);
    setImmidiate(() => console.log('Immidiate'));   
})

// Output:
// Immidate
// Timeout
```
