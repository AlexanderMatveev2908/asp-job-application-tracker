## 📦 Observable Core

| Method           | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `subscribe()`    | Start observing values.                                          |
| `unsubscribe()`  | Stop and clean up.                                               |
| `pipe(...ops)`   | Chain operators.                                                 |
| `toPromise()`    | Convert observable → promise (deprecated; use `firstValueFrom`). |
| `asObservable()` | Hide subject mutability (use for encapsulation).                 |

---

## ⚙️ Observable Creation

| Function                        | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `of(...values)`                 | Emit static values.                             |
| `from(promise/iterable)`        | Convert promise/array/etc. to observable.       |
| `fromEvent(el, event)`          | Listen to DOM or Node events.                   |
| `fromEventPattern(add, remove)` | Custom event source.                            |
| `interval(ms)`                  | Emit incremental numbers every `ms`.            |
| `timer(due, period?)`           | Emit after `due`, then optionally periodically. |
| `range(start, count)`           | Emit range of numbers.                          |
| `defer(factory)`                | Lazily create observable on subscribe.          |
| `EMPTY`                         | Completes immediately, emits nothing.           |
| `NEVER`                         | Never emits or completes.                       |
| `throwError(err)`               | Immediately error observable.                   |
| `generate()`                    | Functional reactive sequence generator.         |

---

## 🔄 Transformation Operators

| Operator                                       | Description                                        |
| ---------------------------------------------- | -------------------------------------------------- |
| `map(fn)`                                      | Map each value.                                    |
| `mapTo(value)`                                 | Replace emission with constant.                    |
| `mergeMap(fn)`                                 | Flatten inner observables concurrently.            |
| `switchMap(fn)`                                | Cancel previous inner obs, switch to latest.       |
| `concatMap(fn)`                                | Queue inner obs sequentially.                      |
| `exhaustMap(fn)`                               | Ignore new source emissions until inner completes. |
| `expand(fn)`                                   | Recursively project each value.                    |
| `buffer(closing$)`                             | Collect values until closing$ emits.               |
| `bufferTime(ms)`                               | Collect values over time window.                   |
| `bufferCount(n)`                               | Collect n values, emit array.                      |
| `scan(acc, seed)`                              | Accumulate like reduce, emits each step.           |
| `pairwise()`                                   | Emit previous + current as tuple.                  |
| `pluck('a','b')`                               | Extract nested property.                           |
| `window(...)`, `windowTime()`, `windowCount()` | Like buffer but emit nested observables.           |

---

## 🚦 Filtering Operators

| Operator                       | Description                          |
| ------------------------------ | ------------------------------------ |
| `filter(fn)`                   | Pass values meeting condition.       |
| `take(n)`                      | Take first n values then complete.   |
| `takeLast(n)`                  | Take last n values on complete.      |
| `takeUntil(notifier$)`         | Complete when notifier emits.        |
| `takeWhile(fn)`                | Take while condition true.           |
| `skip(n)`                      | Skip first n values.                 |
| `skipLast(n)`                  | Skip last n before complete.         |
| `skipUntil(obs)`               | Ignore until obs emits.              |
| `first()`                      | Emit first value and complete.       |
| `last()`                       | Emit last value when complete.       |
| `debounceTime(ms)`             | Wait for silence before emitting.    |
| `debounce(fn)`                 | Wait based on another observable.    |
| `throttleTime(ms)`             | Emit first, then ignore for ms.      |
| `throttle(fn)`                 | Throttle based on custom observable. |
| `auditTime(ms)`                | Emit last value in window.           |
| `audit(fn)`                    | Same with custom closing notifier.   |
| `distinct()`                   | Filter duplicates.                   |
| `distinctUntilChanged()`       | Skip consecutive duplicates.         |
| `distinctUntilKeyChanged(key)` | Compare key values.                  |

---

## 🧩 Combination Operators

| Operator                 | Description                                   |
| ------------------------ | --------------------------------------------- |
| `startWith(value)`       | Prepend initial value.                        |
| `combineLatest(...obs)`  | Emit latest from all when any emits.          |
| `zip(...obs)`            | Combine in lockstep.                          |
| `merge(...obs)`          | Merge multiple streams concurrently.          |
| `concat(...obs)`         | Run observables sequentially.                 |
| `race(...obs)`           | Emit from first observable to emit.           |
| `forkJoin(...obs)`       | Wait all complete, emit array of last values. |
| `withLatestFrom(...obs)` | Combine latest of others when source emits.   |
| `combineLatestWith(...)` | Same but chained.                             |

---

## 🔁 Multicasting & Sharing

| Operator                              | Description                                             |
| ------------------------------------- | ------------------------------------------------------- |
| `share()`                             | Multicast single subscription to multiple observers.    |
| `shareReplay({bufferSize, refCount})` | Share + cache last values (good for HTTP).              |
| `publish()`                           | Convert cold → Connectable observable (manual connect). |
| `publishReplay(size)`                 | Replay last N values when connecting.                   |
| `multicast(subject)`                  | Explicit subject sharing.                               |
| `refCount()`                          | Auto connect/disconnect on subscribers count.           |

---

## ⚠️ Error Handling

| Operator              | Description                                   |
| --------------------- | --------------------------------------------- |
| `catchError(fn)`      | Replace error with fallback observable.       |
| `retry(count)`        | Retry on error.                               |
| `retryWhen(fn)`       | Custom retry logic using notifier observable. |
| `onErrorResumeNext()` | Continue with next observable after error.    |
| `throwIfEmpty()`      | Error if no value emitted.                    |

---

## ⏱️ Time-Based Utilities

| Operator         | Description                               |
| ---------------- | ----------------------------------------- |
| `delay(ms)`      | Delay emissions.                          |
| `delayWhen(fn)`  | Delay per value via inner obs.            |
| `timeout(ms)`    | Throw if no emission in ms.               |
| `timestamp()`    | Add timestamp metadata.                   |
| `timeInterval()` | Emit elapsed time between values.         |
| `interval(ms)`   | Continuous timed emissions (creation op). |

---

## 🧠 Utility & Debugging

| Operator                | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| `tap(fn)`               | Run side effects (logging, metrics).                      |
| `finalize(fn)`          | Run cleanup when completes/errors.                        |
| `defaultIfEmpty(value)` | Emit default if source empty.                             |
| `materialize()`         | Convert notifications (next/error/complete) into objects. |
| `dematerialize()`       | Reverse of materialize.                                   |
| `repeat(count?)`        | Repeat observable after complete.                         |
| `repeatWhen(fn)`        | Conditionally repeat.                                     |

---

## 🧮 Aggregation & Reduction

| Operator            | Description                            |
| ------------------- | -------------------------------------- |
| `count(predicate?)` | Count emissions.                       |
| `reduce(acc, seed)` | Emit accumulated result on complete.   |
| `max(compare?)`     | Emit max value.                        |
| `min(compare?)`     | Emit min value.                        |
| `every(predicate)`  | Emit true/false if all meet condition. |

---

## 🧵 Conditional & Boolean

| Operator               | Description                           |
| ---------------------- | ------------------------------------- |
| `isEmpty()`            | True if no emissions before complete. |
| `find(predicate)`      | First value meeting condition.        |
| `findIndex(predicate)` | Index of first match.                 |
| `defaultIfEmpty()`     | Emit fallback if source empty.        |
| `takeWhile()`          | Keep while condition holds.           |

---

## 🧰 Subjects & Behavior Types

| Type                  | Description                                 |
| --------------------- | ------------------------------------------- |
| `Subject<T>`          | Hot observable + observer.                  |
| `BehaviorSubject<T>`  | Holds last value, emits to new subscribers. |
| `ReplaySubject<T>(n)` | Replays last n values to new subs.          |
| `AsyncSubject<T>`     | Emits last value only when complete.        |

---

## 🧱 Angular-Specific Highlights

| Use Case                            | Operator(s)                                         | Why                        |
| ----------------------------------- | --------------------------------------------------- | -------------------------- |
| HTTP request → auto-cancel when new | `switchMap`                                         | Avoid outdated responses.  |
| Reactive form search                | `debounceTime`, `distinctUntilChanged`, `switchMap` | Prevent spamming backend.  |
| Combine route params + data         | `combineLatest`, `map`                              | Reactive data composition. |
| Cache HTTP results                  | `shareReplay(1)`                                    | Prevent duplicate calls.   |
| Auto-unsubscribe on destroy         | `takeUntil(destroy$)`                               | Memory safety.             |
