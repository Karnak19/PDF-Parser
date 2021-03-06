module.exports = class ParseCoord{

    static coordToHeure(coordX, addHour){
        return secondesToHeure(getSecondesByCoord(coordX), addHour)
    }
    
}

/**
 * Fonction permettant de récupérer la minute la plus proche dans l'ensemble (0,15,30,45,60) de la minute passée
 * @param {*} min La minute que l'on cherche a récupérer de manière normalisée
 */
function getClosest(min){
    minutes = [0, 15, 30, 45, 60]

    closest = 0
    lastCalc = 60
    minutes.forEach(function(elem){
        //On cherche la distance la plus courte avec la minute passée
        if(Math.abs(elem - min) < lastCalc){
            lastCalc = Math.abs(elem - min)
            closest = elem
        }
    })
    return closest
}

/**
 * Permet de transformer un temps en seconde au format HH:MM
 * @param {*} secondes Le temps en seconde à transformer
 */
function secondesToHeure(secondes, addHour){
    let hour  = Math.floor(secondes / 3600)
    let min = Math.floor((secondes - (hour * 3600)) / 60)
    
    min = getClosest(min)
    hour += addHour
    //Si on a 60 c'est qu'on a une heure de plus
    if(min == 60){
        hour++
        min = 0
    }
    if(hour < 10){hour = `0${hour}`}
    if(min  < 10){min  = `0${min }`}

    return `${hour}:${min}`
}

/**
 * Permet de transformer une coordonnée en temps en seconde
 * @param {*} coordX La coordonnée à transformer
 */
function getSecondesByCoord(coordX){
    //On gère nos exceptions 
    if(coordX > 221-3 && coordX < 221+3){return 35100}
    if(coordX > 359-3 && coordX < 367+3){return 43200}
    if(coordX > 422-3 && coordX < 422+3){return 48600}
    if(coordX > 439-3 && coordX < 439+3){return 49500}
    if(coordX > 597-3 && coordX < 597+3){return 57600}
    
    //Sinon on utilise une fonction polynomiale de degrès 4
    return  0.00000019513359 * Math.pow(coordX, 4)
            + (-0.0003723993) * Math.pow(coordX, 3)
            + 0.2325723439 * Math.pow(coordX, 2)
            + 7.6856610283 * coordX + 25028.095126
}