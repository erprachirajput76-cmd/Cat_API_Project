import { Component, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { StorageKey, DarkModeStorage } from '../../core/constants/storage.constants';
import { RoutePathFull } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatSlideToggleModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  readonly routes = RoutePathFull;
  darkMode = signal(this.readDarkMode());

  ngOnInit(): void {
    if (this.darkMode()) {
      document.documentElement.classList.add('dark-mode');
    }
  }

  toggleDark(value: boolean): void {
    this.darkMode.set(value);
    try {
      localStorage.setItem(StorageKey.DARK_MODE, value ? DarkModeStorage.ON : DarkModeStorage.OFF);
    } catch {
      // ignore
    }
    document.documentElement.classList.toggle('dark-mode', value);
  }

  private readDarkMode(): boolean {
    try {
      return localStorage.getItem(StorageKey.DARK_MODE) === DarkModeStorage.ON;
    } catch {
      return false;
    }
  }
}
