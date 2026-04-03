import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

interface FormField {
  label: string;
  type: string;
  value?: string;
}

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, CdkDropList, CdkDrag],
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
    } else {
      const item = event.previousContainer.data[event.previousIndex];

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if (event.container.data === this.formFields) {
        this.formFields[event.currentIndex] = {
          ...item,
          value: ''
        };
      }
    }
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
    document.documentElement.style.setProperty('--header-end', color);
  }
}