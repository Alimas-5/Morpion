
                var pions = document.getElementById("jeu").children; // nos boutons
                var joueurs = [
                    {
                        id:'poisson',
                        icon: '<img src="images/iconfinder_fish_5404332.svg" alt="fish">'
                    }, {
                        id:'chat',
                        icon: '<img src="images/iconfinder_039_026_cat_black_witch_halloween_3792014.svg" alt="fish">'
                    }
                ];
                var wins = [
                    [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]
                ]
                var currentTurn = 1; // le tour du joueur
                var jeuestfinit = false; // si le jeux est finit
                var afficheur = document.querySelector("#jeuStatus"); // permet un nouvelle affichage
                
                

            function estValide(button){
                return button.innerHTML.length == 0; // retourne si il y a quelque chose dans les cases.
            }

            function setSymbol(btn, symbole){
                console.log('Setting symbole');
                console.log(btn);
                btn.innerHTML = symbole; //mettre le symbole de l'utillisateur.
            }
           
            function rechercherVainqueur(pions, joueurs, currentTurn){  //retourne true si une solution vainqueur est trouvé
                
                for(win of wins) {
                    var success = true;
                    for(cell of win) {
                        success = success && (pions[cell].innerHTML == joueurs[currentTurn].icon);
                    }
                    if(success){
                        return true;
                    }
                }
            }

            function TableauEstPlein(pions){ // vérifie si le tableau est plein
                for(var i = 0, len = pions.length; i < len; i++){
                    if(pions[i].innerHTML.length == 0)
                        return false;
                }
                return true;
            }

            
            
            function userClick() {
                if(jeuestfinit) // retourne false si le jeux est finit.
                return;

                if (!estValide(this)){
                    afficheur.innerHTML ="Déplacement invalide !";
                } else{
                    setSymbol(this, joueurs[currentTurn].icon);

                    jeuestfinit = rechercherVainqueur(pions, joueurs, currentTurn);

                    //Le jeu est finit (Quelqu'un a gagné)
                    if(jeuestfinit){
                        afficheur.innerHTML = "Joueur " + joueurs[currentTurn].id + " à gagné !";
                        return;
                    }
                    //Le jeu est finit (Match nul)
                    if(TableauEstPlein(pions)){
                        afficheur.innerHTML = "Match null !!";
                        return;
                    }
                    //Le jeu n'est pas encore fini
                    currentTurn++;//1//2
                    currentTurn = currentTurn % 2;//1//0
                    afficheur.innerHTML = "Joueur " + joueurs[currentTurn].id + " à votre tour !"; // affiche le tour du joueur en question.
                }
            }

            function main() { // fonction principale
                afficheur.innerHTML = "Le jeu peut démarrer. <br/> Joueur " + joueurs[currentTurn].id + " C'est votre tour."; // envoyer ce message pour l'afficher

                for(var i = 0, len = pions.length; i < len; i++){
                    pions[i].addEventListener("click", userClick);
                }
            }
            main();
        