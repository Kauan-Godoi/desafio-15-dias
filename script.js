
let url = "https://desafio-15-dias-d90d7-default-rtdb.firebaseio.com";
let estaEditando = false;

function getLista() {
    let listaDeTarefaSalvas = document.getElementById("listaDeTarefaSalvas");
    let html = "";
    fetch(url + "/tarefas.json").then(response => {
        if (response.status === 200) {
            response.json().then(dados => {
                let arraylista = Object.entries(dados);
                arraylista.forEach(element => {


                    html += montarlista(element[1], element[0]);
                });
                listaDeTarefaSalvas.innerHTML = html;

            });
        }
    });

}


function montarlista(tarefa, idBanco) {
    const concluida = Boolean(tarefa.concluida);

    // Botões condicionais
    const botoes = concluida
        ? `
        <button onclick="deletarTarefa('${idBanco}')">Deletar</button>
      `
        : `
        <button onclick="editarTarefa('${tarefa.id}', '${idBanco}')">Editar</button>
        <button onclick="concluirTarefa('${tarefa.id}', '${idBanco}')">Concluído</button>
        <button onclick="deletarTarefa('${idBanco}')">Deletar</button>
      `;

    // Classe/estilo para tarefa concluída (verde). Se preferir, use apenas a classe e estilize via CSS.
    const classeOuEstilo = concluida ? 'class="concluida" style="color:#0a7a25;"' : '';

    return `<li id="${tarefa.id}" ${classeOuEstilo}>
        ${tarefa.titulo}<br>
        ${tarefa.descricao}
        <br>
        ${botoes}
    </li>`;
};


function concluirTarefa(id, idBanco) {
    fetch(url + `/tarefas/${idBanco}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ concluida: true })
    }).then(response => {
        if (response.status === 200) {
            // Atualiza a UI
            const li = document.getElementById(id);
            if (li) {
                // marca visualmente como concluída (sem depender de CSS externo)
                li.classList.add('concluida');
                li.style.color = '#0a7a25'; // verde
                // recria apenas os botões conforme regra (somente Deletar)
                li.querySelectorAll('button').forEach(btn => btn.remove());
                const btnDeletar = document.createElement('button');
                btnDeletar.textContent = 'Deletar';
                btnDeletar.onclick = () => deletarTarefa(idBanco);
                li.appendChild(document.createElement('br'));
                li.appendChild(btnDeletar);
            } else {
                // fallback: recarrega lista
                getLista();
            }
        }
    });
};

function editarTarefa(id, idBanco) {
    if (!estaEditando) {
        let liParaEditar = document.getElementById(`'${id}'`);
        const html = ` <div>
        <div>
            <label>Editar titulo da tarefa</label>
            <br>
            <input id="editarTitulo" type="text" placeholder="Titulo da tarefa">
        </div>

        <div>
            <label>Editar descrição da tarefa</label>
            <br>
           <textarea id="editardescricao" placeholder="Descrição da tarefa"></textarea>
        </div>
        <button onclick="salvarTarefa('${idBanco}')">Editar</button>
    </div>`;
        liParaEditar.innerHTML = html;
        estaEditando = true;

    };
};

function salvarTarefa(idBanco) {
    let tituloEditado = document.getElementById("editarTitulo").value;
    let descricaoEditada = document.getElementById("editardescricao").value;

    const tarefa = {

        titulo: tituloEditado,
        descricao: descricaoEditada,
    };

    fetch(url + `/tarefas/${idBanco}.json`, {
        method: 'PATCH',// Define o metodo, o post é para enviar dados para o banco
        headers: {
            'contet-Type': 'application/json' //Informa que o body esta configurado com json
            // (padrão para todos os metodos, menos para o get)
        },
        body: JSON.stringify(tarefa)
    }).then(response => {
        if (response.status == 200) {
            estaEditando = false;
            getLista();
        };
    });

};

function deletarTarefa(idBanco) {
    const confirme = confirm("Tem certeza que deseja deletar esta tarefa?");
    if (confirme) {
        fetch(url + `/tarefas/${idBanco}.json`, {
            method: 'DELETE',
        }).then(response => {
            if (response.status == 200) {
                getLista();
            };
        });
    };

};

function criar_tarefa() {
    let titulo = document.getElementById("titulo").value;//<input>
    let descricao = document.getElementById("descricao").value;//<txtarea>
    let mensagem = document.getElementById("mensagem");//<p>

    const tarefa = {
        id: new Date().toISOString(),
        titulo: titulo,
        descricao: descricao,
        concluida: false // nova flag
    };


    try {

        fetch(url + "/tarefas.json", { // pega a url de servidor e uma "pasta" do banco que estamos usando.
            method: 'POST',// Define o metodo, o post é para enviar dados para o banco
            headers: {
                'Contet-Type': 'application/json' //Informa que o body esta configurado com json
                // (padrão para todos os metodos, menos para o get)
            },

            body: JSON.stringify(tarefa) // dados a serem enviados. JSON.stringify() converte o valor do obj para String Json pois é obrigatorio para comunicar o html.
        }).then(response => { //Verifica a resposta quando chega.
            console.log(response.status);
            if (response.status === 200) {

                mensagem.innerHTML = "Salvo com sucesso"
            } else {
                mensagem.innerHTML = "erro ao salvar"
            }

        });

    } catch (error) {
        console.log(error);

    };

};