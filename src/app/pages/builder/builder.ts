import { Component, Renderer2 } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray
} from '@angular/cdk/drag-drop';

interface FormField {
  label: string;
  type: string;
  value?: string;
}

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, CdkDropList, CdkDrag, TitleCasePipe],
  templateUrl: './builder.html',
  styleUrls: ['./builder.css']
})
export class BuilderComponent {
  constructor(private renderer: Renderer2) {}

  availableFields: FormField[] = [
    { label: 'Full Name', type: 'text' },
    { label: 'Email Address', type: 'email' },
    { label: 'Password', type: 'password' },
    { label: 'Phone Number', type: 'tel' },
    { label: 'Message', type: 'text' },
    { label: 'Date of Birth', type: 'date' }
  ];

  formFields: FormField[] = [];
  isDarkMode = false;

  drop(event: CdkDragDrop<FormField[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      return;
    }

    if (
      event.previousContainer.data === this.availableFields &&
      event.container.data === this.formFields
    ) {
      const draggedField = event.previousContainer.data[event.previousIndex];

      this.formFields.splice(event.currentIndex, 0, {
        ...draggedField,
        value: ''
      });
    }
  }

  deleteField(index: number): void {
    this.formFields.splice(index, 1);
  }

  getFieldIcon(type: string): string {
    const icons: { [key: string]: string } = {
      text: '📝',
      email: '📧',
      password: '🔒',
      tel: '📞',
      number: '🔢',
      date: '📅'
    };
    return icons[type] || '📝';
  }

  previewForm() {
    console.log('Form Data:', this.formFields);
    alert(`Form has ${this.formFields.length} fields ready!`);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  updateColor(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--header-start', color);
    document.documentElement.style.setProperty(
      '--header-end',
      this.adjustBrightness(color, -20)
    );
  }

  adjustBrightness(color: string, amount: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * amount);
    const r = (num >> 16) + amt;
    const g = ((num >> 8) & 0x00ff) + amt;
    const b = (num & 0x0000ff) + amt;

    return (
      '#' +
      (
        0x1000000 +
        (r < 255 ? (r < 1 ? 0 : r) : 255) * 0x10000 +
        (g < 255 ? (g < 1 ? 0 : g) : 255) * 0x100 +
        (b < 255 ? (b < 1 ? 0 : b) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }
}