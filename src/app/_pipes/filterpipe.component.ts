import {Pipe, PipeTransform} from "@angular/core";


@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
    public transform(values:any[], filter:string):any[] {
        if (!values || !values.length) return [];
        if (!filter) return values;

        return values.filter(v => v.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
    }
}

@Pipe({name: 'vacancyFilter'})
export class VacancyFilterPipe implements PipeTransform {
    public transform(values:any[], filter:string):any[] {
        if (!values || !values.length) return [];
        if (!filter) return values;

        return values.filter(v => v.posting_title.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
    }
}

@Pipe({name: 'vacancyPostedByFilter'})
export class VacancyPostedByFilterPipe implements PipeTransform {
    public transform(values:any[], filter:string):any[] {
        if (!values || !values.length) return [];
        if (!filter) return values;

        return values.filter(v => v.created_by.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
    }
}