import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserHist } from 'src/shared/interfaces';
import { HttpService } from 'src/shared/services/http.service';
import { LocalStorageService } from 'src/shared/services/localstorage.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  form!: FormGroup;
  user!: User;
  userHists: UserHist[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.form = this.fb.group({
      name: ''
    })
    this.getData();
  }

  getData(): void {
    const values = this.localStorageService.get('hist');
    if (values) this.userHists = values;
  }

  onSubmit(): void {
    const value = this.form.getRawValue();
    if (!value.name) return;
    this.http.getUsers(value.name).subscribe({
      next: (data: User) => {
        if (data) {
          this.user = data;
          const userStored = this.formatUser(value.name, data);
          this.setSuccessData(userStored)
        } else {
          this.setNotFoundData(value.name)
        }
        this.getData()
      },
      error: (err) => {
        if (err && err.error.message === 'Not Found') {
          this.setNotFoundData(value.name)
        }
        this.openErrorSnackBar(err)
      }
    })
  }

  setSuccessData(user: UserHist): void {
    if (this.userHists.length) {
      this.localStorageService.set('hist', [user, ...this.userHists])
    } else {
      this.localStorageService.set('hist', [user])
    }
  }

  setNotFoundData(key: string): void {
    this.localStorageService.set('hist', [{ searchTerm: key }, ...this.userHists])
  }

  formatUser(key: string, user: User): UserHist {
    return {
      searchTerm: key,
      user: {
        login: user.login,
        html_url: user.html_url,
        avatar_url: user.avatar_url
      }
    }
  }

  openErrorSnackBar(err: any): void {
    this.snackBar.open(typeof err === 'string' ? err :
      err.error && err.error.message ? err.error.message :
        err.error.error ? err.error.error.message :
          err.message ? err.message : 'Something went wrong', 'Dismiss',
      { duration: 3000 }
    );
  }

}
