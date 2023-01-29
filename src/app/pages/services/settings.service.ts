import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  linkTheme = document.querySelector('#theme');
  links!: NodeListOf<Element>;

  constructor() {
    const lastTheme = localStorage.getItem('urlTheme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', lastTheme);
  }

  changeTheme(theme: string){
    console.log('elemento', this.linkTheme);
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('urlTheme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    this.links = document.querySelectorAll('.selector');
    console.log('links',this.links);

    this.links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const currentTheme = this.linkTheme?.getAttribute('href');
      const urlThemeElement = `./assets/css/colors/${btnTheme}.css`; 

      if (currentTheme === urlThemeElement) {
        element.classList.add('working');
      }
    })
    
  }
}
