export class Reaction{
    constructor(name, img, origin, advantages, weaknesses){
        this.name = name;
        this.img = img;
        this.origin = origin;
        this.advantages = advantages;
        this.weaknesses = weaknesses;
    }

    get getName(){
        return this.name;
    }

    get getImg(){
        return this.img;
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
