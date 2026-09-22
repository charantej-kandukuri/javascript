# 🧠 Why Node.js Apps Leak (Common Patterns)

1. Global variable/module level cache.
2. Clousures capture large objects.
3. Event listners never removed 🎧.
4. Timers/intervals never cleared ⏰.
5. Accidental global variables.
6. Unbounded arrays (the "logging" trap).


# 🔍 How to Identify a Memory Leak (Step by Step)

### Step 1: Confirm the symptom
Add this to your app
```JavaScript
setInterval(() => {
    const m = process.memoryUsage();

    console.log(
        `[mem] rss=${(m.rss /1e6).toFixed(1)}MB ` +
        `heapUsed=${(m.headUsed / 1e6).toFixed(1)}MB ` +
        `heapTotal=${(m.heapTotal / 1e6).toFixed(1)}MB  ` +
        `external=${(m.external / 1e6).toFixed(1)}MB`
    )
}, 30_000)

```

**Healthy pattern:**

```text
heapUsed=45MB → 48MB → 42MB → 50MB → 44MB  (oscillating, GC works)
```

**Leaky pattern:**

```text
heapUsed=45MB → 60MB → 78MB → 95MB → 115MB  (steady climb, GC can't keep up)
```
If heapUsed climbs **steadily for 30+ minutes** under constant load → leak confirmed. 🚨

# 🚨 The "Heap Out of Memory" Crash

When the heap exceeds its limit (default ~1.5 GB on 64-bit), Node crashes:

```bash
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```