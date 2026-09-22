# Debugging (Source: Deepseak)

## Async operations handled by OS Kernal
- I/O (HTTP requests, TCP Sockets, DB Connections over network)
- Timers
- DNS lookups
- File watching

## Async operations handled by libuv thread pool (4 threads by default)

- file system I/O (fs.readfile, fs.writefile)
- DNS lookups
- Crypto operations
- Zlib compression

**How it works:**
- Main thread says: "Hey thread pool, please read this file."
- A thread from the pool does the blocking work.
- When done, it notifies the event loop.
- Event loop runs your callback.

⚠️ **Default pool size is 4.** You can change it via `UV_THREADPOOL_SIZE=8 node server.js`. If all 4 threads are busy, the 5th request queues up — even though the main thread is free.

The only way to move the CPU work off the main thread:
1. `worker threads` (mordern, recommended)
2. `child process`
3. **cluster mode**
4. **Move to a Job queue** (BullMQ, RabbitMQ, etc.)


The main thread runs your JS code. Async operations either get delegated to the kernel or the thread pool. 

## CPU Profiling
`Recording the functions` your code spends the `most time` in, so you can find the 'hot spots' that are slowing you down.

### How to do it in Node.js

**Method 1: Built-in** `--prof`

```bash
node --prof server.js
# run load test
node --prof-process isolate-*.log > profile.txt
```

The output is a text file with function names sorted by time spent.


**Method 2:** `clinic flame` **(much friendlier)** 🎨

```bash
clinic flame -- node server.js
# run load test
# Ctrl+C → generates flamegraph.html
```

**Method 3: Chrome DevTools**

```bash
node --inspect server.js
```
Open `chrome://inspect` → click "inspect" → go to **Profiler** tab → record → run load → stop. You get a flame graph.

### Reading a flame graph 🔥
Width = time spent (wider = slower)

Height = call stack depth

Bottom = main function, top = leaf functions

The widest bars at the top are your hot spots

If you see a giant bar for `JSON.parse or bcrypt.hashSync` or your own `calculateTax()` → that's your bottleneck.


## Cluster mode
Remember
```
1 node process = 1 main thread = 1 CPU core used
```
But your server has probably **4, 8, or 16 cores** sitting idle! Cluster mode spawns **one Node Process per core**, all sharing same port.