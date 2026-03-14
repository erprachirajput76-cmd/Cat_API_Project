/**
 * Feline Grace – Cat API Explorer
 * Copyright (c) 2025 erprachirajput76-cmd. See LICENSE for terms.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
