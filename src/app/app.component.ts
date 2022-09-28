import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // or whatever filename
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userform: FormGroup;
  listUser: any;
  isUpdated: boolean = false;

  private baseURL = 'http://localhost:8000';

  ngOnInit() {
    this.userform = this.fb.group({
      first_name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      user_id: [],
    });

    // get all users
    this.getAlldata();
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.listUser = [];
    this.userform = this.fb.group({
      first_name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      user_id: [],
    });
  }

  get _fc() {
    return this.userform.controls;
  }

  submit(data: any) {
    if (!this.isUpdated) {
      this.http.post(`${this.baseURL}/users`, data).subscribe((_result) => {
        this.listUser.push(this.userform.value);
        this.isUpdated = false;
      });
    } else {
      this.http.put(`${this.baseURL}/users/${data.user_id}`, data).subscribe((_result) => {
        const index = this.listUser.findIndex((x: any) => x.user_id === data.user_id);
        this.listUser[index] = _result;
        this.isUpdated = false;
      });
    }
  }

  getAlldata() {
    this.http.get(`${this.baseURL}/users`).subscribe((res) => {
      this.listUser = res;
    });
  }

  editUser(id: any) {
    if (id) {
      this.isUpdated = true;
      const item = this.listUser.find((x: any) => x.user_id === id);
      Object.keys(item).forEach((key) => {
        this.userform.controls[key].setValue(item[key]);
      });
    }
  }

  deleteUser(id: any) {
    var result = confirm('Want to delete?');
    if (id && result) {
      this.listUser = this.listUser.filter((x: any) => x.user_id !== id);
      this.http.delete(this.baseURL + '/user/' + id).subscribe((res) => {
        alert(res);
      });
    }
  }

  reset() {
    this.userform.reset();
    this.isUpdated = false;
  }
}
