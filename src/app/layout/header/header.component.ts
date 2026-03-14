import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageKey, DarkModeStorage } from '../../core/constants/storage.constants';
import { RoutePathFull } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  readonly routes = RoutePathFull;

  ngOnInit(): void {
    if (this.readDarkMode()) {
      document.documentElement.classList.add('dark-mode');
    }
  }

  private readDarkMode(): boolean {
    try {
      return localStorage.getItem(StorageKey.DARK_MODE) === DarkModeStorage.ON;
    } catch {
      return false;
    }
  }
}
