import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Subject} from "../models/subject";
import {Observable} from "rxjs";
import {SubjectTime} from "../models/subject-time/subject-time";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl: string = environment.baseApiUrl + 'subjects/';
  private http: HttpClient = inject(HttpClient);


  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.baseUrl);
  }

  getSubject(id: string | number): Observable<Subject> {
    return this.http.get<Subject>(this.baseUrl + id);
  }

  getSubjectTimes(id: string | number): Observable<SubjectTime[]> {
    return this.http.get<SubjectTime[]>(this.baseUrl + id + '/subject_times');
  }

  create(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.baseUrl, subject);
  }

  update(subject: Subject): Observable<Object> {
    return this.http.put(this.baseUrl + subject.id, subject);
  }

  delete(id: string | number): Observable<Object> {
    return this.http.delete(this.baseUrl + id);
  }
}
