import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IResponse } from 'src/core/interfaces/response';
import { AuthService } from 'src/core/services/auth.service';
import { UserDataService } from '../../profile/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  data$ = this.userDataService.currentData;

  subscription!: Subscription;
  constructor(
    public userDataService: UserDataService,
    public authService: AuthService
  ) {}

  closeMessage() {
    this.userDataService.setMessage('');
    this.userDataService.setTypeMessage(false);
  }

  ngOnInit(): void {
    this.subscription = this.userDataService.getDataUser().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
