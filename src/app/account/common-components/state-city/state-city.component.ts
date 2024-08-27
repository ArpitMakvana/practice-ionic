import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-state-city',
  templateUrl: './state-city.component.html',
  styleUrls: ['./state-city.component.scss'],
})
export class StateCityComponent implements OnInit {
  @Output() submitData = new EventEmitter();
  @Input() presentFormData: any = {};
  locationForm!: FormGroup;
  countries: string[] = ['India', 'UAE'];
  states: string[] = [];
  cities: string[] = [];

  stateCityMapping: any = {
    India: {
      'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
      'Arunachal Pradesh': ['Itanagar', 'Tawang'],
      'Assam': ['Guwahati', 'Dibrugarh'],
      'Bihar': ['Patna', 'Gaya'],
      'Chhattisgarh': ['Raipur', 'Bilaspur'],
      'Goa': ['Panaji', 'Margao'],
      'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
      'Haryana': ['Chandigarh', 'Gurgaon'],
      'Himachal Pradesh': ['Shimla', 'Manali'],
      'Jharkhand': ['Ranchi', 'Jamshedpur'],
      'Karnataka': ['Bangalore', 'Mysore', 'Mangalore'],
      'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode'],
      'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior'],
      'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
      'Manipur': ['Imphal'],
      'Meghalaya': ['Shillong'],
      'Mizoram': ['Aizawl'],
      'Nagaland': ['Kohima'],
      'Odisha': ['Bhubaneswar', 'Cuttack'],
      'Punjab': ['Amritsar', 'Ludhiana'],
      'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur'],
      'Sikkim': ['Gangtok'],
      'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
      'Telangana': ['Hyderabad', 'Warangal'],
      'Tripura': ['Agartala'],
      'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi'],
      'Uttarakhand': ['Dehradun', 'Haridwar'],
      'West Bengal': ['Kolkata', 'Darjeeling', 'Siliguri']
    },
    UAE: {
      'Abu Dhabi': ['Abu Dhabi City', 'Al Ain'],
      'Dubai': ['Dubai City', 'Jebel Ali'],
      'Sharjah': ['Sharjah City'],
      'Ajman': ['Ajman City'],
      'Umm Al Quwain': ['Umm Al Quwain City'],
      'Ras Al Khaimah': ['Ras Al Khaimah City'],
      'Fujairah': ['Fujairah City']
    }
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.locationForm = this.fb.group({
      country: ['', Validators.required],
      state: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      placeOfOrigin: ['', Validators.required],
      currentLocation: ['', Validators.required],
    });

    if (this.presentFormData) {
      this.locationForm.patchValue(this.presentFormData);
      if (this.presentFormData.country) {
        this.onCountryChange({ detail: { value: this.presentFormData.country } });
      }
      if (this.presentFormData.state) {
        this.onStateChange({ detail: { value: this.presentFormData.state } });
      }
    }
  }

  onCountryChange(event: any) {
    const country = event.detail.value;
    this.states = Object.keys(this.stateCityMapping[country] || {});
    this.locationForm.get('state')?.enable(); // Enable state field
    this.locationForm.get('city')?.disable(); // Disable city field until state is selected
    this.locationForm.patchValue({ state: '', city: '' });
    this.cities = [];
  }

  onStateChange(event: any) {
    const state = event.detail.value;
    const country = this.locationForm.get('country')?.value;
    this.cities = this.stateCityMapping[country][state] || [];
    this.locationForm.get('city')?.enable(); // Enable city field when state is selected
    this.locationForm.patchValue({ city: '' });
  }

  submitForm() {
    if (this.locationForm.valid) {
      this.submitData.emit(this.locationForm.value);
    }
  }
}