/**
 * Copyright (c) 2025 erprachirajput76-cmd. See LICENSE for terms.
 */
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    document.getElementById('app-loader')?.remove();
  }
}
