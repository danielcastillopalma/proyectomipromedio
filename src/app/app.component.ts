import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { SqliteService } from './services/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private database: SqliteService) {
    this.initApp();
  }
  async initApp(){
    await this.database.crearBD();
    

  }
}
