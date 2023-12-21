import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TableDataService } from '../../profile/services/table-data.service';
import { AddPersonComponent } from '../add-person/add-person.component';
import { Store, select } from '@ngrx/store';
import {
  addData,
  loadTableData
} from './table.actions';


@Component({
  selector: 'app-table-main',
  templateUrl: './table-main.component.html',
  styleUrls: ['./table-main.component.scss'],
  providers: [TableDataService]
})
export class TableMainComponent {
  tableData: any[] = []; // Замените any[] на соответствующий тип вашего массива данных
  selectedRows: any[] = []; // Массив для хранения выбранных строк
  modalVisible: boolean = false;
  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer!: ViewContainerRef;
  modalRef!: ComponentRef<AddPersonComponent>;

  constructor(private store: Store<any>,    private tableDataService: TableDataService,
    private viewContainerRef: ViewContainerRef) {
this.modalContainer = this.viewContainerRef;
}

ngOnInit() {
  this.store.dispatch(loadTableData());
  this.store.pipe(select('table')).subscribe((state) => {
    this.tableData = state.data;
  });
}

addData(newData: any) {
  this.store.dispatch(addData({ newData }));
}

openModal() {
  this.modalVisible = true;
}

  
  

  // Остальные части кода

  // Метод для выбора строки
  selectRow(item: any) {
    item.selected = !item.selected;
    if (item.selected) {
      this.selectedRows.push(item); // Добавление выбранной строки в массив
    } else {
      this.selectedRows = this.selectedRows.filter((row) => row !== item); // Удаление строки из массива, если она была отменена
    }
  }

  // Метод для удаления выбранных строк
  deleteSelectedRows() {
    this.tableData = this.tableData.filter((row) => !this.selectedRows.includes(row));
    // Очистка массива выбранных строк
    this.selectedRows = [];
  }
  hidePassword(password: string): string {
    return '*'.repeat(password.length);
  }

  // Метод для замены последних семи цифр номера телефона на символ 'X'
  hidePhoneNumber(phone: string): string {
    if (phone.length >= 7) {
      const digitsToReplace = phone.slice(-7); // Получение последних семи цифр номера телефона
      const maskedDigits = 'X'.repeat(digitsToReplace.length); // Замена цифр на символы 'X'
      return phone.slice(0, -9) + maskedDigits; // Конкатенация префикса номера и замаскированных цифр
    } else {
      return phone; // Если номер телефона содержит менее семи цифр, оставляем его как есть
    }
  }

}
