import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true
})
export class AgePipe implements PipeTransform {

  transform(value: string): string {
    const birthDate = new Date(value);
    const today = new Date();

    // Calculate the year difference
    let years = today.getFullYear() - birthDate.getFullYear();

    // Calculate the month difference
    let months = today.getMonth() - birthDate.getMonth();

    // If the birth month hasn't occurred yet this year, adjust the year and month
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12; // Adjust months when the year is adjusted
    }

    // If the birth day hasn't occurred yet this month, adjust the month
    if (today.getDate() < birthDate.getDate()) {
      months--;
    }

    // Handle negative month by adjusting back the year
    if (months < 0) {
      months += 12;
      years--;
    }

    return `${years}yr ${months}mon`;
  }
}
