import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'getImgUrl'
})
export class GetImgUrlPipe implements PipeTransform {

  transform(urlStr: string): any {
    const imgUrl = "https://cdn.sanity.io/images/qwmluuy0/production/"
    var nwStrArr = urlStr.split("-");

    return imgUrl + nwStrArr[1] + "-" + nwStrArr[2] + "." + nwStrArr[3];
  }

}
