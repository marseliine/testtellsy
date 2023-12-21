import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { IResponse } from 'src/core/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(public http: HttpClient) {}

  private dataUser = new BehaviorSubject<IResponse[]>([]);
  currentData = this.dataUser.asObservable();

  private message = new BehaviorSubject<string>('');
  currentMessage = this.message.asObservable();

  private typeMessage = new BehaviorSubject<boolean>(false);
  currentType = this.typeMessage.asObservable();

  setDataUser(value: IResponse[]) {
    this.dataUser.next(value);
  }

  setMessage(value: string) {
    this.message.next(value);
  }

  setTypeMessage(value: boolean) {
    this.typeMessage.next(value);
  }

  public getDataUser() {
    return this.http.get<IResponse[]>('/api/users/').pipe(
      tap((res) => {
        this.setDataUser(res);
      })
    );
  }

  public updateDataUser(user: IResponse) {
    try {
      if (user.firstName.length <= 1) throw new Error();
      return this.http.put<IResponse>('/api/users/', user).pipe(
        switchMap(() => this.getDataUser()),
        tap(() => {
          this.setMessage('Data updated');
          this.setTypeMessage(false);
          setTimeout(() => {
            this.setMessage('');
          }, 30000);
        })
      );
    } catch (error) {
      setTimeout(() => {
        this.setMessage('First name have length 1 symbol');
        this.setTypeMessage(true);
      }, 1000);

      return this.currentData;
    }
  }
}
