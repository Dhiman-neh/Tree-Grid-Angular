import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  ChangeEventArgs,
  DropDownListComponent,
} from '@syncfusion/ej2-angular-dropdowns';
import {
  ButtonPropsModel,
  DialogComponent,
} from '@syncfusion/ej2-angular-popups';
import {
  ColumnChooserService,
  ColumnMenuService,
  CommandColumnService,
  ContextMenuService,
  EditService,
  ExcelExportService,
  FilterService,
  FreezeService,
  PageService,
  PdfExportService,
  ReorderService,
  ResizeService,
  SortService,
  ToolbarService,
  TreeGridComponent,
  SelectionSettingsModel,
} from '@syncfusion/ej2-angular-treegrid';
import { Column } from '@syncfusion/ej2-grids';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { frozenSampleData } from 'jsondata';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    FilterService,
    FreezeService,
    SortService,
    ReorderService,
    CommandColumnService,
    PageService,
    ResizeService,
    ColumnMenuService,
    ResizeService,
    ColumnChooserService,
    EditService,
    ExcelExportService,
    PdfExportService,
    ContextMenuService,
    ToolbarService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public data: Object[] = [];

  public data1: Object[] = [];
  public dataColumn: {
    columnName: string;
    metadata: {
      color: string;
      font: string;
      datatype: string;
      isFreeze: any;
      minwidth: string;
      bgcolor: string;
      alignment: string;
      textwrap: boolean;
    };
    id: number;
  }[] = [];
  public pageSettings: Object = {};
  public filterSettings: Object = {};

  @ViewChild('treegrid') public treegrid!: TreeGridComponent;

  @ViewChild('addColumnDialog')
  public addColumnDialog!: DialogComponent;
  @ViewChild('editColumnDialog')
  public editColumnDialog!: DialogComponent;
  @ViewChild('deleteColumnDialog')
  public deleteColumnDialog!: DialogComponent;

  @ViewChild('addRowDialog')
  public addRowDialog!: DialogComponent;
  @ViewChild('addSubTaskDialog')
  public addSubTaskDialog!: DialogComponent;

  @ViewChild('columndropdown')
  public columnDropDown!: DropDownListComponent;
  @ViewChild('directiondropdown')
  public directionDropDown!: DropDownListComponent;
  @ViewChild('alertDialog')
  public alertDialog!: DialogComponent;

  public visible: boolean = false;
  public fields: object = { text: 'name', value: 'id' };
  public animationSettings: object = { effect: 'None' };
  public content: string = 'Atleast one Column should be in movable';
  public header: string = 'Frozen';
  public header1: string = 'Add Sub Row';
  public deletetext: string = 'Delete Column';
  public showCloseIcon: boolean = false;
  public target: string = '.control-section';
  public width: string = '300px';
  public refresh: boolean = true;
  public columnData: Object[] = [
    { id: 'taskID', name: 'Task ID' },
    { id: 'taskName', name: 'TaskName' },
    { id: 'startDate', name: 'Start Date' },
    { id: 'endDate', name: 'End Date' },
    { id: 'duration', name: 'Duration' },
    { id: 'progress', name: 'Progress' },
    { id: 'priority', name: 'Priority' },
    { id: 'designation', name: 'Designation' },
    { id: 'employeeID', name: 'EmployeeID' },
    { id: 'approved', name: 'Approved' },
  ];
  public directionData: Object[] = [
    { id: 'Left', name: 'Left' },
    { id: 'Right', name: 'Right' },
    { id: 'Center', name: 'Center' },
  ];

  public dataTypes: string[] = ['STRING', 'NUM', 'DATE', 'BOOLEAN'];
  public alignmentType: string[] = ['LEFT', 'CENTER', 'RIGHT'];

  public contextMenuItems: Object = {};
  eventArgs: any;
  isEditColumn: boolean = false;

  addColumnForm!: FormGroup;
  addColumnFormError!: boolean;
  editRowForm!: FormGroup;
  editRowFormError!: boolean;
  addRowForm!: FormGroup;
  addRowFormError!: boolean;
  addSubTaskRowForm!: FormGroup;
  addSubTaskFormError!: boolean;

  htmlAttributes = { disabled: true };
  columnIDToBeDeleted: any;

  public toolbar: Object[] = [];
  public selectionOptions!: SelectionSettingsModel;
  isEditRow: boolean = false;
  isSubTask: boolean = false;
  parentTaskID: any;
  isDeleteRow: boolean = false;

  constructor(private homeService: HomeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.data1 = frozenSampleData;
    this.createForm();
    this.createRowForm();

    this.pageSettings = { pageSize: 10 };
    this.contextMenuItems = [
      { text: 'Add Next', target: '.e-content', id: 'addnext' },
      { text: 'Add Child', target: '.e-content', id: 'addchild' },
      { text: 'Delete Row', target: '.e-content', id: 'deleterow' },
      { text: 'Edit Row', target: '.e-content', id: 'editrow' },
      { text: 'Multiselect', target: '.e-content', id: 'multiselect' },
      { text: 'Copy Rows', target: '.e-content', id: 'copyrows' },
      { text: 'Cut Rows', target: '.e-content', id: 'cutrows' },
      { text: 'PasteNext', target: '.e-content', id: 'pastenext' },
      { text: 'PasteChild', target: '.e-content', id: 'pastechild' },
      { text: 'New Column', target: '.e-headercontent', id: 'newcolumn' },
      { text: 'Edit Column', target: '.e-headercontent', id: 'editcolumn' },
      { text: 'DelCol', target: '.e-headercontent', id: 'delcolumn' },
      { text: 'Choose Column', target: '.e-headercontent', id: 'choosecolumn' },
      { text: 'FreezeCol', target: '.e-headercontent', id: 'freezecolumn' },
      { text: 'FilterCol', target: '.e-headercontent', id: 'filtercolumn' },
      { text: 'MultiSort', target: '.e-headercontent', id: 'multisort' },
    ];

    this.getDataList();
    this.getColumnList();
  }

  createForm() {
    this.addColumnForm = this.fb.group({
      // field: [''],
      // headerText: [''],
      // width: [''],
      // format: [''],
      // textAlign: [''],
      // editType: [''],
      columnName: [''],
      color: [''],
      font: [''],
      datatype: [''],
      id: [''],
      bgcolor: [''],
      alignment: [''],
      textwrap: [''],
      minwidth: [''],
    });
    this.addRowForm = this.fb.group({
      newRow: [true],
      // taskName: [''],
      // startDate: [''],
      // endDate: [''],
      // progress: [''],
      // duration: [''],
      // priority: [''],
      // approved: [''],
    });
    // this.addRowForm = this.fb.group({
    //   newRow: [true],
    //   // taskName: [''],
    //   // startDate: [''],
    //   // endDate: [''],
    //   // progress: [''],
    //   // duration: [''],
    //   // priority: [''],
    //   // approved: [''],
    // });
  }

  get addColumnFormControls() {
    return this.addColumnForm.controls;
  }

  createRowForm() {
    // this.addRowForm = this.fb.group({
    //   newRow: [true],
    //   // taskName: [''],
    //   // startDate: [''],
    //   // endDate: [''],
    //   // progress: [''],
    //   // duration: [''],
    //   // priority: [''],
    //   // approved: [''],
    // });

    //clearing form and reinitiating
    this.addRowForm = this.fb.group({
      extra: [''],
    });

    // adding dynamic column as form controlls
    if (this.dataColumn && this.dataColumn.length > 0) {
      this.dataColumn.forEach((column) => {
        this.addRowForm.addControl(column.columnName, new FormControl(''));
      });

      this.addRowForm.removeControl('extra');
    }
  }

  get addRowFormControls() {
    return this.addRowForm.controls;
  }

  getDataList() {
    this.homeService.getData().subscribe(
      (res) => {
        console.log(res);

        this.data = res.data;
        this.filterSettings = {
          type: 'FilterBar',
          hierarchyMode: 'Parent',
          mode: 'Immediate',
        };
        // this.treegrid.refresh();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getColumnList() {
    this.homeService.getColumnData().subscribe(
      (res) => {
        console.log(res);
        this.dataColumn = res.data;
        this.createRowForm();
        console.log(this.dataColumn);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createColumn() {
    let payload = {};
    let apiObservable: Observable<any>;
    if (this.isEditColumn) {
      payload = {
        columnName: this.addColumnForm.value.columnName,
        metadata: {
          datatype: this.addColumnForm.value.datatype,
          minwidth: this.addColumnForm.value.minwidth,
          bgcolor: this.addColumnForm.value.bgcolor,
          color: this.addColumnForm.value.color,
          font: this.addColumnForm.value.font,
          alignment: this.addColumnForm.value.alignment,
          textwrap: this.addColumnForm.value.textwrap,
        },
      };
      apiObservable = this.homeService.editColumn(
        payload,
        this.addColumnForm.value.id
      );
    } else {
      payload = {
        columnName: this.addColumnForm.value.columnName,
        id: this.generateRandomID(),
        metadata: {
          datatype: this.addColumnForm.value.datatype,
          minwidth: this.addColumnForm.value.minwidth,
          bgcolor: this.addColumnForm.value.bgcolor,
          color: this.addColumnForm.value.color,
          font: this.addColumnForm.value.font,
          alignment: this.addColumnForm.value.alignment,
          textwrap: this.addColumnForm.value.textwrap,
        },
      };
      apiObservable = this.homeService.addColumn(payload);
    }
    apiObservable.subscribe(
      (res) => {
        console.log(res);
        this.addColumnForm.reset();
        this.addColumnDialog.hide();
        this.editColumnDialog.hide();
        this.isEditColumn = false;
        this.getColumnList();
        this.getDataList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createNewRow() {
    let payload: any = this.addRowForm.value;
    // {
    //   taskName: this.addRowForm.value.taskName,
    //   startDate: this.addRowForm.value.startDate,
    //   endDate: this.addRowForm.value.endDate,
    //   progress: this.addRowForm.value.progress,
    //   duration: this.addRowForm.value.duration,
    //   priority: this.addRowForm.value.priority,
    //   approved: this.addRowForm.value.approved,
    // };

    let apiObservable: Observable<any>;
    if (this.isEditRow) {
      let rowData = this.eventArgs.rowInfo.rowData;
      if (rowData && rowData.parentItem) {
        apiObservable = this.homeService.updateSubTaskData(
          rowData.parentItem['Task ID'],
          payload['Task ID'],
          payload
        );
      } else apiObservable = this.homeService.updateRowData(payload);
    } else if (this.isSubTask) {
      delete payload['Task ID'];
      apiObservable = this.homeService.postSubRowData(
        payload,
        this.parentTaskID
      );
    } else {
      delete payload['Task ID'];
      apiObservable = this.homeService.postRowData(payload);
    }
    apiObservable.subscribe(
      (res) => {
        console.log(res);
        this.getDataList();

        if (this.isSubTask) {
          this.addSubTaskDialog.hide();
        } else {
          this.addRowDialog.hide();
        }
        this.addRowForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  generateRandomID() {
    let randomId = new Date().getTime();
    return randomId;
  }

  onCancelClick() {
    this.columnIDToBeDeleted = null;
    this.addColumnForm.reset();
    this.addRowForm.reset();
    this.addColumnDialog.hide();
    this.addRowDialog.hide();
    // this.EditRowDialog.hide();
    this.editColumnDialog.hide();
    this.deleteColumnDialog.hide();
  }

  patchColumnValues(columnData: any) {
    this.addColumnForm.patchValue({
      id: columnData.id,
      color: columnData.metadata.color,
      columnName: columnData.columnName,
      datatype: columnData.metadata.datatype,
      font: columnData.metadata.font,
      bgcolor: columnData.metadata.bgcolor,
      alignment: columnData.metadata.alignment,
      textwrap: columnData.metadata.textwrap,
      minwidth: columnData.metadata.minwidth,
    });
  }
  patchRowValues(rowData: any) {
    this.addRowForm.patchValue(rowData);
  }

  deleteColumnClick() {
    if (this.columnIDToBeDeleted) {
      this.homeService.removeColumnData(this.columnIDToBeDeleted).subscribe(
        (res) => {
          console.log(res);
          this.getColumnList();
          this.getDataList();
          if (this.deleteColumnDialog) this.deleteColumnDialog.hide();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteRowClick(rowData: any) {
    if (rowData && rowData.parentItem) {
      this.homeService
        .deleteSubTaskData(rowData.parentItem['Task ID'], rowData['Task ID'])
        .subscribe(
          (res) => {
            console.log(res);
            this.getDataList();
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.homeService.deleteRowData(rowData['Task ID']).subscribe(
        (res) => {
          console.log(res);
          this.getDataList();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  contextMenuClick(args?: MenuEventArgs): void {
    if (args?.item.id === 'newcolumn') {
      this.eventArgs = args;
      this.header = 'Add Column';
      this.isEditColumn = false;
      this.addColumnDialog.show();
    } else if (args?.item.id === 'editcolumn') {
      this.isEditColumn = true;
      this.header = 'Edit Column';
      this.eventArgs = args;

      let fieldName = this.eventArgs.column.field;
      // console.log(this.columnId);
      let patchColumnData = this.dataColumn.filter(
        (item) => item.columnName == fieldName
      );
      if (patchColumnData.length > 0) {
        let columnData = patchColumnData[0];
        this.patchColumnValues(columnData);
      }
      this.editColumnDialog.show();
    } else if (args?.item.id === 'delcolumn') {
      this.eventArgs = args;
      let fieldName = this.eventArgs.column.field;
      let patchColumnData = this.dataColumn.filter(
        (item) => item.columnName == fieldName
      );
      if (patchColumnData.length > 0) {
        this.columnIDToBeDeleted = patchColumnData[0].id;
      }
      this.deleteColumnDialog.show();
    } else if (args?.item.id === 'choosecolumn') {
      this.toolbar = ['ColumnChooser'];
    } else if (args?.item.id === 'freezecolumn') {
      this.eventArgs = args;
      let fieldName = this.eventArgs.column.field;
      this.treegrid.grid.getColumnByField(fieldName).freeze = 'Left';
      this.treegrid.refreshColumns();
    } else if (args?.item.id === 'filtercolumn') {
      // this.filterData = true;
      // this.filterSettings = {
      //   type: 'FilterBar',
      //   hierarchyMode: 'Parent',
      //   mode: 'Immediate',
      // };
    } else if (args?.item.id === 'multisort') {
      // this.sorting = true;
    } else if (args?.item.id === 'addnext') {
      this.header = 'Add Row';
      this.isEditRow = false;
      this.isSubTask = false;
      this.addRowDialog.show();
    } else if (args?.item.id === 'addchild') {
      this.isSubTask = true;
      this.isEditRow = false;
      this.eventArgs = args;
      this.parentTaskID = this.eventArgs.rowInfo.rowData['Task ID'];
      this.addSubTaskDialog.show(); // sub task popup
    } else if (args?.item.id === 'deleterow') {
      this.isDeleteRow = true;
      this.eventArgs = args;
      let rowData = this.eventArgs.rowInfo.rowData;
      this.deleteRowClick(rowData);
    } else if (args?.item.id === 'editrow') {
      this.isEditRow = true;
      this.isSubTask = false;
      this.header = 'Edit Row';
      this.eventArgs = args;
      let rowData = this.eventArgs.rowInfo.rowData;
      this.patchRowValues(rowData);
      this.addRowDialog.show();
      // this.EditRowDialog.show();
    } else if (args?.item.id === 'multiselect') {
      this.selectionOptions = { type: 'Multiple' };
      // console.log(this.selectionOptions);
    } else if (args?.item.id === 'copyrows') {
    } else if (args?.item.id === 'cutrows') {
    } else if (args?.item.id === 'pastenext') {
      // var rowIndex = this.rowIndex;
      // var cellIndex = this.cellIndex;
    } else if (args?.item.id === 'pastechild') {
    }
  }

  public columnChange(e: ChangeEventArgs): void {
    let columnName: string = e.value as string;
    let column: Column = this.treegrid.grid.getColumnByField(columnName);
    let value: string = column.freeze === undefined ? 'Center' : column.freeze;
    this.refresh = this.directionDropDown.value === value;
    this.directionDropDown.value = value;
    // this.dataColumn[1].metadata.isFreeze = 'Left';
    this.dataColumn = this.dataColumn.map((item) => {
      if (item.columnName == columnName) {
        item.metadata.isFreeze = 'Left';
      }

      return item;
    });
    // // this.dataColumn[0].metadata.isFreeze = undefined
    // this.treegrid.grid.getColumnByField(this.dataColumn[2].columnName).freeze = 'Left'
    // this.treegrid.refreshColumns();
  }

  public directionChange(e: ChangeEventArgs): void {
    if (this.refresh) {
      let columnName: string = this.columnDropDown.value as string;
      let mvblColumns: Column[] = this.treegrid.grid.getMovableColumns();
      if (
        mvblColumns.length === 1 &&
        columnName === mvblColumns[0].field &&
        e.value !== mvblColumns[0].freeze
      ) {
        this.alertDialog.show();
        this.refresh = false;
        this.directionDropDown.value = 'Center';
        this.directionDropDown.refresh();
      } else {
        this.treegrid.grid.getColumnByField(columnName).freeze =
          e.value === 'Center' ? undefined : (e.value as any);
        this.dataColumn = this.dataColumn.map((item) => {
          if (item.columnName == columnName) {
            item.metadata.isFreeze =
              e.value === 'Center' ? undefined : (e.value as 'Left' | 'Right');
          }
          return item;
        });
        this.treegrid.refreshColumns();
      }
    }
    this.refresh = true;
  }

  // public columnChange(e: ChangeEventArgs): void {
  //   let columnName: string = e.value as string;
  //   let column: Column = this.treegrid.grid.getColumnByField(columnName);
  //   let value: string = column.freeze === undefined ? 'Center' : column.freeze;
  //   this.refresh = this.directionDropDown.value === value;
  //   this.directionDropDown.value = value;
  // }

  // public directionChange(e: ChangeEventArgs): void {
  //   if (this.refresh) {
  //     let columnName: string = this.columnDropDown.value as string;
  //     let mvblColumns: Column[] = this.treegrid.grid.getMovableColumns();
  //     if (
  //       mvblColumns.length === 1 &&
  //       columnName === mvblColumns[0].field &&
  //       e.value !== mvblColumns[0].freeze
  //     ) {
  //       this.alertDialog.show();
  //       this.refresh = false;
  //       this.directionDropDown.value = 'Center';
  //       this.directionDropDown.refresh();
  //     } else {
  //       this.treegrid.grid.getColumnByField(columnName).freeze =
  //         e.value === 'Center' ? undefined : (e.value as any);
  //       this.treegrid.refreshColumns();
  //     }
  //   }
  //   this.refresh = true;
  // }

  public alertDialogBtnClick = (): void => {
    this.alertDialog.hide();
  };

  public dlgButtons: ButtonPropsModel[] = [
    {
      click: this.alertDialogBtnClick.bind(this),
      buttonModel: { content: 'OK', isPrimary: true },
    },
  ];

  getfreeze(column: any) {
    return column.metadata.isFreeze ? column.metadata.isFreeze : undefined;
  }
}
