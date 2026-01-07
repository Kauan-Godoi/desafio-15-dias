# 📝 Gerenciador de Tarefas

Um sistema simples e eficiente para organização de pendências do dia a dia. Este projeto permite o controle total do ciclo de vida de uma tarefa, desde o cadastro até a exclusão, utilizando o **Firebase Realtime Database** para manter seus dados seguros e acessíveis na nuvem.

## 🔗 Acesse o Projeto
O projeto está publicado e pode ser acessado diretamente pelo link abaixo:
👉 **[Visualizar Gerenciador de Tarefas](https://kauan-godoi.github.io/Gerenciador-de-tarefas/)**

### 📥 Tela de Cadastro
Aqui é onde as tarefas são registradas e enviadas para o Firebase.

<img width="1304" height="900" alt="image" src="https://github.com/user-attachments/assets/c08daa06-59a7-4ef9-bc56-51d79510040a" />

---

### 📋 Tela de Listagem e Gerenciamento
Nesta tela, você pode visualizar, editar e concluir suas tarefas em tempo real.

<img width="726" height="604" alt="image" src="https://github.com/user-attachments/assets/656c0bc5-4282-4beb-92ba-794cc0f8ec2c" />


---

## 🚀 Funcionalidades

* **Cadastro de Tarefas:** Interface intuitiva para adicionar títulos e descrições detalhadas.
* **Listagem em Tempo Real:** Visualização dinâmica de todas as tarefas armazenadas no banco de dados.
* **Edição Flexível:** Altere informações de tarefas existentes sem recarregar a página.
* **Controle de Conclusão:** Marque tarefas como feitas, com alteração visual para facilitar a identificação.
* **Gerenciamento de Exclusão:** Remova tarefas permanentemente com um sistema de confirmação de segurança.
* **Persistência Cloud:** Sincronização automática com a API REST do Firebase.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica das páginas de interface.
* **CSS3:** Estilização personalizada para uma melhor experiência de usuário.
* **JavaScript (ES6+):** Lógica de manipulação do DOM e integração assíncrona com API.
* **Firebase Realtime Database:** Banco de dados NoSQL para armazenamento em tempo real.

## 📁 Estrutura do Projeto

* `index.html`: Portal de cadastro de novas tarefas.
* `listarTarefas.html`: Painel de visualização e gerenciamento das tarefas salvas.
* `script.js`: Arquivo contendo as integrações de rede (GET, POST, PATCH, DELETE) com o Firebase.
* `style.css` / `style_lista.css`: Responsáveis pela identidade visual do sistema.

---
Desenvolvido por Kauan Godoi
