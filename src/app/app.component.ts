import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface FormField {
  label: string;
  type: string;
  value?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-20px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(20px)', opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent {
  fields: FormField[] = [];
  showToast = false;
  toastMessage = '';

  newField = {
    label: '',
    type: 'text'
  };

  addField(): void {
    if (this.newField.label && this.newField.label.trim()) {
      this.fields.push({ 
        label: this.newField.label, 
        type: this.newField.type,
        value: '' 
      });
      this.newField.label = '';
      this.showToastMessage(`✨ "${this.newField.label || 'Field'}" added successfully!`);
    }
  }

  deleteField(index: number): void {
    const deletedField = this.fields[index];
    this.fields.splice(index, 1);
    this.showToastMessage(`🗑️ "${deletedField.label}" removed`);
  }

  submitForm(): void {
    const formValues = this.fields.map(field => ({
      label: field.label,
      type: field.type,
      value: field.value
    }));
    
    console.log('Form Submitted:', formValues);
    this.showToastMessage('🎉 Form submitted successfully! Check console for details.');
  }

  getFieldTypes(): number {
    const types = new Set(this.fields.map(f => f.type));
    return types.size;
  }

  getFieldIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'text': '📝',
      'email': '📧',
      'password': '🔒',
      'tel': '📞',
      'number': '🔢',
      'date': '📅'
    };
    return icons[type] || '📝';
  }

  showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }
}