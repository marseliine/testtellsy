import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { IResponse } from 'src/core/interfaces/response';
import { CustomvalidationService } from '../../services/customvalidation.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  profile!: FormGroup;
  sub: Subscription[] = [];

  constructor(
    public userDataService: UserDataService,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService
  ) {}

  onSubmit() {
    if (this.profile.status !== 'VALID') return;
    const user = {
      id: 1,
      login: 'kate',
      password: 'kate',
      firstName: this.profile.controls['firstName'].value,
      lastName: this.profile.controls['lastName'].value,
      email: this.profile.controls['email'].value,
      webSite: this.profile.controls['webSite'].value,
      phone: this.profile.controls['phone'].value,
    };
    const data = this.userDataService.updateDataUser(user).subscribe();
    this.sub.push(data);
  }

  ngOnInit() {
    this.profile = this.fb.group({
      email: [''],
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(12),
        ],
      ],
      webSite: ['', [this.customValidator.checkURL()]],
    });
    // const data = this.userDataService.getDataUser().subscribe();
    // this.sub.push(data);

    const sub = this.userDataService.currentData.subscribe((result) => {
      if (!result.length) return;
      const res = result[0];
      this.profile.controls['email'].setValue(res.email);
      this.profile.controls['firstName'].setValue(res.firstName);
      this.profile.controls['lastName'].setValue(res.lastName);
      this.profile.controls['phone'].setValue(res.phone);
      this.profile.controls['webSite'].setValue(res.webSite);
    });

    this.sub.push(sub);

    const input = this.profile.controls['phone'].valueChanges.subscribe(
      (newValue) => this.checkPhoneNumber(newValue)
    );

    this.sub.push(input);
  }

  checkPhoneNumber(newValue: string) {
    const last = newValue[newValue.length - 1];

    if (last && isNaN(+last))
      this.profile.controls['phone'].setValue(
        newValue.slice(0, newValue.length - 1)
      );
    if (newValue.length == 2) this.profile.controls['phone'].setValue('');
    else if (newValue.length == 1) {
      this.profile.controls['phone'].setValue('+7' + newValue);
    } else if (newValue.length >= 3) {
      if (newValue[0] === '+' && newValue[1] !== '7')
        this.profile.controls['phone'].setValue('+7' + newValue.slice(1));
      if (newValue[0] === '+' && newValue[1] == '7') return;
      if (newValue[0] !== '+' && newValue[1] !== '7')
        this.profile.controls['phone'].setValue('+7' + newValue);
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach((i) => i.unsubscribe());
  }
}
