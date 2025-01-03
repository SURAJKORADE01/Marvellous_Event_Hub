import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  standalone : false
})
export class EventsComponent implements OnInit 
{
  formValue!: FormGroup;
  events : any[] = [];
  data : any[];
  selectedBatch : string = "";

  constructor(private _eventService: EventService, private formBuilder : FormBuilder) { }

  ngOnInit() 
  {
    this.formValue = this.formBuilder.group({
      first: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      last: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      mobile: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      email: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]]
    })

    this._eventService.getEventsFromDatabase()
      .subscribe(
        res => this.events = res,
        err => console.log(err)
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

    else
    {
      this.data = [this.formValue.value.first,this.formValue.value.last,this.formValue.value.email,this.formValue.value.mobile,this.selectedBatch];

      this._eventService.takeAdmission(this.data).subscribe(res => {
        alert("You have successfully registered for the " + this.selectedBatch + " event."); 
        this.formValue.reset();
        
      }, err=>{
        console.log(err);
        alert("Registration failed.");
      })
    }
  }
}
