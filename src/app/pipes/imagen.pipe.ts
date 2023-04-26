import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  transform(img?: string, tipo?: 'usuarios' | 'hospitales' | 'medicos'): string {
    const base_url = environment.base_url;
    
    if (!img) {
      return `${base_url}/upload/${tipo}/no-image`;
    }
    if (img?.includes("https")) {
      return img;
    }

    if (img) {
      return `${base_url}/upload/${tipo}/${img}`;
    } else {
      return `${base_url}/upload/${tipo}/no-image`;
    }
  }

}
