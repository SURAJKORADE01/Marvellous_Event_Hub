import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class EventService {

  private _eventsUrl = "http://localhost:3000/api/events";
  private _eventUrlDatabase = "http://localhost:3000/events";

  private _specialEventsUrl = "http://localhost:3000/api/special";
  private _specialEventUrlDatabase = "http://localhost:3000/special";

  private _admissionUrl = "http://localhost:3000/takeadmission";
  private _oldAdmissionUrl = "http://localhost:3000/oldadmission";

  constructor(private http: HttpClient) { }

  getEvents() : any {
    return this.http.get<any>(this._eventsUrl)
  }

  getEventsFromDatabase() : any
  { 
    return this.http.get<any>(this._eventUrlDatabase)
  }

  takeAdmission(data : any)
  {
    return this.http.post<any>(this._admissionUrl,data);
  }

  getSpecialEvents() : any {
    return this.http.get<any>(this._specialEventsUrl)
  }

  getSpecialEventFromDatabase() : any
  {
    return this.http.get<any>(this._specialEventUrlDatabase);
  }

  takeAdmissionSpecial(data : any)
  {
    return this.http.post<any>(this._oldAdmissionUrl,data);
  }
}
