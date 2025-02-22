import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightHashtags'
})
export class HighlightHashtagsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    // Expression régulière pour détecter les hashtags et les envelopper dans un span
    return value.replace(/(#\w+)/g, '<span class="tag_anis">$1</span>');
  }
}
