Restaurant Order Management System
README draft for project delivery
Aplicação web full-stack para gestão de pedidos num restaurante, com duas interfaces distintas:

Cliente — para escolher mesa, selecionar pratos e submeter pedidos
Cozinha — para acompanhar os pedidos por estado e atualizar a sua progressão

Stack utilizada

Backend
Python
Django
Django REST Framework
SQLite

Frontend
React
Vite
CSS

Funcionalidades implementadas

Interface do Cliente
Visualização do menu por categorias
Seleção de quantidades por prato
Escolha do número da mesa
Resumo do pedido antes de submissão
Submissão do pedido para o backend
Feedback visual de sucesso/erro
Botão para limpar seleção

Dashboard da Cozinha
Visualização dos pedidos em colunas por estado:
Order Preview
Preparing
Cooling Down
Ready to Serve
Concluded
Visualização dos detalhes de cada pedido:
número da mesa
hora do pedido
pratos pedidos
quantidade por prato
ingredientes
Atualização manual com botão de refresh
Mudança de estado dos pedidos através de ações de avanço e recuo

Estrutura do projeto

backend/
  api/
  menu/
  orders/

frontend/
  src/
    pages/
    services/

Como correr o projeto localmente

Backend

Entrar na pasta do backend:

cd backend

Criar e aplicar migrações:

python manage.py makemigrations
python manage.py migrate

Arrancar o servidor Django:

python manage.py runserver

O backend fica disponível em:

http://127.0.0.1:8000/

Frontend

Entrar na pasta do frontend:

cd frontend

Instalar dependências:

npm install

Arrancar o frontend:

npm run dev

O frontend fica disponível em:

http://localhost:5173/

Endpoints principais da API

Menu
`GET /api/menu/` — obter todo o menu
`GET /api/menu/?category=carne` — obter menu filtrado por categoria

Orders
`GET /api/orders/` — obter os pedidos existentes
`POST /api/orders/` — submeter um novo pedido
`PATCH /api/orders/<id>/status/` — atualizar o estado de um pedido

Exemplo de criação de pedido

{
  "table_number": 4,
  "items": [
    { "menu_item_id": 1, "quantity": 2 },
    { "menu_item_id": 4, "quantity": 1 }
  ]
}

Decisões arquiteturais

Escolhi Django no backend por estar alinhado com a stack recomendada no enunciado e por oferecer uma estrutura sólida para modelos, persistência e API REST com baixa complexidade adicional.

No frontend usei React com Vite para separar claramente a interface do cliente da interface da cozinha, mantendo a aplicação simples e fácil de evoluir.

A modelação foi separada em duas apps principais no backend:
`menu` — gestão dos itens do menu
`orders` — pedidos e linhas de pedido

O modelo de dados foi construído com três entidades principais:
`MenuItem`
`Order`
`OrderLine`

Isto permite uma estrutura limpa e normalizada, onde um pedido pode ter várias linhas, e cada linha referencia um prato do menu e a sua quantidade.

Na dashboard da cozinha optei por refresh manual, já que essa abordagem é explicitamente aceite no enunciado como solução base. Assim, privilegiei simplicidade e robustez em vez de acrescentar complexidade com WebSockets ou SSE.

O que melhoraria com mais tempo

Com mais tempo, acrescentaria:
atualização automática da dashboard da cozinha sem refresh manual
persistência do dark mode
navegação com React Router
filtragem e pesquisa de pedidos na cozinha
mais polimento visual e responsividade
testes automáticos no backend e frontend
eventual histórico separado para pedidos concluídos

Notas

O projeto foi pensado para ser executado localmente com configuração mínima.
Não foi implementada autenticação, em linha com o âmbito reduzido do desafio.
O foco principal foi funcionalidade, organização do código e clareza da arquitetura.
