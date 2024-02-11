import { BookEditComponent } from './book-edit/book-edit.component';
// modal.service.ts
import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private overlay: Overlay) {}

  openEditForm(book: any): void {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });

    const editPortal = new ComponentPortal(BookEditComponent);
    const componentRef = overlayRef.attach(editPortal);
    componentRef.instance.book = book; // Pass the book data to the component

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach();
    });
  }
}
