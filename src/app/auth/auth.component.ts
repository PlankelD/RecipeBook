import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { AuthResponseData, AuthService } from "./auth.service";
import { PlaceholderDirective} from '../shared/placeholder/placeholder.directive'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  auth: FormGroup
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

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
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

   // this.auth.reset();

  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
  // here i use that resolver to get access to a component factory
  private showErrorAlert(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
      const hostViewContainerRef = this.alertHost.viewContainerRef;
      hostViewContainerRef.clear();

     const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

     componentRef.instance.message = message;
     this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
     });
  }

}
