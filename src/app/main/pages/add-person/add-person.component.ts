import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  @Input()
  tableData: any[] = [];
positionOptions: any;
phoneOptions: any;
modalVisible: boolean = false;
@Input() childModalVisible: boolean = false;
@Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

saveData() {
throw new Error('Method not implemented.');
}

// handleOk(): void {
//   console.log('Button ok clicked!');
//   this.modalVisible = false;
// }

// handleCancel(): void {
//   console.log('Button cancel clicked!');
//   this.modalVisible = false;
// }
}