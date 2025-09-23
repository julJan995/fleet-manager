import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../../shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  $user = user(this.firebaseAuth);
  currentUserSig = signal<User | null | undefined>(undefined);

  constructor() { }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(response =>
      updateProfile(response.user, {displayName: username})
    );

    return from(promise) as Observable<void>;
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password).then(() => {});

    return from(promise);
  }
}
