import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserHist } from 'src/shared/interfaces';
import { LocalStorageService } from 'src/shared/services/localstorage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  userHists!: UserHist[];
 
  constructor(
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
   this.getData();
  }

  getData(): void {
    this.userHists = this.localStorageService.get('hist');
  }

  openErrorSnackBar(err: any): void {
    this.snackBar.open(typeof err === 'string' ? err :
      err.error && err.error.message ? err.error.message :
        err.error.error ? err.error.error.message :
          err.message ? err.message : 'Something went wrong', 'Dismiss',
      { duration: 3000 }
    );
  }

  clearHistory() {
    this.localStorageService.remove('hist');
    this.getData();
  }
}
