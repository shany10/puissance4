class Puissance_4 {

    constructor(position_x, position_y, p_1, p_2) {
        this.position_x = position_x;
        this.position_y = position_y;
        this.p_1 = p_1;
        this.p_2 = p_2;

        let puissance_4 = document.getElementById("puissance_4");
        let option = document.createElement("div");
        let container = document.createElement("div");

        option.id = "option";
        container.id = "container";

        puissance_4.append(option);
        puissance_4.append(container);
    }

    option() {

        let opt = document.getElementById("option");
        let div_p1 = document.createElement("div");
        let div_p2 = document.createElement("div");
        div_p1.id = "joueur_1";
        div_p2.id = "joueur_2";
        opt.append(div_p1);
        opt.append(div_p2);
        opt.style.display = "flex";
        // opt.style.justifyContent = "center";

        let joueur_1 = document.getElementById("joueur_1");
        let joueur_2 = document.getElementById("joueur_2");
        let paragraphe_1 = document.createElement("p");
        let paragraphe_2 = document.createElement("p");
        let score_p1 = document.createElement("p");
        let score_p2 = document.createElement("p");
        score_p1.id = "score_p1";
        score_p2.id = "score_p2";
        let select_1 = document.createElement("select");
        let select_2 = document.createElement("select");
        select_1.id = "p_1";
        select_2.id = "p_2";
        joueur_1.append(paragraphe_1);
        joueur_1.append(select_1);
        joueur_1.append(score_p1);
        joueur_1.style.textAlign = "center";
        joueur_2.append(paragraphe_2);
        joueur_2.append(select_2);
        joueur_2.append(score_p2);
        joueur_2.style.textAlign = "center";
        joueur_2.style.marginLeft = "auto";

        const paragraphe = opt.getElementsByTagName("p");
        paragraphe[0].innerText = "Joueur 1";
        paragraphe[1].innerText = 0;
        paragraphe[1].style.fontSize = "5vw";
        paragraphe[1].style.margin = "0px";
        paragraphe[1].style.color = "gray";
        paragraphe[2].innerText = "Joueur 2";
        paragraphe[3].innerText = 0;
        paragraphe[3].style.fontSize = "5vw";
        paragraphe[3].style.margin = "0px";
        paragraphe[3].style.color = "gray";

        let opt_p1 = document.getElementById("p_1");
        let opt_p2 = document.getElementById("p_2");
        let couleur = {
            defaut: "defaut", red: "rgb(255, 0, 0)",
            green: "rgb(0, 128, 0)",
            yellow: "rgb(255, 255, 0)",
            violet: "rgb(238, 130, 238)",
            gray: "rgb(128, 128, 128)",
            aquamarine: "rgb(127, 255, 212)",
            black: "rgb(0, 0, 0)",
            gold: "rgb(255, 215, 0)"
        };

        for (var key in couleur) {
            let option_1 = document.createElement("option");
            option_1.value = couleur[key];
            option_1.text = key;
            opt_p1.append(option_1);
            let option_2 = document.createElement("option");
            option_2.value = couleur[key];
            option_2.text = key;
            opt_p2.append(option_2);
        }
    }

    cercle() {
        //création des cercle par rapport au dimentions donner par l'utilisateur;
        let container = document.getElementById("container");
        for (let nbr_y = 0; nbr_y < this.position_y; nbr_y++) {
            const row = document.createElement("div");
            row.id = nbr_y;
            row.className = "row";
            container.append(row);
            let ligne = document.getElementById(nbr_y);

            for (let nbr_x = 0; nbr_x < this.position_x; nbr_x++) {

                const cercle = document.createElement("div");
                cercle.className = "cercle";
                cercle.id = nbr_y + "." + nbr_x;
                ligne.append(cercle);
            }
        }
        this.rond = container.getElementsByClassName("cercle");
    }

    game() {

        let opt = document.getElementById("option");
        const paragraphe = opt.getElementsByTagName("p");
        let opt_p1 = document.getElementById("p_1");
        let opt_p2 = document.getElementById("p_2");
        let pl_1 = "defaut";
        let pl_2 = "defaut";
        let message = "";

        opt_p1.addEventListener('change', choix_pl);
        opt_p2.addEventListener('change', choix_pl);
        let rond = this.rond;

        function choix_pl() {
            pl_1 = opt_p1.options[opt_p1.selectedIndex].value;
            pl_2 = opt_p2.options[opt_p2.selectedIndex].value;
            color_change();
            remove();
        }

        let score_1 = 0;
        let score_2 = 0;

        let bool = 0;
        let y = this.position_y;
        let x = this.position_x
        color_change();
        for (let i = 0; i < this.rond.length; i++) {
            let occurence = this.rond[i].id.split(".");
            let colonne = occurence[1]

            this.rond[i].addEventListener('click', position);

            function position() {
                afficher(colonne);
            }
        }

        function color_change() {
            if (pl_1 == "defaut" || pl_1 == undefined) {
                pl_1 = "rgb(255, 0, 0)";
            }

            if (pl_2 == "defaut" || pl_2 == undefined) {
                pl_2 = "rgb(255, 255, 0)";
            }
            paragraphe[0].style.color = pl_1;
            paragraphe[2].style.color = pl_2;
        }

        function afficher(colonne) {
            let count = 0;
            let couleur = pl_1;

            if (bool % 2 !== 0) {
                couleur = pl_2;
            }
            //inspecter chaque ligne et colonne pour voire si ils sont deja coloré
            for (let ligne = 0; ligne < y; ligne++) {

                let cercle = document.getElementById(ligne + "." + colonne);
                let color = window.getComputedStyle(cercle);
                color = color.getPropertyValue("background-color");

                //une fois que la colonne est joué;
                if (color !== "rgb(240, 248, 255)" && ligne == 0) {
                    return;
                }
                else if (color !== "rgb(240, 248, 255)" && count == 0 && ligne > 0) {

                    let select_cercle = document.getElementById(ligne - 1 + "." + colonne);
                    select_cercle.style.backgroundColor = couleur;
                    count++;
                    horizental(ligne - 1);
                    diagonale(ligne - 1, colonne);
                }
                //debut de chaque colonne 
                else if (ligne == y - 1 && count == 0) {
                    cercle.style.backgroundColor = couleur;
                    count++;
                    horizental(ligne);
                    diagonale(ligne, colonne);
                }
            }
            bool++;
            vertical(colonne);
        }

        function vertical(colonne) {

            let count_vertical = 0;
            let couleur = "";
            for (let ligne = 0; ligne < y; ligne++) {

                let cercle = document.getElementById(ligne + "." + colonne);
                let color = window.getComputedStyle(cercle);
                color = color.getPropertyValue("background-color");
                if (couleur == "" && color !== "rgb(240, 248, 255)") {
                    couleur = color;
                }
                if (couleur == color) {

                    count_vertical++;
                }
                else if (color !== "rgb(240, 248, 255)") {
                    count_vertical = 1;
                    couleur = color;
                }
                else {
                    count_vertical = 0;
                    couleur = "";
                }
                if (count_vertical == 4) {
                    if (couleur == pl_1) {
                        alert("joueur 1 gagner");
                        remove();
                        message = "player 1";
                        conteur(message);
                    };
                    if (couleur == pl_2) {
                        alert("joueur 2 gagner");
                        remove();
                        message = "player 2";
                        conteur(message);
                    }
                }
            }
        }

        function horizental(ligne) {
            let count_horizent = 0;
            let couleur = "";
            for (let colonne = 0; colonne < x; colonne++) {

                let cercle = document.getElementById(ligne + "." + colonne);

                let color = window.getComputedStyle(cercle);
                color = color.getPropertyValue("background-color");

                if (couleur == "" && color !== "rgb(240, 248, 255)") {
                    couleur = color;
                }
                if (couleur == color) {

                    count_horizent++;
                }
                else if (color !== "rgb(240, 248, 255)") {
                    count_horizent = 1;
                    couleur = color;
                }
                else {
                    count_horizent = 0;
                    couleur = "";
                }
                if (count_horizent == 4) {
                    if (couleur == pl_1) {
                        alert("joueur 1 gagné");
                        remove();
                        message = "player 1";
                        conteur(message)
                    };
                    if (couleur == pl_2) {
                        alert("joueur 2 gagner");
                        remove();
                        message = "player 2";
                        conteur(message);
                    }
                }

            }
        }

        function diagonale(ligne, colonne) {
            let count_diagonale = 0;
            let count_diagonale_inverser = 0;
            let couleur = "";
            let colonne_esc = 0;
            let colonne_desc = x - 1;
            let interval = y - ligne;

            for (let ligne = y - interval - colonne; ligne < y; ligne++) {

                if (ligne < 0) {
                    colonne_esc = colonne_esc - (ligne);
                    ligne = 0;
                }
                if (colonne_esc <= x - 1) {

                    let cercle = document.getElementById(ligne + "." + colonne_esc);
                    let color = window.getComputedStyle(cercle);
                    color = color.getPropertyValue("background-color");

                    if (couleur == "" && color !== "rgb(240, 248, 255)") {
                        couleur = color;
                    }
                    if (couleur == color) {
                        count_diagonale++;

                    }
                    else if (color !== "rgb(240, 248, 255)") {
                        count_diagonale = 1;
                        couleur = color;
                    }
                    else {
                        count_diagonale = 0;
                        couleur = ""
                    }

                    if (count_diagonale == 4) {
                        if (couleur == pl_1) {
                            alert("victoir pour le joueur 1");
                            remove();
                            message = "player 1";
                            conteur(message)
                        };
                        if (couleur == pl_2) {
                            alert("victoir pour le joueur 2");
                            remove();
                            message = "player 2";
                            conteur(message);
                        }
                    }
                    colonne_esc++
                }
            }
            colonne = x - 1 - colonne;

            for (let ligne = y - interval - colonne; ligne < y; ligne++) {
                if (ligne < 0) {
                    colonne_desc = colonne_desc + (ligne);
                    ligne = 0;
                }
                if (colonne_desc >= 0) {
                    let cercle = document.getElementById(ligne + "." + colonne_desc);
                    let color = window.getComputedStyle(cercle);
                    color = color.getPropertyValue("background-color");

                    if (couleur == "" && color !== "rgb(240, 248, 255)") {
                        couleur = color;
                    }
                    if (couleur == color) {
                        count_diagonale_inverser++;
                    }
                    else if (color !== "rgb(240, 248, 255)") {
                        count_diagonale_inverser = 1;
                        couleur = color;
                    }
                    else {
                        count_diagonale_inverser = 0;
                        couleur = ""
                    }
                    if (count_diagonale_inverser == 4) {
                        if (couleur == pl_1) {
                            alert("joueur 1 gagner");
                            message = "player 1";
                            remove();
                            conteur(message)
                        };
                        if (couleur == pl_2) {
                            alert("joueur 2 gagner")
                            message = "player 2"
                            remove();
                            conteur(message);
                        }
                    }
                    colonne_desc--;
                }
            }
        }

        function remove() {
            for (let i = 0; i < rond.length; i++) {

                rond[i].style.backgroundColor = "rgb(240, 248, 255)";
            }
        }
        function conteur(message) {
            if (message == "player 1") {
                score_1++;
                paragraphe[1].innerText = score_1;
            }
            else {
                score_2++;
                paragraphe[3].innerText = score_2;
            }
        }
    }
}

export { Puissance_4 };
