import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuSidebar: any[] = [];
  constructor(
    private _sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.menuSidebar = this._sidebarService.menu;
  }

}
