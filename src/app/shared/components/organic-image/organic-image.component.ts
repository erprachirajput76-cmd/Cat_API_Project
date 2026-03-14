import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-organic-image',
  standalone: true,
  imports: [],
  templateUrl: './organic-image.component.html',
  styleUrl: './organic-image.component.scss',
})
export class OrganicImageComponent {
  src = input.required<string>();
  alt = input<string>('');
  size = input<number>(320);
  loaded = signal(false);
  /** Emits when the image has finished loading. */
  imageLoaded = output<void>();

  onImageLoad(): void {
    this.loaded.set(true);
    this.imageLoaded.emit();
  }
}
