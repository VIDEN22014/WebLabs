
function triangle(value1, params1, value2, params2) {
    let a, b, c, alpha, beta, isWrongParams, isWrongValues

    //Params Check
    if (params1 == "leg") {//Leg
        a = value1
        if (params2 == "leg") {
            b = value2
        }
        else if (params2 == "hypotenuse") {
            c = value2
        }
        else if (params2 == "adjacent angle") {
            beta = value2
        }
        else if (params2 == "opposite angle") {
            alpha = value2
        }
        else {
            isWrongParams = true
        }
    }
    else if (params1 == "hypotenuse") {//Hypotenuse
        c = value1
        if (params2 == "leg") {
            a = value2
        }
        else if (params2 == "angle") {
            alpha = value2
        }
        else {
            isWrongParams = true
        }
    }
    else if (params1 == "adjacent angle") {//adjacent angle
        beta = value1
        if (params2 == "leg") {
            a = value2
        }
        else {
            isWrongParams = true
        }
    }
    else if (params1 == "opposite angle") {//opposite angle
        alpha = value1
        if (params2 == "leg") {
            a = value2
        }
        else {
            isWrongParams = true
        }
    }
    else if (params1 == "angle") {//angle
        alpha = value1
        if (params2 == "hypotenuse") {
            c = value2
        }
        else {
            isWrongParams = true
        }
    }
    else {//is params1 Worng
        console.log("Неправильні параметри, уважно прочитайте інструкцію");
        return "failed"
    }
    if (isWrongParams) {//is params2 Worng
        console.log("Неправильні параметри, уважно прочитайте інструкцію");
        return "failed"
    }

    //Values Check
    if (!value1 || !value2) {
        console.log("Значення не введене");
        return "Undefined input"
    }
    if (value1 <= 0 || value2 <= 0) {
        console.log("Значення менше або рівне нулю");
        return "Zero or negative input"
    }
    if (typeof value1 === 'string' || typeof value2 === 'string') {
        console.log("Значення введене як текст");
        return "text input"
    }
    if (params1.includes("angle")) { if (checkAngles(value1)) { return isWrongValues } }
    if (params2.includes("angle")) { if (checkAngles(value2)) { return isWrongValues } }

    if (params1 == "leg" && params2 == "hypotenuse") { if (checkLegs(value1)) { return isWrongValues } }
    if (params1 == "hypotenuse" && params2 == "leg") { if (checkLegs(value2)) { return isWrongValues } }


    //Triangle processing
    if (a && b) twoLegs();
    else if (a && c) b = legHypotenuse(a, c)
    else if (b && c) a = legHypotenuse(b, c)
    else if (alpha && a) [b, beta] = legOpposite(a, alpha)
    else if (alpha && b) [a, beta] = legAdjacent(b, alpha)
    else if (alpha && c) {
        beta = 90 - alpha;
        [a, b] = hypotenuseAngle(alpha, beta)
    }
    else if (beta && c) {
        alpha = 90 - beta;
        [a, b] = hypotenuseAngle(alpha, beta)
    }
    else if (beta && a) [b, alpha] = legAdjacent(a, beta)
    else if (beta && b) [a, alpha] = Leg_angle(b, beta)
    else console.log("Error");

    return displayTriangle();




    //Functions
    function twoLegs() {//Два катети
        c = Math.pow(Math.pow(a, 2) + Math.pow(b, 2), 0.5)
        findAlphaBeta(a, b)
    }
    function legHypotenuse(leg, hypotenuse) {//Катет і гіпотенуза
        let otherLeg = Math.pow(Math.pow(hypotenuse, 2) - Math.pow(leg, 2), 0.5)
        findAlphaBeta(leg, otherLeg)
        return otherLeg
    }
    function legAdjacent(leg, angle) {//Катет і прилеглий кут
        c = leg / Math.cos(toRad(angle))
        return [legHypotenuse(leg, c), 90 - angle]
    }
    function legOpposite(leg, angle) {//Катет і протилежний кут
        c = leg / Math.sin(toRad(angle))
        return [legHypotenuse(leg, c), 90 - angle]
    }
    function hypotenuseAngle(angleA, angleB) {//Гіпотенуза і гострий кут
        return [c * Math.sin(toRad(angleA)), c * Math.sin(toRad(angleB))]
    }
    function findAlphaBeta(a, b) {
        alpha = toDegrees(Math.atan(a / b))
        beta = 90 - alpha
    }
    function toDegrees(rad) {
        return (rad * 180) / Math.PI
    }
    function toRad(degrees) {
        return (degrees * Math.PI) / 180
    }


    function checkAngles(angle) {
        if (angle >= 90) {
            console.log("Не гострий кут");
            isWrongValues = "not acute angle"
            return isWrongValues
        }
    }
    function checkLegs(leg) {
        if (leg >= c) {
            console.log("Катет більший за гіпотенузу");
            isWrongValues = "leg is bigger or equal hypotenuse"
            return isWrongValues
        }
    }

    function displayTriangle() {
        console.log("a = " + a.toFixed(3));
        console.log("b = " + b.toFixed(3));
        console.log("c = " + c.toFixed(3));
        console.log("alpha = " + alpha.toFixed(3));
        console.log("beta = " + beta.toFixed(3));
        return "success"
    }



}

let instruction = `
Інструкція:

Параметр      Що Означає
 leg              катет
 hypotenuse       гіпотенуза
 adjacent angle   прилеглий до катета кут
 opposite angle   протилежний до катета кут
 angle            один з двох гострих кутів (коли задана гіпотенуза)
Приклад використання: triangle(2,"leg",2,"leg")
`
console.log(instruction);