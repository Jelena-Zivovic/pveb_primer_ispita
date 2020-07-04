import { Step } from './step.model';

export class Goal {
    constructor(
        public _id: string,
        public naziv: string,
        public opis: string,
        public vaznost: number,
        public koraci: Step[]
    ) 
    {}
}
