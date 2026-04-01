import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display.html',
  styleUrls: ['./display.css']
})
export class DisplayComponent {
  @Input() title: string = '';
  @Input() variant: 'info' | 'success' | 'error' | 'warning' = 'info';
  @Input() show: boolean = true;

  getVariantClass(): string {
    return `display-${this.variant}`;
  }
}