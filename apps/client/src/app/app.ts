import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../layout/header/header';
import { SvgAdvComplex } from '../common/components/svgs/advanced/complex/complex';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SvgAdvComplex],
  templateUrl: './app.html',
})
export class App {}
