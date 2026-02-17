import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/event.model';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(events: Event[] | null, category: string): Event[] {
    if (!events || !category || category === 'All') return events || [];
    return events.filter(event => event.category === category);
  }
}