import {Pipe, PipeTransform, Injectable} from '@angular/core';


@Pipe({
    name: "SearchQuestionPipe"
})

export class SearchQuestionPipe implements PipeTransform {

    transform(value, term) {
        if (term == null) {
            return value;
        }
        return value.filter((item) => {
          if (item.title)
          return item.title.includes(term) ||
					item.title.toUpperCase().includes(term.toUpperCase()) ||
					item.title.toLowerCase().includes(term.toLowerCase())
          else
          return item
      });
    }
}
