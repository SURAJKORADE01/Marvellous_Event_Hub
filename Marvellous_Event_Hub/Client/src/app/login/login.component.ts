import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone : false
})

export class LoginComponent implements OnInit 
{

  loginForm!: FormGroup;

  constructor(private _auth: AuthService,private _router: Router, private formBuilder : FormBuilder) 
  {

  }

  ngOnInit() 
  {
    this.loginForm = this.formBuilder.group({
      email : ['',[Validators.required]],
      password : ['',Validators.required],
    })
  }

  public CheckCredentials()
  {
    if(this.loginForm.value.email == "")
    {
      alert("Please enter your email address.");
      return;
    }

    else if(this.loginForm.value.password == "")
    {
      alert("Please enter password.");
      return;
    }

    if(this.loginForm.valid)
    {
      const {email,password} = this.loginForm.value;

      this._auth.VerifyCredentials(email,password).subscribe((res) => {
        console.log("Response received : ",res);
  
        if(res.token)
        {
          localStorage.setItem('token', res.token)
          this._router.navigate(['/special']) 
        }
  
        else
        {
          console.error("No token received.");
          alert("Invalid email or password.");
        }
      }, 
      (error) => {
        console.error('Error verifying credentials:', error);
        alert("Error occurred while verifying credentials.");
      });
    }

    else
    {
      alert('Please fix the validation errors.')
    }
  }

  loginUser () 
  {
    // this._auth.loginUser(this.loginUserData)
    // .subscribe(
    //   res => {
        // localStorage.setItem('token', res.token)
        // this._router.navigate(['/special'])
    //   },
    //   err => console.log(err)
    // ) 
  }
}
