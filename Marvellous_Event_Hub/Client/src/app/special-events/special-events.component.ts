import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  standalone : false
})

export class SpecialEventsComponent implements OnInit 
{  
  formValue!: FormGroup;
  events : any[] = [];
  data : any[];
  selectedBatch : string = "";

  specialEvents : any[] = []

  constructor(private _eventService: EventService,
              private _router: Router, private formBuilder : FormBuilder) { }

  ngOnInit() 
  {
    this.formValue = this.formBuilder.group({
      first: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      last: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      mobile: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      email: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      rid : ['',[Validators.required]]
    })

    this._eventService.getSpecialEventFromDatabase()
      .subscribe(
        res => this.specialEvents = res,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

  resetForm()
  {
    this.formValue.reset();
  }

  public batchName(eventName : any)
  {
    this.selectedBatch = eventName;
  }

  Register()
  {
    if(this.formValue.value.first == "")
    {
      alert("Please enter your name.")
      return;
    }

    else if(this.formValue.value.last == "")
    {
      alert("Please enter last name.")
      return;
    }

    else if(this.formValue.value.email == "")
    {
      alert("Please enter your email address.")
      return;
    }

    else if(this.formValue.value.mobile == "")
    {
      alert("Please enter your mobile number.")
      return;
    }

    else if(this.formValue.value.rid == "")
    {
      alert("Please enter your previous registration id.");
      return;
    }

    else
    {
      this.data = [this.formValue.value.first,this.formValue.value.last,this.formValue.value.email,this.formValue.value.mobile,this.formValue.value.rid,this.selectedBatch];
      
      this._eventService.takeAdmissionSpecial(this.data).subscribe(res => {
        alert("You have successfully registered for the " + this.selectedBatch + " event."); 
        this.formValue.reset();
        
      }, err=>{
        console.log(err);
        alert("Registration failed.");
      })
    }
  }
}
