import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  private setCurrentUser(): void {
    const item = localStorage.getItem('user');
    console.log(item);
    if (item) {
      const user: User = JSON.parse(item)
      const token = JSON.parse(atob(user.token.split('.')[1]));
      console.log(token.exp * 1000);
      if (token.exp * 1000 > Date.now()) {
        this.accountService.setCurrentUser(JSON.parse(item));
      } else {
        localStorage.removeItem('user');
      }
    }
  }
}
