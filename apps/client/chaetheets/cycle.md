## 🧠 Lifecycle Order (in order of execution)

| #   | Hook                          | When It Runs                                                                         | Common Use Case                                                        |
| --- | ----------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| 1️⃣  | **`constructor()`**           | When the class is instantiated (before Angular sets inputs or renders)               | Initialize simple class variables, inject services                     |
| 2️⃣  | **`ngOnChanges()`**           | When input properties change (runs before `ngOnInit()` and every time inputs update) | React to `@Input()` data changes                                       |
| 3️⃣  | **`ngOnInit()`**              | Once, after first `ngOnChanges()`                                                    | Initialize component logic, fetch data from services                   |
| 4️⃣  | **`ngDoCheck()`**             | During every change detection cycle                                                  | Manually detect and act on changes Angular doesn’t catch automatically |
| 5️⃣  | **`ngAfterContentInit()`**    | Once after projecting external content into the component (via `<ng-content>`)       | Initialize projected content                                           |
| 6️⃣  | **`ngAfterContentChecked()`** | After every check of projected content                                               | Respond to changes in projected content                                |
| 7️⃣  | **`ngAfterViewInit()`**       | Once after component’s view (and child views) are fully initialized                  | Access `@ViewChild`, run animations, manipulate DOM                    |
| 8️⃣  | **`ngAfterViewChecked()`**    | After every check of the component’s view                                            | Handle changes after Angular updates the view                          |
| 9️⃣  | **`ngOnDestroy()`**           | Right before the component is destroyed and removed from the DOM                     | Clean up: unsubscribe, stop timers, detach listeners                   |

---

## 🔁 Typical Lifecycle Flow

```
constructor()
↓
ngOnChanges() → (if inputs exist)
↓
ngOnInit()
↓
ngDoCheck()
↓
ngAfterContentInit()
↓
ngAfterContentChecked()
↓
ngAfterViewInit()
↓
ngAfterViewChecked()
↓
[component lives… updates trigger ngOnChanges, ngDoCheck, etc.]
↓
ngOnDestroy()
```

---

## ⚙️ Quick Template Example

```ts
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  DoCheck,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `<p>Check console logs!</p>`,
})
export class DemoComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy {
  @Input() data!: string;

  constructor() {
    console.log('1️⃣ constructor');
  }

  ngOnChanges() {
    console.log('2️⃣ ngOnChanges');
  }

  ngOnInit() {
    console.log('3️⃣ ngOnInit');
  }

  ngDoCheck() {
    console.log('4️⃣ ngDoCheck');
  }

  ngAfterViewInit() {
    console.log('5️⃣ ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('💀 ngOnDestroy');
  }
}
```

Open your console and watch the lifecycle unfold like a telenovela 📺😂

---

## 🧰 Best Practices

✅ Use `ngOnInit()` for initialization logic, **not** `constructor()`
✅ Access DOM elements only in `ngAfterViewInit()`
✅ Unsubscribe from Observables and clean up in `ngOnDestroy()`
✅ Avoid heavy work in `ngDoCheck()` (it runs **a lot**)
✅ Keep lifecycle hooks lightweight — Angular runs them frequently

---

## 🧩 Bonus: Related Decorators

| Decorator         | Purpose                                       |
| ----------------- | --------------------------------------------- |
| `@Input()`        | Receive data from parent                      |
| `@Output()`       | Emit data to parent                           |
| `@ViewChild()`    | Access a child element/component              |
| `@ContentChild()` | Access projected content (via `<ng-content>`) |
