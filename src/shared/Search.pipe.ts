import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doctorNameSearch'
})
export class SearchPipe implements PipeTransform {

  transform(doctors: any[], searchText: string): any[] {
    if (!doctors) {
      return [];
    }
    if (!searchText) {
      return doctors;
    }
    searchText = searchText.toLowerCase();
    return doctors.filter(doctor => {
      const doctorName = doctor.doctorName.toLowerCase();
      return doctorName.includes(searchText);
    });
  }
}
