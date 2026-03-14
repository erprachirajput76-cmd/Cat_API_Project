import { Component, input } from '@angular/core';
import { LoaderMessage, LoaderBrand } from '../../../core/constants/loader.constants';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  message = input<string>(LoaderMessage.DEFAULT);
  readonly brandSubtext = LoaderBrand.SUBTEXT;
}
