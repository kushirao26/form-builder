import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.css']
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;

  // ✅ Accessibility improvement
  @Input() ariaLabel?: string;

  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event): void {
    // ✅ Prevent unwanted form submission when disabled/loading
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.onClick.emit(event);
  }

  getButtonClasses(): string {
    const classes = ['btn', `btn-${this.variant}`];

    if (this.fullWidth) {
      classes.push('btn-full-width');
    }

    if (this.loading) {
      classes.push('btn-loading');
    }

    if (this.disabled) {
      classes.push('btn-disabled');
    }

    return classes.join(' ');
  }
}