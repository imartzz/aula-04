// Seleciona os elementos do DOM
const entradaTarefa = document.getElementById("entradaTarefa");
const botaoAdicionarTarefa = document.getElementById("botaoAdicionarTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Função para carregar as tarefas do localStorage
function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.forEach((tarefa) => {
        criarElementoTarefa(tarefa);
    });
}

// Função para criar um elemento de tarefa
function criarElementoTarefa(tarefa) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = tarefa.texto;
    li.appendChild(span);
    
    if (tarefa.concluida) {
        li.classList.add("concluida");
    }

    // Botão para remover a tarefa
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.className = "remove-btn";
    botaoRemover.onclick = (e) => {
        e.stopPropagation();
        removerTarefa(tarefa.texto);
        li.remove();
    };

    // Marcar a tarefa como concluída
    li.onclick = () => {
        tarefa.concluida = !tarefa.concluida;
        li.classList.toggle("concluida");
        atualizarLocalStorage();
    };

    li.appendChild(botaoRemover);
    listaTarefas.appendChild(li);
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const textoTarefa = entradaTarefa.value.trim();
    if (textoTarefa === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }

    const tarefa = { texto: textoTarefa, concluida: false };
    criarElementoTarefa(tarefa);
    entradaTarefa.value = "";
    salvarTarefa(tarefa);
}

// Função para salvar a tarefa no localStorage
function salvarTarefa(tarefa) {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para remover a tarefa do localStorage
function removerTarefa(textoTarefa) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas = tarefas.filter((tarefa) => tarefa.texto !== textoTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para atualizar o localStorage
function atualizarLocalStorage() {
    const tarefas = [];
    document.querySelectorAll("#listaTarefas li").forEach((li) => {
        const span = li.querySelector("span");
        const tarefa = {
            texto: span.textContent,
            concluida: li.classList.contains("concluida"),
        };
        tarefas.push(tarefa);
    });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Evento para adicionar uma nova tarefa ao clicar no botão
botaoAdicionarTarefa.addEventListener("click", adicionarTarefa);

// Adicionar tarefa pressionando a tecla ENTER
entradaTarefa.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

// Carrega as tarefas ao iniciar a aplicação
carregarTarefas();