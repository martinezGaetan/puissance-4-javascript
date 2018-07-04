var Plateau = {
    init: function () {
        this.plateau = [];
        document.getElementById("victoire").style.visibility = "hidden";
    },

    creer: function (largeur = 7, hauteur = 6) {
        this.hauteur = hauteur;
        this.largeur = largeur;
        this.plateau = new Array();


        for (var i = 0; i < this.hauteur; i++) {
            this.plateau[i] = new Array();
        };
        for (var i = 0; i < this.hauteur; i++) {
            for (var j = 0; j < this.largeur; j++) {
                this.plateau[i][j] = 0;
            }
        };

        return this.plateau
    },


    affichage: function () {

        for (var i = 0; i < this.plateau.length; i++) {
            index_ = i
            var baliseP = document.createElement("p");
            baliseP.id = 'balise' + i

            document.getElementById("plateau").appendChild(baliseP)

            for (var j = 0; j < this.plateau[i].length; j++) {
                jIndex_ = j
                console.log(this.plateau[i][j])
                var monImage = document.createElement("img");
                monImage.type = 'img';
                monImage.id = 'monImage' + index_ + jIndex_;
                monImage.name = 'monImage';
                monImage.value = jIndex_;
                monImage.src = 'vide.png';

                // monImage.value = plateau[i][j];

                // console.log(monImage)

                var case_ = document.getElementById(baliseP.id);
                case_.appendChild(monImage);
                monImage.addEventListener('click', function () {
                    document.getElementById("erreur").style.visibility = "hidden";
                    var colonne = parseInt(this.value);
                    partie.init(colonne, plato);
                    partie.numeroLigne();

                    if (partie.getjoue() != "Ko") {
                        var rslt = joueur.change(numJoueur, nbJoueurs);
                        var currentJoueur = rslt[0];
                        numJoueur = rslt[1];

                        console.log(currentJoueur);
                        console.log(colonne)

                        var ligne = partie.setjoue(numJoueur);
                        console.log(plato.plateau[ligne][colonne])

                        var monImage = document.getElementById('monImage' + ligne + colonne)
                        if (plato.plateau[ligne][colonne] == 1) {
                            monImage.src = 'jaune.png';
                        } else {
                            if (plato.plateau[ligne][colonne] == 2) {
                                monImage.src = 'rouge.png';
                            }
                        };
                        compteur = partie.verif();
                        partie.victoire(compteur);
                    }
                });
            };
        };
    },

}

var Partie = {

    init: function (colonne, plateau) {
        this.plato1 = plateau
        this.colonne = colonne;
        this.ligne = -1;
    },

    numeroLigne: function () {
        for (var vligne = 0; vligne < this.plato1.plateau.length; vligne++) {
            if (this.plato1.plateau[vligne][this.colonne] == 0) {
                this.ligne = this.ligne + 1;
            };

        };
        return this.ligne
    },
    getjoue: function () {
        // plato.plato1.affichage();
        // this.ligne = parseInt(this.numeroLigne());
        if (this.ligne <= -1) {
            var controle = "Ko"
            document.getElementById("erreur").style.visibility = "visible";
            console.log("colonne pleine");
        }
        return controle
    },
    setjoue: function (valeur) {
        // plato.plato1.affichage();
        // this.ligne = parseInt(this.numeroLigne());
        if (this.ligne > -1) {
            this.plato1.plateau[this.ligne][this.colonne] = valeur;
        }
        return this.ligne
    },

    sens: function (d) {


    },

    verif: function () {
        var direction = [[0, -1], [-1, 0], [-1, 1], [-1, -1]];
        var curentCase = [this.ligne, this.colonne];
        var compteur = 1;
        var largeur = this.plato1.largeur;
        var hauteur = this.plato1.hauteur;
        var plat = this.plato1.plateau;
        sens = 2

        for (var dir = 0; dir < direction.length; dir++) {
            var d = direction[dir]
            for (var s = 0; s < sens; s++) {
                for (var i = 0; i < d.length; i++) {
                    d[i] = d[i] * -1;
                };

                for (var icurrent = 1; icurrent < 5; icurrent++) {
                    var c1 = curentCase[0] + d[0] * icurrent;
                    var c2 = curentCase[1] + d[1] * icurrent;
                    var verifCase = [c1, c2];

                    var condition1 = "Ok";
                    for (var i = 0; i < verifCase.length; i++) {
                        var v = verifCase[i];
                        if (v < 0 || v >= hauteur) {
                            condition1 = "Ko";
                        }
                    }
                    console.log(condition1, c2)
                    if (condition1 == "Ok" && plat[this.ligne][this.colonne] == plat[c1][c2]) {
                        compteur += 1;
                    } else {
                        break;
                    }
                }
            }
            if (compteur >= 4) {
                break;
            }
            else {
                compteur = 1;
            }
        };
        return compteur
    },

    victoire: function (compteur) {
        if (compteur == 4) {
            console.log("victoire");
            document.getElementById("victoire").style.visibility = "visible";
            
        }
    },


}

var Joueur = {
    change: function (numJoueur, nbJoueurs) {
        if (numJoueur < nbJoueurs) {
            currentJoueur = "joueur" + String(numJoueur + 1)
            numJoueur += 1
        } else {
            currentJoueur = "joueur" + String(1)
            numJoueur = 1
        }
        rslt = [currentJoueur, numJoueur]
        return rslt
    }
}

// tour: function(){






// }
// },

var plato = Object.create(Plateau);
var joueur = Object.create(Joueur);
var partie = Object.create(Partie);

plato.init();
plato.creer();
console.log(plato);
var numJoueur = 0;
var nbJoueurs = 2;
var compteur = 0;
plato.affichage();
