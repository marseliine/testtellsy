import { Component } from '@angular/core';
import { TableDataService } from '../../profile/services/table-data.service';


@Component({
  selector: 'app-input-main',
  templateUrl: './input-main.component.html',
  styleUrls: ['./input-main.component.scss']
})
export class InputMainComponent {
    tableData!: any[];
    constructor(private tableDataService: TableDataService) {}

    ngOnInit() {
      this.tableData = this.tableDataService.tableData();
    }
  
}