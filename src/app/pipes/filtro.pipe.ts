import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], categoria: string, distrito: string): any[] {

    if ( (categoria === '0' ||categoria === '') && (distrito === '')){
      return null;
    }else if(categoria === '0' ||categoria === ''){
      return arreglo.filter( item => {
        //console.log(item)
        return item.distritos.includes(distrito);
        //return null;
      });
    }else if(distrito === ''){
      return arreglo.filter( item => {
        //console.log(item)
        //return item.categorias.includes(categoria);
        return null;
      });
    }else{
      return arreglo.filter( item => {
        //console.log(item)
        return item.categorias.includes(categoria) && item.distritos.includes(distrito);
      });
    }
    
  }

}
