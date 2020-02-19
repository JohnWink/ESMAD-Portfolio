/**
 * class model of a city
 */
export default class City {
    constructor(name, zone, date,upload, iddate, level, comments, faves,cover,brasao,link,desc,gallery,map) {
        this.name = name
        this.zone = zone
        this.date = date
        this.upload = upload
        this.iddate = iddate    // when a new city created it will be given an id number the newer the city the later the number     
        this.level = level
        this.comments = comments
        this.faves = faves
        this.cover = cover
        this.brasao = brasao
        this.link = link
        this.desc = desc
        this.gallery = gallery
        this.map = map       
        
        
    }
    

    //############### comparison filter fuctions############

    //######### ALphabetic Filters
    // Compare 2 cities. This is for the alphabetic order from A to Z
    static compareAZ(cityA, cityB) {
        if (cityA.name < cityB.name)
            return -1;
        if (cityA.name > cityB.name)
            return 1;
        return 0;
    }

    // Compare 2 cities. This is for the alphabetic order from Z to A
    static compareZA(cityA, cityB) {
        if (cityA.name > cityB.name)
            return -1;
        if (cityA.name < cityB.name)
            return 1;
        return 0;
    }


    //########### Most Liked Filter
    static compareLikes(cityA, cityB) {
        if (cityA.faves > cityB.faves)
            return -1;
        if (cityA.faves < cityB.faves)
            return 1;
        return 0;
    }

    //############ Most Commented Filter
    static compareComment(cityA, cityB) {
        if (cityA.comments > cityB.comments)
            return -1;
        if (cityA.comments < cityB.comments)
            return 1;
        return 0;
    }

    //########### Most Recent
    static compareRecent(cityA, cityB) {
        if (cityA.iddate > cityB.iddate)
            return -1;
        if (cityA.iddate < cityB.iddate)
            return 1;
        return 0;
    }


}