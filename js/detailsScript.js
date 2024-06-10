async function fetchAthleteId(id) {
    try {
        const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao obter dados do atleta: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

if (sessionStorage.getItem('Logged')) {
    const urlParams = new URLSearchParams(window.location.search);
    const athleteId = urlParams.get('id');

    if (athleteId) {
        fetchAthleteId(athleteId).then(player => {
            if (player) {
                buildCard(player);
            } else {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Atleta não encontrado';
                document.body.appendChild(errorMessage);
            }
        }).catch(error => {
            console.error('Erro ao buscar atleta:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Atleta não encontrado';
            document.body.appendChild(errorMessage);
        });
    }

    const buildCard = (player) => {
        const container = document.createElement('div');
        container.classList.add('container');
        document.body.appendChild(container);

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        container.appendChild(imageContainer);

        const photo = document.createElement('img');
        photo.src = player.imagem;
        photo.alt = `Foto de ${player.nome}`;
        imageContainer.appendChild(photo);

        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');
        container.appendChild(textContainer);

        const name = document.createElement('h3');
        name.textContent = player.nome;
        textContainer.appendChild(name);

        const position = document.createElement('p');
        position.textContent = player.posicao;
        textContainer.appendChild(position);

        const birth = document.createElement('p');
        birth.textContent = player.nascimento;
        textContainer.appendChild(birth);

        const cast = document.createElement('p');
        cast.textContent = player.elenco;
        textContainer.appendChild(cast);

        const height = document.createElement('p');
        height.textContent = player.altura;
        textContainer.appendChild(height);

        const description = document.createElement('p');
        description.textContent = player.detalhes;
        textContainer.appendChild(description);

        const games = document.createElement('p');
        games.textContent = player.n_jogos;
        textContainer.appendChild(games);

        const buttonBack = document.createElement('button');
        buttonBack.innerHTML = 'Voltar';
        buttonBack.onclick = () => {
            window.location.href = '../main.html';
        }
        textContainer.appendChild(buttonBack)

        const buttonExit = document.createElement('button');
        buttonExit.innerHTML = 'Sair';
        buttonExit.onclick = () => {
            sessionStorage.removeItem('Logged');
            window.location.href = '../index.html';
        }
        textContainer.appendChild(buttonExit)
        };

} else {
    window.location.href = '../index.html';
}