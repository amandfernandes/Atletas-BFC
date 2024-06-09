if (sessionStorage.getItem('Logged')) {
    let data = null;

    async function loadData(url) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Erro ao buscar dados: ${response.status}`);
            }

            data = await response.json();

            if (data) {
                container.innerHTML = '';
                data.forEach(player => {
                    buildCard(player);
                });
            } else {
                console.error("Erro ao obter dados");
                container.innerHTML = "Erro ao carregar dados.";
            }
        } catch (error) {
            console.error("Erro:", error);
            container.innerHTML = "Ocorreu um erro ao carregar os dados.";
        }
    }

    const header = document.createElement('header')
    document.body.appendChild(header)

    const container = document.createElement('section');
    document.body.appendChild(container);

    const title = document.createElement('h1');
    title.innerHTML = 'Atletas Botafogo';
    header.appendChild(title);

    const buttonAll = document.createElement('button');
    buttonAll.innerHTML = "All";
    buttonAll.onclick = () => {
        handleClick('all');
    };

    const buttonMasculino = document.createElement('button');
    buttonMasculino.innerHTML = "Masculino";
    buttonMasculino.onclick = () => {
        handleClick('masculino');
    };

    const buttonFeminino = document.createElement('button');
    buttonFeminino.innerHTML = "Feminino";
    buttonFeminino.onclick = () => {
        handleClick('feminino');
    };

    const buttonCast = document.createElement('div');
    buttonCast.appendChild(buttonAll);
    buttonCast.appendChild(buttonMasculino);
    buttonCast.appendChild(buttonFeminino);
    header.appendChild(buttonCast);

    function handleClick(gender) {
        container.innerHTML = '';
        const url = `https://botafogo-atletas.mange.li/2024-1/${gender}`;
        loadData(url);
    }

    const buttonPositionAll = document.createElement('button')
    buttonPositionAll.innerHTML = "All";
    buttonPositionAll.onclick = () => {
        if (data) {
            container.innerHTML = '';
            data.forEach(player => {
                buildCard(player);
            });
        }
    };

    const buttonGoleiro = document.createElement('button');
    buttonGoleiro.innerHTML = "Goleiro(a)";
    buttonGoleiro.onclick = () => {
        if (data) {
            const playerFiltered = data.filter(player =>
                player.posicao.toLowerCase().includes('goleiro'.toLowerCase()) ||
                player.posicao.toLowerCase().includes('goleira'.toLowerCase())
            );
            container.innerHTML = '';
            playerFiltered.forEach(player => {
                buildCard(player);
            });
        }
    };

    const buttonAtacante = document.createElement('button');
    buttonAtacante.innerHTML = "Atacante";
    buttonAtacante.onclick = () => {
        if (data) {
            const playerFiltered = data.filter(player => 
                player.posicao.toLowerCase().includes('atacante'.toLowerCase())
            );
            container.innerHTML = '';
            playerFiltered.forEach(player => {
                buildCard(player);
            });
        }
    };

    const buttonLateralRight = document.createElement('button');
    buttonLateralRight.innerHTML = "Lateral Direita";
    buttonLateralRight.onclick = () => {
        if (data) {
            const playerFiltered = data.filter(player => 
                player.posicao.toLowerCase().includes('lateral direito'.toLowerCase()) || 
                player.posicao.toLowerCase().includes('lateral direita'.toLowerCase())
            );
            container.innerHTML = '';
            playerFiltered.forEach(player => {
                buildCard(player);
            });
        }
    };

    const buttonLateralLeft = document.createElement('button');
    buttonLateralLeft.innerHTML = "Lateral Esquerda";
    buttonLateralLeft.onclick = () => {
        if (data) {
            const playerFiltered = data.filter(player => 
                player.posicao.toLowerCase().includes('lateral esquerdo'.toLowerCase()) 
                || player.posicao.toLowerCase().includes('lateral esquerda'.toLowerCase())
            );
            container.innerHTML = '';
            playerFiltered.forEach(player => {
                buildCard(player);
            });
        }
    };

    const buttonZagueiro = document.createElement('button');
    buttonZagueiro.innerHTML = "Zagueiro(a)";
    buttonZagueiro.onclick = () => {
        if (data) {
            const playerFiltered = data.filter(player =>
                player.posicao.toLowerCase().includes('zagueiro'.toLowerCase()) ||
                player.posicao.toLowerCase().includes('zagueira'.toLowerCase())
            );
            container.innerHTML = '';
            playerFiltered.forEach(player => {
                buildCard(player);
            });
        }
    };

    const buttonMeioCampista = document.createElement('button');
    buttonMeioCampista.innerHTML = "Meio-Campista";
    buttonMeioCampista.onclick = () => {
        if (data) {
            const playerFiltered = data.filter(player => 
                player.posicao.toLowerCase().includes('meio-campista'.toLowerCase())
            );
            container.innerHTML = '';
            playerFiltered.forEach(player => {
                buildCard(player);
            });
        }
    };

    const buttonPosition = document.createElement('div');
    header.appendChild(buttonPosition);
    buttonPosition.appendChild(buttonPositionAll);
    buttonPosition.appendChild(buttonGoleiro);
    buttonPosition.appendChild(buttonAtacante);
    buttonPosition.appendChild(buttonLateralRight);
    buttonPosition.appendChild(buttonLateralLeft);
    buttonPosition.appendChild(buttonZagueiro);
    buttonPosition.appendChild(buttonMeioCampista);

    const buildCard = (player) => {
        const containerCard = document.createElement('article');
        container.appendChild(containerCard);

        const photo = document.createElement('img');
        photo.src = player.imagem;
        photo.alt = `Foto de ${player.nome}`;
        containerCard.appendChild(photo);

        const name = document.createElement('h3');
        name.textContent = player.nome;
        containerCard.appendChild(name);

        const position = document.createElement('p');
        position.textContent = player.posicao;
        containerCard.appendChild(position);
    };

} else {
    window.location.href = '../Index.html';
}