import { Injectable } from '@angular/core';
import {
  Firestore,
  DocumentReference,
} from '@angular/fire/firestore';
import { SnackbarService } from '../snackbar/snackbar.service';
import { FirestoreServiceBase } from '../common/firestore-service-base';
import { Category } from '../../models/cathory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends FirestoreServiceBase<Category> {
  constructor(
    fire: Firestore,
    private snackbarService: SnackbarService,
  ) {
    super(fire, 'cathegories');
  }

  override add(category: Category) {
    const returnValue = super.add(category);
    returnValue.subscribe({
      complete: () => this.snackbarService.open('Category created'),
      error: (error) => this.errorHandler(error),
    });

    return returnValue;
  }

  override update(reference: DocumentReference<Category>, category: Category) {
    const returnValue = super.update(reference, category);
    returnValue.subscribe({
      complete: () => this.snackbarService.open('Category updated'),
      error: (error) => this.errorHandler(error),
    });
    return returnValue;
  }

  private errorHandler(error: any) {
    this.snackbarService.open(`Error: ${error.message}`);
  }

  // eslint-disable-next-line class-methods-use-this
  public getSpendBudget() {
    return 69;
  }

  // public getSpendBudgetByCategory(categoryId : string) {
  //   return this.transactionService.getRealTime().pipe(map((transactions) => {
  //     let spendBudget = 0;
  //     transactions.forEach((transaction) => {
  //       if (transaction.categoryId === categoryId) {
  //         spendBudget += transaction.amount;
  //       }
  //     });
  //     return spendBudget;
  //   }));
  // }
}
