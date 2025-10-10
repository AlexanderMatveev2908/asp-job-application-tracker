# 🧩 Angular Lifecycle Hooks Cheat Sheet

### 🧠 Quick Flow Diagram

```text
OnChanges → OnInit → DoCheck
   ↓
AfterContentInit → AfterContentChecked
   ↓
AfterViewInit → AfterViewChecked
   ↓
OnDestroy
```

---

### ⚙️ Component Lifecycle Hooks

| Hook                          | Called When                                        | Common Use                    |
| ----------------------------- | -------------------------------------------------- | ----------------------------- |
| **`ngOnChanges(changes)`**    | Before `ngOnInit`, whenever an `@Input()` changes. | React to input changes.       |
| **`ngOnInit()`**              | Once after first `ngOnChanges`.                    | Initialize data or state.     |
| **`ngDoCheck()`**             | Every change detection cycle.                      | Custom change tracking.       |
| **`ngAfterContentInit()`**    | Once after `<ng-content>` is projected.            | Access projected content.     |
| **`ngAfterContentChecked()`** | After each content check.                          | Respond to content updates.   |
| **`ngAfterViewInit()`**       | Once after view & child views init.                | Access `@ViewChild` elements. |
| **`ngAfterViewChecked()`**    | After every view check.                            | Handle post-view updates.     |
| **`ngOnDestroy()`**           | Before component is destroyed.                     | Cleanup & unsubscribe.        |

---

### 🧱 Directive Hooks

| Hook                           | Available? | Notes                       |
| ------------------------------ | ---------- | --------------------------- |
| `ngOnChanges`                  | ✅         | On input changes.           |
| `ngOnInit`                     | ✅         | On init.                    |
| `ngDoCheck`                    | ✅         | Custom detection.           |
| `ngAfterContentInit / Checked` | ✅         | If using projected content. |
| `ngAfterViewInit / Checked`    | 🚫         | Only for components.        |
| `ngOnDestroy`                  | ✅         | Cleanup.                    |

---

### 💡 Best Practices

| Tip                                    | Why                   |
| -------------------------------------- | --------------------- |
| Use `ngOnInit` instead of constructor. | Inputs are set.       |
| Always cleanup in `ngOnDestroy`.       | Prevent memory leaks. |
| Keep `ngDoCheck` light.                | Runs often.           |
| Use `AfterViewInit` for DOM access.    | View is ready.        |
