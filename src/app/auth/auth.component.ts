import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  auth: FormGroup

  constructor(private authService: AuthService){}

  // reverse the value: if this previously stored true, then not true will be false and therfore we now store false
  //                    if this stored false, then not false will be true and we now store true
  onSwitchMode (){
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(){
    this.auth = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(7)])
    });
  }

  onSubmit(){
    //console.log(this.auth);
    if (!this.auth.valid){
      return;
    }
    const email = this.auth.value.email;
    const password = this.auth.value.password;

    let authObs: Observable<AuthResponseData>

    this.isLoading = true;

    if(this.isLoginMode) {
      authObs = this.authService.login(email,password);
    }else {
      authObs = this.authService.signup(email,password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

   // this.auth.reset();
  }
}
