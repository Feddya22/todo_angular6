import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../_shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public messages: string;

  constructor(private authService: AuthServices, private router: Router) { }

  ngOnInit() {
    this.authService.logout();
  }

  login(email: string, password: string) {
    this.authService.login(email, password)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/dashboard/projects']);
        }
      }, error => {
        this.messages = 'Auth is failed';
      });
  }

}
