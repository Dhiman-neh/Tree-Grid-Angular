import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeService } from './home.service';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { ColorPickerModule, NumericTextBoxAllModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TreeGridAllModule,
    BrowserModule,
    DropDownListAllModule,
    MultiSelectAllModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ButtonAllModule,
    TextBoxModule,
    ColorPickerModule, NumericTextBoxAllModule,
    DatePickerModule,
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
