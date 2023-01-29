import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
    `
    .selector{
      cursor: pointer;
    }
    `
  ]
})
export class AccountSettingsComponent implements OnInit {
  

  constructor(
    private _settingsService: SettingsService
  ){
  }
  
  ngOnInit(): void {
    this._settingsService.checkCurrentTheme();
  }

  changeTheme(theme: string){
    this._settingsService.changeTheme(theme);
  }
}
