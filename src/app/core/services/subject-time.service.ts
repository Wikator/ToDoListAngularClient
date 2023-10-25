import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {Observable} from "rxjs";
import {SubjectTime} from "../models/subject-time/subject-time";
import {CreateUpdateSubjectTime} from "../models/subject-time/create-update-subject-time";

@Injectable({
  providedIn: 'root'
})
export class SubjectTimeService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = environment.baseApiUrl + 'subject_times/'

  getSubjectTimes(): Observable<SubjectTime[]> {
    return this.http.get<SubjectTime[]>(this.baseUrl);
  }

  updateSubjectTime(subjectTime: CreateUpdateSubjectTime): Observable<Object> {
    return this.http.put(this.baseUrl + subjectTime.id, subjectTime);
  }
}
