const commandInput = document.getElementById('command-input');
const outputDiv = document.getElementById('output');

const suggestionBox = document.createElement('div');
suggestionBox.id = "suggestions";
suggestionBox.style.color = "#888";
suggestionBox.style.fontSize = "14px";
commandInput.parentNode.appendChild(suggestionBox);


function printOutput(text) {
  outputDiv.innerHTML += `<div>${text}</div>`;
  outputDiv.scrollTop = outputDiv.scrollHeight;
}


const commands = [
  'cd projets',
  'cd formations',
  'cd contacter',
  'cd accueil',
  'cat prologin',
  'cat pacman',
  'cat plateforme',
  'cat proxmox',   
  'cat chronia',
  'mail ',
  '/dark',
  '/light',
  'help',
  'clear'
];


function executeCommand(command) {
  command = command.trim();
  suggestionBox.innerHTML = "";

  if (command === 'clear') {
  outputDiv.innerHTML = '';
  suggestionBox.innerHTML = '';
  return;
}

  if (command.startsWith('/')) {
    switch (command) {
      case '/light':
        document.body.classList.remove("theme-dark");
        document.body.classList.add("theme-light");
        printOutput("Thème clair activé");
        break;

      case '/dark':
        document.body.classList.remove("theme-light");
        document.body.classList.add("theme-dark");
        printOutput("Thème sombre activé");
        break;

      default:
         window.location.href = 'animation.html';
    }
    return;
  }


  if (command.startsWith('cd')) {
    switch (command) {
      case 'cd projets':
        window.location.href = 'MesProjets.html';
        break;
      case 'cd formations':
        window.location.href = 'MesFormations.html';
        break;
      case 'cd contacter':
        window.location.href = 'MeContacter.html';
        break;
      case 'cd accueil':
      case 'cd':
        window.location.href = 'index.html';
        break;
      default:
        window.location.href = 'animation.html';
    }
    return;
  }


  if (command.startsWith('cat ')) {
    const subject = command.slice(4).trim();

    switch (subject) {
      case 'prologin':
        printOutput("Prologin est un concours informatique que j'ai suivi en 2023. Il consiste en plusieurs épreuves où les participants doivent résoudre des problèmes complexes de programmation et de réflexion tels que des CTF, tri, recherche, parcours. Pour ma part j'ai réussi à me qualifier aux régionales auxquelles j'ai participé mais je n'ai pas réussi à me qualifier pour les finales");
        break;
      case 'pacman':
        printOutput("Le jeu Pacman que j'ai créé avec un ami est une version simple en pyhton où le joueur doit naviguer dans un labyrinthe pour collecter des points tout en évitant des fantômes. le jeu ainsi que les images et animations ont été faites par un ami et moi à l'aide de piskel");
        break;
      case 'plateforme':
        printOutput("Le jeu de plateforme est un projet en python où le joueur doit sauter entre différentes plateformes tout en évitant des obstacles et pièges. De plus des cases permettent de dash, nous avons également intégrer une fonction pour créer son propre niveau et plusieurs checkpoints. Les animations et images ont également été faites par nos soins");
        break;
      case 'proxmox':
  	printOutput("J'ai réalisé un cluster Proxmox avec plusieurs machines virtuelles interconnectées. J'ai mis en place un pare-feu avec des règles de sécurité, développé des scripts d'installation automatisée de VM ainsi que des scripts de test des règles du pare-feu. J'ai également configuré une DMZ pour isoler certains services et déployé un outil de surveillance nommé Nagios afin de monitorer l'infrastructure.");
  	break;

      case 'chronia':
  	printOutput("Chronia est une application web que j'ai développée permettant la gestion d'un emploi du temps et des rendez-vous pour une personne âgée afin de l'aider au quotidien. J'ai également intégré un chatbot capable de répondre à des questions en s'appuyant sur une base de données de médicaments et d'informations associées. Il pouvait répondre à des questions comme : 'j'ai mal à la tête, que prendre ?', ou encore 'j'ai déjà pris ce médicament il y a 3h, puis-je en reprendre ?', ainsi que fournir des recommandations de dosage en fonction du poids et des intervalles de prise.");
  	break;

      default:
       window.location.href = 'animation.html';
    }
    return;
  }


  if (command.startsWith('mail')) {
    const userEmail = command.slice(4).trim();

    if (userEmail) {
      const mailtoLink = `mailto:kiliozzi@yahoo.fr?subject=${encodeURIComponent("Message de " + userEmail)}&body=${encodeURIComponent("Envoyé par : " + userEmail)}`;

      printOutput(`<a href="${mailtoLink}" target="_blank">Envoyer un mail</a> (${userEmail})`);

      window.location.href = mailtoLink;
    } else {
      printOutput('Utilisation : mail votre@email.com');
    }
    return;
  }


  if (command === 'help') {
    printOutput(`Commandes : cd, cat, mail, /dark, /light, clear, tab pour auto-complétion`);
    return;
  }

  window.location.href = 'animation.html';
}


let history = [];
let historyIndex = 0;

commandInput.addEventListener('keydown', function(event) {

  if (event.key === 'Enter') {
    event.preventDefault();

    const command = commandInput.value;

    if (command.trim() !== '') {
      history.push(command);
      historyIndex = history.length;
    }

    executeCommand(command);
    commandInput.value = '';
  }


  if (event.key === 'ArrowUp') {
    event.preventDefault();

    if (historyIndex > 0) {
      historyIndex--;
      commandInput.value = history[historyIndex];
    }
  }


  if (event.key === 'ArrowDown') {
    event.preventDefault();

    if (historyIndex < history.length - 1) {
      historyIndex++;
      commandInput.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      commandInput.value = '';
    }
  }

  if (event.key === 'Tab') {
    event.preventDefault();

    const current = commandInput.value;

    const matches = commands.filter(cmd => cmd.startsWith(current));

    if (matches.length === 1) {
      commandInput.value = matches[0];
      suggestionBox.innerHTML = "";
    } else if (matches.length > 1) {
      suggestionBox.innerHTML = "Suggestions : " + matches.join(' | ');
    }
  }
});
