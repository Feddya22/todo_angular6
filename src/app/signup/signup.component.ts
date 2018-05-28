import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../_shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public messages: string;

  constructor(private authService: AuthServices, private router: Router) { }

  ngOnInit() {
  }

  registration(email: string, name: string, password: string) {
    this.authService.registration(email, name, password)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['login']);
        }
      }, error => {
        this.messages = 'This user is already exist';
      });
  }

}
