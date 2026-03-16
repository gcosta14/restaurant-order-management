# 🍽️ Restaurant Order Management System

Sistema **full-stack de gestão de pedidos para restaurante**, desenvolvido com **Django REST Framework** no backend e **React + Vite** no frontend.

A aplicação permite gerir pedidos entre **clientes e cozinha**, facilitando o fluxo de trabalho dentro do restaurante.

---

# 📋 Índice

- ✨ [Características](#-características)
- 🛠️ [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- 📁 [Estrutura do Projeto](#-estrutura-do-projeto)
- 📦 [Requisitos](#-requisitos)
- 🚀 [Instalação e Setup](#-instalação-e-setup)
- ⚙️ [Como Funciona](#️-como-funciona)
- 🔌 [API Endpoints](#-api-endpoints)
- 📸 [Screenshots](#-screenshots)

---

# ✨ Características

## 👤 Interface Cliente

- ✅ Escolher mesa
- ✅ Visualizar menu do restaurante
- ✅ Selecionar pratos
- ✅ Submeter pedidos

## 👨‍🍳 Interface Cozinha

- ✅ Visualizar pedidos em tempo real
- ✅ Atualizar estado dos pedidos
- ✅ Gerir fluxo de preparação

---

# 🛠️ Tecnologias Utilizadas

| Tecnologia | Utilização |
|-----------|------------|
| Python | Backend |
| Django | Framework backend |
| Django REST Framework | API REST |
| SQLite | Base de dados |
| React | Interface frontend |
| Vite | Build tool |
| Axios | Comunicação com API |

---

# 📁 Estrutura do Projeto
```text
restaurant-order-management/
│
├── backend/                     # Backend Django
│
│   ├── api/                     # Configuração principal Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── menu/                    # App dos itens do menu
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── orders/                  # App dos pedidos
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── db.sqlite3               # Base de dados
│   └── manage.py
│
├── frontend/                    # Frontend React
│
│   ├── src/
│   │   ├── pages/
│   │   │   ├── ClientePage.jsx
│   │   │   └── CozinhaPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
│
├── README.md
│
└── requirements.txt
```
---

# 📦 Requisitos

### Backend

- Python **3.10+**
- pip

### Frontend

- Node.js **18+**
- npm ou yarn

---

# 🚀 Instalação e Setup

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/gcosta14/restaurant-order-management.git
cd restaurant-order-management
```

---

## 2️⃣ Configurar Backend

### Criar ambiente virtual

```bash
python -m venv venv
```

### Ativar ambiente virtual

Linux / Mac

```bash
source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

### Instalar dependências

```bash
pip install -r requirements.txt
```

### Migrar base de dados

```bash
python manage.py migrate
```

### Correr servidor

```bash
python manage.py runserver
```

---

## 3️⃣ Configurar Frontend

### Ir para a pasta frontend

```bash
cd frontend
```

### Instalar dependências

```bash
npm install
```

### Correr aplicação

```bash
npm run dev
```

---

# ⚙️ Como Funciona

1️⃣ O cliente seleciona uma mesa e escolhe pratos do menu.

2️⃣ O pedido é enviado para o backend através da API REST.

3️⃣ A cozinha visualiza os pedidos em tempo real.

4️⃣ O estado do pedido pode ser atualizado:

- **pendente**
- **em preparação**
- **pronto**

---

# 🔌 API Endpoints

## Menu

| Método | Endpoint | Descrição |
|------|------|------|
| GET | `/api/menu` | Listar itens do menu |
| POST | `/api/menu` | Criar item do menu |

---

## Orders

| Método | Endpoint | Descrição |
|------|------|------|
| GET | `/api/orders` | Listar pedidos |
| POST | `/api/orders` | Criar pedido |
| PATCH | `/api/orders/:id` | Atualizar estado do pedido |

---

# 📸 Screenshots

Adicionar imagens da aplicação:

- Página cliente
- Página cozinha
- Gestão de pedidos

---

# 🧠 Decisões Técnicas e Arquitetura

## Escolha do stack tecnológico

Para este projeto foi escolhido o seguinte stack:

- **Backend:** Django + Django REST Framework
- **Frontend:** React + Vite
- **Base de dados:** SQLite

### Porque escolhi Django + Django REST Framework

Escolhi **Django** no backend porque permite construir aplicações web de forma rápida, organizada e com uma estrutura muito sólida desde o início.  
Como este desafio pedia um sistema full-stack pequeno, mas bem estruturado, Django foi uma boa escolha por várias razões:

- já inclui uma organização clara por aplicações
- facilita a definição de modelos relacionais
- permite expor uma API REST de forma simples com **Django REST Framework**

O **Django REST Framework** foi escolhido porque torna a criação de endpoints mais limpa e consistente, principalmente na serialização de dados, validação de inputs e construção de respostas JSON.

### Porque escolhi React + Vite

No frontend, escolhi **React** porque permite dividir bem a interface em componentes reutilizáveis, o que é útil num sistema com duas vistas distintas:  
uma vista de cliente e uma vista de cozinha.

O **Vite** foi escolhido por ser uma ferramenta moderna, rápida no arranque do projeto e com uma experiência de desenvolvimento muito leve. Para um projeto deste tamanho, oferece uma configuração simples sem complexidade desnecessária.

### Porque escolhi SQLite

Escolhi **SQLite** por ser suficiente para o âmbito deste desafio.  
Como o objetivo era entregar uma aplicação funcional, simples de correr localmente e com configuração mínima, SQLite foi uma escolha prática e adequada.

As vantagens principais foram:

- não exige instalação adicional
- integra-se muito bem com Django
- facilita a execução local imediata
- é suficiente para um protótipo ou prova técnica deste tamanho

Num contexto de produção ou maior escala, faria sentido migrar para **PostgreSQL**.

---

# 🏗️ Arquitetura da Aplicação

A aplicação foi dividida em duas camadas principais:

## 1. Frontend

O frontend foi desenvolvido em **React** e é responsável por:

- apresentar o menu ao cliente
- permitir selecionar pratos e quantidades
- submeter pedidos
- mostrar a interface da cozinha
- atualizar visualmente o estado dos pedidos

A interface foi separada em páginas/componentes para manter a lógica organizada e facilitar manutenção futura.

## 2. Backend

O backend foi desenvolvido em **Django REST Framework** e é responsável por:

- disponibilizar o menu através da API
- receber novos pedidos
- guardar pedidos e respetivas linhas de pedido
- devolver a lista de pedidos existentes
- atualizar o estado dos pedidos ao longo do fluxo da cozinha

O backend funciona como fonte central da verdade para os dados do sistema.

## 3. Base de dados

A base de dados guarda as entidades principais do sistema:

- itens do menu
- pedidos
- linhas de pedido

A estrutura foi desenhada para refletir relações reais entre estas entidades e manter o modelo limpo e normalizado, tal como pedido no enunciado. :contentReference[oaicite:2]{index=2}

---

# 🧩 Modelo de Dados

O modelo de dados foi pensado para separar claramente as responsabilidades entre os diferentes elementos do sistema.

## MenuItem

Representa um prato disponível no menu.

Contém informação como:

- nome
- categoria
- descrição
- ingredientes

Esta separação permite listar os pratos por categoria e reutilizar a informação tanto na interface do cliente como na vista detalhada da cozinha.

## Order

Representa um pedido feito por uma mesa.

Contém informação como:

- número da mesa
- timestamp de criação
- estado atual do pedido

O estado é importante para permitir o fluxo entre as colunas da cozinha:

- Order Preview
- Preparing
- Cooling Down
- Ready to Serve
- Concluded

## OrderLine

Representa a ligação entre um pedido e um item de menu.

Contém:

- pedido associado
- prato associado
- quantidade

Esta tabela intermédia foi necessária porque um pedido pode conter vários pratos, e cada prato pode aparecer em vários pedidos.  
Assim, a relação entre pedidos e pratos fica corretamente modelada.

---

# 🔌 Design da API

A API foi desenhada segundo uma abordagem REST simples, clara e adequada ao âmbito do projeto.  
O objetivo foi manter os endpoints fáceis de compreender e diretamente alinhados com as necessidades do frontend.

### Princípios seguidos

- endpoints separados por recurso
- respostas em JSON
- operações simples e previsíveis
- estrutura suficiente para suportar as duas interfaces do sistema

### Endpoints principais

#### Menu

- `GET /api/menu/`  
  Devolve os itens do menu

#### Orders

- `GET /api/orders/`  
  Devolve os pedidos existentes para a vista da cozinha

- `POST /api/orders/`  
  Cria um novo pedido com as respetivas linhas

- `PATCH /api/orders/:id/`  
  Atualiza o estado de um pedido

Esta estrutura cobre exatamente o que o desafio pedia: obter menu, submeter pedido, listar pedidos existentes e atualizar o estado do pedido. :contentReference[oaicite:3]{index=3}

---

# 🖥️ Estrutura do Frontend

A estrutura do frontend foi organizada para separar responsabilidades entre:

- **pages** → vistas principais da aplicação
- **components** → componentes reutilizáveis
- **services** → comunicação com a API
- **styles** → ficheiros de estilo

Esta separação ajuda a manter o código mais legível e facilita futuras alterações.

### Organização das vistas

Foram criadas duas áreas principais:

#### Interface Cliente

Pensada para ser simples e direta.  
O utilizador consegue:

- escolher a mesa
- ver os pratos por categoria
- escolher quantidades
- rever o pedido
- confirmar a submissão

#### Dashboard Cozinha

Pensado para dar uma visão rápida do estado dos pedidos.  
Os pedidos são apresentados por estado, permitindo ao staff acompanhar a progressão de cada um.

---

# ⚖️ Trade-offs e simplificações

Como este desafio valorizava uma solução limpa e funcional sem over-engineering, foram tomadas algumas decisões conscientes. :contentReference[oaicite:4]{index=4}

## Optei por simplicidade em vez de complexidade extra

Alguns exemplos:

- **SQLite** em vez de PostgreSQL
- **refresh manual** ou atualização simples em vez de arquitetura mais complexa em tempo real
- ausência de autenticação, porque o enunciado indica que não é necessária
- foco na funcionalidade principal em vez de investir demasiado em styling

Estas escolhas ajudaram a manter o projeto dentro do âmbito pedido, sem adicionar complexidade desnecessária.

---

# 🚀 O que melhoraria com mais tempo

Se tivesse mais tempo, as principais melhorias seriam:

## 1. Atualizações em tempo real

Implementaria atualização automática do dashboard da cozinha usando **WebSockets** ou **Server-Sent Events**.  
Isto permitiria que novos pedidos aparecessem sem necessidade de refresh manual.

## 2. Melhor gestão de erros e validações

Melhoraria a validação de inputs tanto no frontend como no backend, por exemplo:

- impedir submissão sem mesa selecionada
- impedir pedidos vazios
- mostrar mensagens de erro mais detalhadas ao utilizador

## 3. Melhor experiência de utilizador no dashboard

Adicionaria uma experiência mais polida para a cozinha, por exemplo:

- drag-and-drop entre colunas
- filtros por mesa
- ordenação por hora
- indicadores visuais por prioridade

## 4. Base de dados mais robusta

Migraria de **SQLite** para **PostgreSQL** caso o sistema fosse usado num contexto real ou com vários utilizadores em simultâneo.

## 5. Testes

Adicionaria testes automáticos para:

- endpoints principais da API
- criação de pedidos
- atualização de estados
- componentes críticos do frontend

## 6. Dockerização

Criaria uma configuração com **Docker** e **docker-compose** para tornar a execução local ainda mais simples e consistente.

---

# ℹ️ Informação adicional relevante

Este projeto foi desenvolvido com foco em:

- cumprir integralmente os requisitos do desafio
- manter uma separação clara entre frontend e backend
- construir um modelo de dados limpo
- expor uma API REST simples e consistente
- entregar uma solução funcional, fácil de correr localmente e fácil de explicar

Sempre que possível, foi privilegiada uma abordagem simples e sólida em vez de uma solução excessivamente complexa, de acordo com o espírito do enunciado. :contentReference[oaicite:5]{index=5}

# 👨‍💻 Autor

Desenvolvido por

**Gonçalo Costa**
