import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], categoria: string, distrito: string): any[] {

    console.log(categoria)
    console.log(distrito)
    if ( (categoria === '0' ||categoria === '') && (distrito === '')){
      return arreglo;
    }else if(categoria === '0' ||categoria === ''){
      return arreglo.filter( item => {
        console.log(item)
        return item.distritos.includes(distrito);
      });
    }else if(distrito === ''){
      return arreglo.filter( item => {
        console.log(item)
        return item.categorias.includes(categoria);
      });
    }else{
      return arreglo.filter( item => {
        console.log(item)
        return item.categorias.includes(categoria) && item.distritos.includes(distrito);
      });
    }
    
  }

}
