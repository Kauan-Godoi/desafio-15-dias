
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

    return `<li id="'${tarefa.id}'">
        ${tarefa.titulo}<br>
        ${tarefa.descricao}          
        <br>
        <button onclick="editarTarefa('${tarefa.id}', '${idBanco}')">Editar</button>
        <button onclick="deletarTarefa('${idBanco}')">Deletar</button>
    </li>`;

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
            'Contet-Type': 'application/json' //Informa que o body esta configurado com json
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
    const confirme = confirm("Tem serteza que deseja deletar esta tarefa?");
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

        id: new Date().toISOString(),//o banco cria o id automaticamente.
        titulo: titulo,
        descricao: descricao,
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