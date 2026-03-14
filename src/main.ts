/**
 * Feline Grace – Cat API Explorer
 * Copyright (c) 2026 Prachi Rajput. See LICENSE for terms.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
