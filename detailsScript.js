async function fetchAthleteId(id) {
    let athleteData;
    try {
      const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
      athleteData = await response.json();
      // Verifique se a resposta indica erro
      if (!athleteData.id) {
        // O atleta não foi encontrado, lance um erro para tratar no bloco .catch
        throw new Error(athleteData); 
      }
    } catch (error) {
      console.warn('Erro ao obter dados do jogador:', error);
      athleteData = null;
    }
    return athleteData;
  };
  
  if (sessionStorage.getItem('Logged')) {
    const urlParams = new URLSearchParams(window.location.search);
    const athleteId = urlParams.get('id'); // Obtém o ID do atleta da URL
  
    if (athleteId) {
      fetchAthleteId(athleteId) // Busca dados do atleta
        .then(athlete => {
          // Agora o código funciona corretamente porque `buildCard` só é chamado se o atleta existe
          buildCard(athlete);
        })
        .catch(error => { 
          // Limpa o conteúdo do body antes de adicionar a mensagem
          document.body.innerHTML = '';
  
          let warningContent = document.getElementById('warning');
          if (!warningContent) {
              warningContent = document.createElement('div');
              warningContent.id = 'warning';
              document.body.appendChild(warningContent);
          }
  
          document.body.appendChild(warningContent)
          const message = document.createElement('h1');
          message.innerHTML = 'Atleta não encontrado.'; 
          warningContent.appendChild(message);
  
          const buttonBack = document.createElement('button');
          buttonBack.innerHTML = 'Voltar';
          buttonBack.onclick = () => {
          window.location.href = 'main.html'
          }
          warningContent.appendChild(buttonBack)
        });
    }
  
    const buildCard = (athlete) => {
      // Cria o container principal
      const container = document.createElement('div');
      container.classList.add('container');
      document.body.appendChild(container);
  
      // Cria o container da imagem
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      container.appendChild(imageContainer);
  
      // Cria a imagem
      const photo = document.createElement('img');
      photo.src = athlete.imagem;
      photo.alt = `Foto de ${athlete.nome}`;
      imageContainer.appendChild(photo);
  
      // Cria o container do texto
      const textContainer = document.createElement('div');
      textContainer.classList.add('text-container');
      container.appendChild(textContainer);
  
      // Cria os elementos de texto
      const name = document.createElement('h3');
      name.textContent = athlete.nome;
      textContainer.appendChild(name);
  
      const position = document.createElement('p');
      position.textContent = athlete.posicao;
      textContainer.appendChild(position);
  
      const birth = document.createElement('p');
      birth.textContent = athlete.nascimento;
      textContainer.appendChild(birth);
  
      const cast = document.createElement('p');
      cast.textContent = athlete.elenco;
      textContainer.appendChild(cast);
  
      const height = document.createElement('p');
      height.textContent = athlete.altura;
      textContainer.appendChild(height);
  
      const description = document.createElement('p');
      description.textContent = athlete.detalhes;
      textContainer.appendChild(description);
  
      const games = document.createElement('p');
      games.textContent = athlete.n_jogos;
      textContainer.appendChild(games);
  
      // Cria o botão "Voltar"
      const buttonBack = document.createElement('button');
      buttonBack.innerHTML = 'Voltar';
      buttonBack.onclick = () => {
        window.location.href = 'main.html';
      };
      textContainer.appendChild(buttonBack);
  
      // Cria o botão "Sair"
      const buttonExit = document.createElement('button');
      buttonExit.innerHTML = 'Sair';
      buttonExit.onclick = () => {
        sessionStorage.removeItem('Logged'); // Remove a informação de login
        window.location.href = 'index.html'; // Redireciona para a página de login
      };
      textContainer.appendChild(buttonExit);
    };
  
  } else {
    // Cria um elemento de aviso para informar que o usuário precisa fazer o login
    document.body.innerHTML = ''; // Limpa o conteúdo da página
    const warningContent = document.getElementById('warning') || document.createElement('div');
    warningContent.id = 'warning';
    document.body.appendChild(warningContent);
  
    const message = document.createElement('h1');
    message.innerHTML = 'Faça o Login para acessar esta página.';
    warningContent.appendChild(message);
  
    // Cria um botão "Login"
    const buttonLogin = document.createElement('button');
    buttonLogin.innerHTML = 'Login';
    buttonLogin.onclick = () => {
      window.location.href = 'index.html'; 
    };
    warningContent.appendChild(buttonLogin);
  }