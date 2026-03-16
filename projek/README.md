🍽️ Restaurant Order Management System

Um sistema full-stack de gestão de pedidos para restaurante, desenvolvido com Django REST Framework no backend e React + Vite no frontend.

Este projeto inclui duas interfaces distintas:

Cliente — para escolher a mesa, selecionar pratos e submeter pedidos

Cozinha — para acompanhar os pedidos por estado e atualizar a sua progressão

📋 Índice

✨ Características

🛠️ Tecnologias Utilizadas

📁 Estrutura do Projeto

📦 Requisitos

🚀 Instalação e Setup

🎯 Como Funciona

🔌 API Endpoints

🏗️ Decisões Arquiteturais

🔮 Melhorias Futuras

📝 Notas

✨ Características
Para Clientes

✅ Visualização do menu organizado por categorias

✅ Seleção de quantidades por prato

✅ Escolha do número da mesa

✅ Resumo do pedido antes de submissão

✅ Submissão de pedidos para o backend

✅ Feedback visual de sucesso e erro

✅ Botão para limpar seleção

Para a Cozinha

✅ Dashboard com pedidos organizados por estado

✅ Visualização em colunas:

Order Preview

Preparing

Cooling Down

Ready to Serve

Concluded

✅ Visualização dos detalhes de cada pedido

✅ Indicação da mesa e hora de criação

✅ Visualização de pratos, quantidades e ingredientes

✅ Atualização manual com botão de refresh

✅ Mudança de estado com ações de avanço e recuo

Interface / UX

🎨 Interface moderna e simples

📱 Layout organizado por cartões

🌙 Suporte para dark mode

🧩 Separação clara entre interface de cliente e dashboard da cozinha

🛠️ Tecnologias Utilizadas
Backend

Python

Django

Django REST Framework

SQLite

django-cors-headers

Frontend

React

Vite

JavaScript

CSS

📁 Estrutura do Projeto
restaurant-order-management/
├── backend/
│   ├── api/                  # Configuração principal do Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── menu/                 # App dos itens do menu
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── orders/               # App dos pedidos e linhas de pedido
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── db.sqlite3
│   └── manage.py
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── ClientePage.jsx
    │   │   ├── ClientePage.css
    │   │   ├── CozinhaPage.jsx
    │   │   └── CozinhaPage.css
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── public/
    ├── package.json
    └── vite.config.js
📦 Requisitos
Backend

Python 3.10 ou superior

pip

Frontend

Node.js 18+

npm

🚀 Instalação e Setup
1️⃣ Clonar o repositório
git clone <repository-url>
cd restaurant-order-management
2️⃣ Setup do Backend

Entrar na pasta do backend:

cd backend

Criar ambiente virtual:

python -m venv .venv

Ativar ambiente virtual:

Windows

.venv\Scripts\activate

macOS / Linux

source .venv/bin/activate

Instalar dependências:

pip install django djangorestframework django-cors-headers

Criar e aplicar migrações:

python manage.py makemigrations
python manage.py migrate

Criar superuser:

python manage.py createsuperuser

Arrancar o servidor backend:

python manage.py runserver

✅ Backend disponível em: http://127.0.0.1:8000/

3️⃣ Setup do Frontend

Abrir novo terminal e entrar na pasta do frontend:

cd frontend

Instalar dependências:

npm install

Arrancar o frontend:

npm run dev

✅ Frontend disponível em: http://localhost:5173/

🎯 Como Funciona
🧾 Interface do Cliente

A interface do cliente permite:

indicar o número da mesa

visualizar o menu por categorias

aumentar ou diminuir a quantidade de cada prato

ver um resumo do pedido

submeter o pedido para o backend

Fluxo do Cliente

Selecionar o número da mesa

Escolher pratos e quantidades

Rever o resumo do pedido

Submeter o pedido

Receber feedback visual de sucesso ou erro

👨‍🍳 Dashboard da Cozinha

A dashboard da cozinha mostra os pedidos organizados por estado.

Cada pedido apresenta:

número do pedido

número da mesa

hora de criação

pratos selecionados

quantidades

ingredientes

A cozinha pode:

fazer refresh manual

avançar o pedido para o próximo estado

recuar o pedido para o estado anterior

Estados do Pedido

order_preview

preparing

cooling_down

ready_to_serve

concluded

🔌 API Endpoints
Menu
GET /api/menu/
GET /api/menu/?category=carne
Orders
GET /api/orders/
POST /api/orders/
PATCH /api/orders/<id>/status/
🧪 Exemplo de criação de pedido
{
  "table_number": 4,
  "items": [
    { "menu_item_id": 1, "quantity": 2 },
    { "menu_item_id": 4, "quantity": 1 }
  ]
}
🏗️ Decisões Arquiteturais

Escolhi Django no backend por estar alinhado com a stack recomendada no enunciado e por oferecer uma estrutura sólida para:

modelos

persistência

serializers

API REST

No frontend usei React com Vite para manter a aplicação rápida, simples e bem separada por páginas.

Separação no backend

O backend foi dividido em duas apps principais:

menu — responsável pelos pratos do menu

orders — responsável pelos pedidos e linhas de pedido

Modelo de dados

O modelo foi construído com três entidades principais:

MenuItem

Order

OrderLine

Isto permite uma estrutura limpa e normalizada:

um pedido pode ter várias linhas

cada linha está associada a um prato do menu

cada linha guarda a quantidade pedida

Dashboard da cozinha

Na cozinha optei por refresh manual, porque:

é suficiente para o objetivo do projeto

reduz complexidade

evita over-engineering

é fácil de justificar e manter

Tema escuro

O dark mode foi implementado com estado no componente principal e classes condicionais, sem dependências externas.

🔮 Melhorias Futuras

Com mais tempo, acrescentaria:

atualização automática da dashboard da cozinha

persistência do dark mode com localStorage

navegação com React Router

melhor responsividade em ecrãs pequenos

filtragem e pesquisa de pedidos na cozinha

testes automáticos no backend e frontend

histórico separado para pedidos concluídos

polimento visual adicional

📝 Notas

O projeto foi pensado para correr localmente com configuração mínima.

Não foi implementada autenticação, de forma a manter o âmbito reduzido do desafio.

O foco principal foi:

funcionalidade

clareza da arquitetura

separação de responsabilidades

simplicidade da solução

👨‍💻 Autor

Desenvolvido por Gonçalo Costa

🚀 Final Notes

Este projeto foi desenvolvido com foco em:

separação clara entre frontend e backend

simplicidade da solução

modelo de dados limpo

interface funcional para cliente e cozinha
