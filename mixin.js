'use strict';

const MathematicsTalent = {
    add(a, b) {
        return a + b;
    }
};

class MathematicsTalentObj {
    add(a, b) {
        return a + b;
    }
}

class UserWithParent extends MathematicsTalentObj {
    constructor () {
        super();
    }

    addThreeNumbers(a, b, c) {
        return this.add(this.add(a, b), c);
    }
}

class UserWithComposition {
    constructor () {
        this.talent = new MathematicsTalentObj();
    }

    addThreeNumbers(a, b, c) {
        return this.talent.add(this.talent.add(a, b), c);
    }
}

class UserWithMixin {
    constructor () {}

    addThreeNumbers(a, b, c) {
        return this.add(this.add(a, b), c);
    }
}

Object.assign(UserWithMixin.prototype, MathematicsTalent);
let userWithMixin = new UserWithMixin();
// console.log(userWithMixin.add(1, 2));
console.log(userWithMixin.addThreeNumbers(1, 2, 3));
