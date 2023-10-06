import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'staffNameSearch'
})
export class StaffSearchPipe implements PipeTransform {

  transform(staffs: any[], searchText: string): any[] {
    if (!staffs) {
      return [];
    }
    if (!searchText) {
      return staffs;
    }
    searchText = searchText.toLowerCase();
    return staffs.filter(staff => {
      const doctorName = staff.staffName.toLowerCase();
      return doctorName.includes(searchText);
    });
  }
}
