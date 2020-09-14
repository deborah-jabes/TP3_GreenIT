# TP3_GreenIT
TP3 GreenIT esaip 2020

<h1>TP3 GreenIT</h1>

<p>Nous avons créé un site qui permet de rechercher des élèves parmi les différentes promotions de l'Esaip, en local.</p><br>
<p>Il repose sur une base de données MongoDB Atlas et fonctionne en local. Il se présente sous la forme q'une application NodeJS à lancer avec la commande "node searchEngine.js".</p><br>

<p>Cet outil de recherche fonctionne en entrant le nom, le prénom et la promotion d'un élève existant dans la base de données MongoDB (exemple : Zurie Trottier en IR3). <br>
A la suite de cela, un tableau est renvoyé, contenant toutes les entrées correspondantes aux champs saisis (sous forme d'un tableau, créé à partir du document renvoyé par la méthode find() de MongoDB)</p>

<p>Une gestion des erreurs a aussi été implémentée, empêchant l'utilisateur de taper n'importe quoi</p>
