import {
  collection, Firestore, DocumentData, CollectionReference, collectionData,
  QueryConstraint, query, doc, DocumentReference, docData, addDoc, updateDoc, deleteDoc,
} from '@angular/fire/firestore';
import {
  defer, from, Observable, switchMap,
} from 'rxjs';
import { ModelBase } from '../../models/model-base';

export abstract class FirestoreServiceBase<Model extends ModelBase> {
  protected readonly collection: CollectionReference<Model>;

  constructor(
    fire: Firestore,
    collectionName: string,
    ...pathSegments: string[]
  ) {
    this.collection = collection(
      fire,
      collectionName,
      ...pathSegments,
    ) as CollectionReference<Model>;
  }

  getRealTime(...predicates: QueryConstraint[]) {
    return collectionData(
      query(
        this.collection,
        ...predicates,
      ),
      {
        idField: 'id',
      },
    );
  }

  getDoc(id: string): Observable<DocumentReference<Model>> {
    return defer(async () => doc(this.collection, id));
  }

  add(model: Model): Observable<DocumentReference<Model>> {
    // eslint-disable-next-line no-param-reassign
    delete model.id;
    return from(addDoc(this.collection, model));
  }

  get(id: string): Observable<Model> {
    return this.getDoc(id).pipe(switchMap((ref) => docData(ref, { idField: 'id' })));
  }

  // eslint-disable-next-line class-methods-use-this
  update(reference: DocumentReference<Model>, model: Model) {
    // eslint-disable-next-line no-param-reassign
    delete model.id;
    return from(updateDoc(reference, model as DocumentData));
  }

  // eslint-disable-next-line class-methods-use-this
  delete(reference: DocumentReference<Model>) {
    return from(deleteDoc(reference));
  }
}
