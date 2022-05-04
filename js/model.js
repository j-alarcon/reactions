export class Reaction{
    constructor(name, origin, advantages, weaknesses){
        this.name = name;
        this.origin = origin;
        this.advantages = advantages;
        this.weaknesses = weaknesses;
    }

    get getName(){
        return this.name;
    }

    get getOrigin(){
        return this.origin;
    }

    get getAdvantages(){
        return this.advantages;
    }

    get getWeaknesses(){
        return this.weaknesses;
    }
}
