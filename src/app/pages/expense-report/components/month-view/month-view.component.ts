import { Transaction } from 'src/app/core/models/transaction';
import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { Required } from 'src/app/core/decorators/required-input';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss'],
})
export class MonthViewComponent {
  constructor(
    public categoryService: CategoryService,
  ) {}

  @Input() @Required public transactions!: Transaction[];

  @Output() deleteTransaction = new EventEmitter<Transaction>();

  delete(transaction: Transaction) {
    this.deleteTransaction.emit(transaction);
  }
}
