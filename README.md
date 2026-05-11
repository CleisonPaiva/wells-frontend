# WellsGIS — Frontend

A geospatial web application for visualizing and managing oil & gas well data from ANP (Brazilian National Petroleum Agency). Built with React, TypeScript, and ArcGIS Maps SDK for JavaScript.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Map SDK:** ArcGIS Maps SDK for JavaScript
- **UI Components:** PrimeReact
- **Routing:** React Router DOM

---

## ✨ Features

- **Interactive Map** — Visualize 30,000+ oil & gas wells across Brazil
- **Bounding Box Loading** — Only loads wells visible in the current map area
- **Zoom-based Density** — Adjusts point count based on zoom level
- **Color-coded Status** — Each well status has a distinct color on the map
- **Map Legend** — Visual reference for all status colors
- **Basemap Switcher** — Toggle between streets, satellite, hybrid, topographic, and dark gray
- **Filter Panel** — Filter wells by state, basin, and operational status
- **Well Detail Panel** — Click any point to see full well information
- **Wells Table** — Paginated, searchable data table with 50 records per page
- **CSV Import** — Upload ANP data files directly from the interface
- **Error Handling** — User-friendly error messages throughout the app

---

## 📋 Pages

| Route | Description |
|---|---|
| `/` | Interactive map with all features |
| `/wells` | Paginated data table with search |
| `/import` | CSV file upload interface |

---

## ⚙️ Prerequisites

- Node.js 18+
- npm or yarn
- WellsAPI backend running (see backend README)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/CleisonPaiva/wells-frontend.git
cd wells-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the root:

```
VITE_API_URL=http://localhost:5251
```

### 4. Run the development server

```bash
npm run dev -- --port 3002
```

App will be available at: `http://localhost:3002`

---

## 🗺️ Map Features

### Bounding Box
The map only fetches wells visible in the current viewport. When the user stops moving the map, the app sends the current geographic extent to the API and renders the results.

### Zoom-based Density
| Zoom Level | Max Points |
|---|---|
| 1–5 (Brazil overview) | 200 |
| 6–9 (State level) | 500 |
| 10+ (City level) | 2000 |

### Status Colors

| Color | Status |
|---|---|
| 🟢 Green | Producing |
| 🔵 Blue | Drilling / Evaluation |
| 🟠 Orange | Awaiting start |
| 🟡 Yellow | Temporarily abandoned |
| 🔴 Red | Permanently abandoned |
| 💙 Light Blue | Water supply |
| ⚪ Gray | Others |

---

## 🏗️ Project Structure

```
wells-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── BasemapSwitcher.tsx   # Basemap selector
│   │   ├── FilterPanel.tsx       # Map filter sidebar
│   │   ├── Layout.tsx            # App layout with navbar
│   │   ├── MapLegend.tsx         # Map color legend
│   │   ├── Navbar.tsx            # Navigation bar
│   │   └── WellPanel.tsx        # Well detail sidebar
│   ├── pages/
│   │   ├── ImportPage.tsx        # CSV import page
│   │   ├── MapPage.tsx           # Interactive map page
│   │   └── WellsPage.tsx         # Data table page
│   ├── services/
│   │   └── wellService.ts        # API service functions
│   ├── types/
│   │   └── Well.ts               # TypeScript interfaces
│   ├── utils/
│   │   └── wellColors.ts         # Status color mapping
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
└── vite.config.ts
```

---

## 📦 Data Source

Well data sourced from **ANP (Agência Nacional do Petróleo, Gás Natural e Biocombustíveis)** — Brazil's National Petroleum Agency.

- **Portal:** [ANP Public Data — Well Search](https://cdp.anp.gov.br/ords/r/cdp_apex/consulta-dados-publicos-cdp/consulta-de-po%C3%A7os)
- **Dataset:** Consulta de Poços
- **Format:** CSV (semicolon-separated, Latin-1 encoding)
- **Coverage:** All oil & gas wells registered with ANP across Brazil

---

---

# WellsGIS — Frontend (Português)

Aplicação web geoespacial para visualização e gerenciamento de dados de poços de petróleo e gás da ANP. Desenvolvida com React, TypeScript e ArcGIS Maps SDK for JavaScript.

---

## 🛠️ Stack Tecnológica

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **SDK de Mapas:** ArcGIS Maps SDK for JavaScript
- **Componentes UI:** PrimeReact
- **Roteamento:** React Router DOM

---

## ✨ Funcionalidades

- **Mapa Interativo** — Visualize mais de 30.000 poços de petróleo e gás no Brasil
- **Carregamento por Bounding Box** — Carrega apenas os poços visíveis na área atual do mapa
- **Densidade por Zoom** — Ajusta a quantidade de pontos conforme o nível de zoom
- **Status com Cores** — Cada situação do poço tem uma cor distinta no mapa
- **Legenda do Mapa** — Referência visual para todas as cores de status
- **Basemap Switcher** — Alterne entre ruas, satélite, híbrido, topográfico e cinza escuro
- **Painel de Filtros** — Filtre poços por estado, bacia e situação operacional
- **Painel de Detalhes** — Clique em qualquer ponto para ver as informações completas do poço
- **Tabela de Poços** — Tabela paginada e pesquisável com 50 registros por página
- **Importação CSV** — Faça upload de arquivos da ANP diretamente pela interface
- **Tratamento de Erros** — Mensagens de erro amigáveis em toda a aplicação

---

## 📋 Páginas

| Rota | Descrição |
|---|---|
| `/` | Mapa interativo com todas as funcionalidades |
| `/wells` | Tabela paginada com busca |
| `/import` | Interface de upload de arquivo CSV |

---

## ⚙️ Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend WellsAPI rodando (veja o README do backend)

---

## 🚀 Como Executar

### 1. Clonar o repositório

```bash
git clone https://github.com/CleisonPaiva/wells-frontend.git
cd wells-frontend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Cria um arquivo `.env` na raiz:

```
VITE_API_URL=http://localhost:5251
```

### 4. Rodar o servidor de desenvolvimento

```bash
npm run dev -- --port 3002
```

A aplicação estará disponível em: `http://localhost:3002`

---

## 🗺️ Funcionalidades do Mapa

### Bounding Box
O mapa busca apenas os poços visíveis na área atual. Quando o usuário para de mover o mapa, a aplicação envia o extent geográfico atual para a API e renderiza os resultados.

### Densidade por Zoom

| Nível de Zoom | Máximo de Pontos |
|---|---|
| 1–5 (visão do Brasil) | 200 |
| 6–9 (nível estadual) | 500 |
| 10+ (nível municipal) | 2000 |

### Cores por Status

| Cor | Situação |
|---|---|
| 🟢 Verde | Produzindo |
| 🔵 Azul | Em perfuração / avaliação |
| 🟠 Laranja | Aguardando início |
| 🟡 Amarelo | Abandonado temporariamente |
| 🔴 Vermelho | Abandonado permanentemente |
| 💙 Azul claro | Captação de água |
| ⚪ Cinza | Outros |

---

## 🏗️ Estrutura do Projeto

```
wells-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── BasemapSwitcher.tsx   # Seletor de basemap
│   │   ├── FilterPanel.tsx       # Sidebar de filtros do mapa
│   │   ├── Layout.tsx            # Layout com navbar
│   │   ├── MapLegend.tsx         # Legenda de cores do mapa
│   │   ├── Navbar.tsx            # Barra de navegação
│   │   └── WellPanel.tsx        # Sidebar de detalhes do poço
│   ├── pages/
│   │   ├── ImportPage.tsx        # Página de importação CSV
│   │   ├── MapPage.tsx           # Página do mapa interativo
│   │   └── WellsPage.tsx         # Página da tabela de dados
│   ├── services/
│   │   └── wellService.ts        # Funções de serviço da API
│   ├── types/
│   │   └── Well.ts               # Interfaces TypeScript
│   ├── utils/
│   │   └── wellColors.ts         # Mapeamento de cores por status
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
└── vite.config.ts
```

---

## 📦 Fonte de Dados

Dados de poços fornecidos pela **ANP (Agência Nacional do Petróleo, Gás Natural e Biocombustíveis)**.

- **Portal:** [Consulta de Poços — ANP](https://cdp.anp.gov.br/ords/r/cdp_apex/consulta-dados-publicos-cdp/consulta-de-po%C3%A7os)
- **Dataset:** Consulta de Poços
- **Formato:** CSV (separado por ponto e vírgula, codificado em Latin-1)
- **Cobertura:** Todos os poços de petróleo e gás registrados na ANP em território brasileiro