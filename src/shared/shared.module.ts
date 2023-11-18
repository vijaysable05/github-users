import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    NavBarComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [],
  exports: [
    NavBarComponent,
    UserInfoComponent,
    MaterialModule
  ]
})
export class SharedModule { }
