$(document).ready(function(){ 
$('#bouton').click(function(){
$('#txt').toggle();
});
var pions = document.getElementById("jeu").children; // nos boutons
var joueurs = [
    {
    id:'Poisson',
    icon: '<img class="icon_poisson" src="images/poisson_clown.png" alt="fish">'
    }, {
    id:'Chat',
    icon: '<img class="icon_chi" src="images/chi.png" alt="cat">'
    },
    {
    id:'Chien',
    icon: '<img class="icon_chien" src="images/chien.jpg" alt="chien">'
    }
];
var wins = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [0,5,10,15],
    [3,6,9,12]
]
var currentTurn = 1; // le tour du joueur
var jeuEstFini = false; // si le jeux est finit
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

function tableauEstPlein(pions){ // vérifie si le tableau est plein
for(var i = 0, len = pions.length; i < len; i++){
    if(pions[i].innerHTML.length == 0)
        return false;
}
return true;
}


function userClick() {
if(jeuEstFini) // retourne false si le jeux est finit.
return;

if (!estValide(this)){
    afficheur.innerHTML ="Déplacement invalide !";
} else{
    setSymbol(this, joueurs[currentTurn].icon);

    jeuEstFini = rechercherVainqueur(pions, joueurs, currentTurn);

    //Le jeu est finit (Quelqu'un a gagné)
    if(jeuEstFini){
        afficheur.innerHTML = "Joueur " + joueurs[currentTurn].id + " à gagné !";
        return;
    }
    //Le jeu est finit (Match nul)
    if(tableauEstPlein(pions)){
        afficheur.innerHTML = "Match null !!";
        return;
    }
    //Le jeu n'est pas encore fini
    currentTurn++;//1//2
    currentTurn = currentTurn % joueurs.length;//1//0
    afficheur.innerHTML = "Joueur " + joueurs[currentTurn].id + " à votre tour !"; // affiche le tour du joueur en question.
}
}

function main() { // fonction principale
afficheur.innerHTML = "Le jeu peut démarrer. <br/> Joueur " + joueurs[currentTurn].id + " c'est votre tour."; // envoyer ce message pour l'afficher

for(var i = 0, len = pions.length; i < len; i++){
    pions[i].addEventListener("click", userClick);
}
}

main();

});