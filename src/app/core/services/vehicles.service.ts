import { inject, Injectable, signal } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { from, switchMap, catchError, of, map, Observable } from 'rxjs';
import { Vehicle } from '../../shared/models/vehicle.interface';

@Injectable({ providedIn: 'root' })
export class VehiclesService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  private readonly _vehicles = signal<Vehicle[]>([]);
  readonly vehicles = this._vehicles.asReadonly();

  constructor() {
    authState(this.auth).pipe(
      switchMap(user => {
        if (!user) {
          this._vehicles.set([]);
          return of([] as Vehicle[]);
        }

        const collRef = collection(this.firestore, `users/${user.uid}/vehicles`);
        const q = query(collRef, orderBy('createdAt', 'desc'));

        return (collectionData(q, { idField: 'id' }) as Observable<any[]>).pipe(
          map(docs => docs.map(doc => this.convertTimestamps(doc) as Vehicle))
        );
      }),
      catchError(err => {
        console.error('Error loading vehicles (auth switch)', err);
        return of([] as Vehicle[]);
      })
    ).subscribe(vehicles => {
      this._vehicles.set(vehicles);
    });
  }

  private convertTimestamps(data: any): Vehicle {
    return {
      ...data,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt
    } as Vehicle;
  }

  addVehicle(vehicle: Partial<Vehicle>) {
    const user = this.auth.currentUser;
    if (!user) return from(Promise.reject(new Error('Not authenticated')));

    const collRef = collection(this.firestore, `users/${user.uid}/vehicles`);
    const payload = {
      ...vehicle,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    return from(addDoc(collRef, payload)).pipe(
      catchError(err => { console.error('addVehicle error', err); throw err; })
    );
  }

  updateVehicle(vehicleId: string, partial: Partial<Vehicle>) {
    const user = this.auth.currentUser;
    if (!user) return from(Promise.reject(new Error('Not authenticated')));

    const docRef = doc(this.firestore, `users/${user.uid}/vehicles/${vehicleId}`);
    const payload = { ...partial, updatedAt: serverTimestamp() };
    return from(updateDoc(docRef, payload)).pipe(
      catchError(err => { console.error('updateVehicle error', err); throw err; })
    );
  }

  removeVehicle(vehicleId: string) {
    const user = this.auth.currentUser;
    if (!user) return from(Promise.reject(new Error('Not authenticated')));

    const docRef = doc(this.firestore, `users/${user.uid}/vehicles/${vehicleId}`);
    return from(deleteDoc(docRef)).pipe(
      catchError(err => { console.error('removeVehicle error', err); throw err; })
    );
  }
}
