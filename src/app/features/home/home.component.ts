import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CatApiService } from '../../core/services/cat-api.service';
import { API_CONFIG } from '../../core/config/api.config';
import { VideoEmbed, ImageSize, HeroImageAlt } from '../../core/constants/app.constants';
import { LoaderMessage } from '../../core/constants/loader.constants';
import { OrganicImageComponent } from '../../shared/components/organic-image/organic-image.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OrganicImageComponent, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly api = inject(CatApiService);
  private readonly sanitizer = inject(DomSanitizer);
  heroImage = signal<string | null>(null);
  aboutImage = signal<string | null>(null);
  showVideo = signal(false);

  /** True until API has returned and all displayed images have finished loading. */
  apiDone = signal(false);
  loadedCount = signal(0);
  imagesToShow = computed(
    () => (this.heroImage() ? 1 : 0) + (this.aboutImage() ? 1 : 0)
  );
  loading = computed(
    () => !this.apiDone() || this.loadedCount() < this.imagesToShow()
  );

  readonly loaderMessage = LoaderMessage.LOADING_IMAGES;
  readonly heroImageSize = ImageSize.HERO;
  readonly aboutImageSize = ImageSize.ABOUT;
  readonly heroImageAlt = HeroImageAlt.HERO;
  readonly aboutImageAlt = HeroImageAlt.ABOUT;
  /** Safe URL for YouTube embed (cat-themed video, autoplay when modal opens) */
  readonly sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(VideoEmbed.URL);
  readonly videoTitle = VideoEmbed.TITLE;

  openVideo(): void {
    this.showVideo.set(true);
  }

  closeVideo(): void {
    this.showVideo.set(false);
  }

  onImageLoaded(): void {
    this.loadedCount.update((c) => c + 1);
  }

  ngOnInit(): void {
    this.api.getRandomCats(API_CONFIG.homeRandomCatCount).subscribe({
      next: (cats) => {
        if (cats[0]) this.heroImage.set(cats[0].url);
        if (cats[1]) this.aboutImage.set(cats[1].url);
        this.apiDone.set(true);
      },
      error: () => this.apiDone.set(true),
    });
  }
}
