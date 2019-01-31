import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CacheService } from '../shared/services/cache.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  constructor(
    private cacheService: CacheService,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }
}
