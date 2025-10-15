## 🧩 The full list of possible `HttpEvent` subclasses

| Event Type               | Description                                                           | Class                                                                                        |                                                                  |
| ------------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **`HttpSentEvent`**      | Emitted when the request is sent to the server (before any response). | `class HttpSentEvent { type = HttpEventType.Sent; }`                                         |                                                                  |
| **`HttpHeaderResponse`** | Emitted when the response headers are received (but body not yet).    | `class HttpHeaderResponse extends HttpResponseBase { type = HttpEventType.ResponseHeader; }` |                                                                  |
| **`HttpResponse<T>`**    | Emitted when the full response (headers + body) is received.          | `class HttpResponse<T> extends HttpResponseBase { type = HttpEventType.Response; }`          |                                                                  |
| **`HttpProgressEvent`**  | Emitted periodically during upload/download progress.                 | `interface HttpProgressEvent { type: HttpEventType.DownloadProgress                          | HttpEventType.UploadProgress; loaded: number; total?: number; }` |
| **`HttpUserEvent<T>`**   | Rarely used; custom user-defined events for advanced streaming.       | `interface HttpUserEvent<T> { type: HttpEventType.User; }`                                   |                                                                  |

And then the odd one out:

| Error Case              | Description                                                                                    | Class                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **`HttpErrorResponse`** | Emitted via the _error channel_ (not `next()`) when something fails (network error, 4xx, 5xx). | `class HttpErrorResponse extends HttpResponseBase { error: any; }` |

---

## 🧠 Quick reference: `HttpEventType` enum

```ts
export enum HttpEventType {
  Sent = 0,
  UploadProgress = 1,
  ResponseHeader = 2,
  DownloadProgress = 3,
  Response = 4,
  User = 5,
}
```

So you can also check event type numerically or by enum:

```ts
if (e.type === HttpEventType.Response) {
  /* full response */
}
if (e.type === HttpEventType.DownloadProgress) {
  /* progress info */
}
```

---

## ✅ Best practice in interceptors

When writing middleware-like interceptors (like your `mng()`),
you usually only care about **responses or errors**,
so this condition is perfect and idiomatic:

```ts
if (!(e instanceof HttpResponse) && !(e instanceof HttpErrorResponse)) return;
```

That skips:

- `HttpSentEvent`
- `HttpHeaderResponse`
- `HttpProgressEvent`
- `HttpUserEvent`

All of which are irrelevant for most app-level logic.

---

## 🧩 Optional — if you want to handle progress events

If you ever need a progress bar or upload indicator, you can listen for those too:

```ts
if (e.type === HttpEventType.DownloadProgress) {
  const percent = Math.round((100 * e.loaded) / (e.total ?? 1));
  console.log('Download', percent, '%');
}

if (e.type === HttpEventType.UploadProgress) {
  const percent = Math.round((100 * e.loaded) / (e.total ?? 1));
  console.log('Upload', percent, '%');
}
```

But in most middleware like yours, ignoring them is correct ✅

---

### 🧠 TL;DR

| Type                 | Class | Typical Use              |
| -------------------- | ----- | ------------------------ |
| `HttpSentEvent`      | —     | “Request sent” marker    |
| `HttpHeaderResponse` | —     | Got headers early        |
| `HttpResponse<T>`    | ✅    | Normal success           |
| `HttpErrorResponse`  | ✅    | Error case               |
| `HttpProgressEvent`  | —     | Upload/download tracking |
| `HttpUserEvent<T>`   | —     | Custom streaming events  |
