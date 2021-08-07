import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    // LayoutRoutingModule,
    RouterModule.forChild([])
  ],
  exports:[MainComponent]
})
export class LayoutModule { }
