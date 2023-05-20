import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { campaign } from './interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { data } from '../Datasource';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-tablelist',
  templateUrl: './tablelist.component.html',
  styleUrls: ['./tablelist.component.css'],
})
export class TablelistComponent implements OnInit {
  constructor(private _liveAnnouncer: LiveAnnouncer) {
    this.dataSource = new MatTableDataSource(this.listData);
  }
  @ViewChild('table', { static: true }) table: MatTable<campaign>;
  displayedColumns: string[] = ['no', 'campaign', 'status', 'action'];
  dataSource: MatTableDataSource<campaign> | any;
  listData: campaign[] = data;
  dragDisabled = true;
  selection = new SelectionModel<any>(true, []);

  ngAfterViewInit() {}

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: campaign): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
  drop(event: CdkDragDrop<campaign[]> | any) {
    // Return the drag container to disabled.
    this.dragDisabled = true;
    console.log('inside drop');
    // const previousIndex = this.dataSource.data.findIndex(
    //   (d: any) => d === event.item.data
    // );
    console.log(this.dataSource.data, event.previousIndex, event.currentIndex);
    moveItemInArray(
      this.dataSource.data,
      event.previousIndex,
      event.currentIndex
    );
    this.table.renderRows();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  tap(index: string) {
    console.log('tapped', index);
  }

  ngOnInit(): void {}
}
