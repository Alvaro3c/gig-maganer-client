# Gig Manager

A personal web app to keep track of concerts and festivals you want to attend or are planning to go to. Store all the relevant details in one place: venue, dates, ticket prices, travel expenses, festival lineups, and personal notes.

---

## Features

- **Add concerts & festivals** — log artist name, venue, city, dates, and ticket price
- **Festival support** — mark an event as a festival and add multiple artists to the lineup
- **Travel expenses** — track transport, accommodation, and other costs per event
- **Budget overview** — see a summary of total travel spending across all gigs
- **Notes** — attach personal notes to any event
- **Filter & sort** — browse your gigs with filtering and sorting options
- **Detail view** — open a modal with the full information for any gig

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 6 |
| Routing | React Router DOM 7 |
| UI Components | Material UI (MUI) 7 |
| Forms | React Hook Form 7 |
| Date Handling | dayjs + date-fns + MUI X Date Pickers |
| Styling | SCSS + Emotion |
| Icons | Lucide React + React Icons |
| HTTP Client | Axios |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd gig-manager/client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other scripts

```bash
npm run build    # Production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

---

## Project Structure

```
client/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── AddGig.jsx              # Multi-tab form for adding a gig
│   │   ├── BasicInfoForm.jsx       # Artist, venue, city, dates, ticket price
│   │   ├── FestivalInfoForm.jsx    # Festival flag + artist lineup
│   │   ├── TravelExpensesForm.jsx  # Transport, accommodation, other costs
│   │   ├── NotesForm.jsx           # Free-text notes
│   │   ├── GigsTable.jsx           # Main table listing all gigs
│   │   ├── FilterGigs.jsx          # Filter/tab controls for the table
│   │   ├── DetailsModal.jsx        # Modal with full gig details
│   │   ├── TotalBudget.jsx         # Total budget summary
│   │   └── Footer.jsx              # App footer
│   ├── pages/
│   │   ├── Home.jsx                # Landing page
│   │   └── DashboardPreview.jsx    # Main dashboard (localStorage-based)
│   ├── contexts/
│   │   └── GigDataContext.jsx      # Global state for gig data
│   ├── styles/                     # SCSS files (variables, mixins, per-component)
│   ├── App.jsx                     # Root component with routing
│   └── main.jsx                    # App entry point
├── services/
│   └── api.js                      # API service (not yet implemented)
├── public/
├── index.html
├── vite.config.js
└── package.json
```

---

## Usage

1. Navigate to the **Dashboard** from the home page.
2. Click **Add Gig** to open the form.
3. Fill in the tabs:
   - **Basic Info** — artist, venue, city, start/end dates, ticket price, whether you already have tickets
   - **Festival Info** — toggle on if it's a festival and add the artists you want to see
   - **Travel Expenses** — log transport, accommodation, and any other costs in euros
   - **Notes** — add any personal notes about the event
4. Save the gig — it will appear in the table.
5. Click any row to open the **detail view** with all stored information.
6. Use the **filter tabs** to browse upcoming, past, or abroad events.

---

## Current Status & Roadmap

> Data is currently stored in the **browser's localStorage** — no account or backend is required to use the app.

Planned:
- Backend integration (the `services/api.js` placeholder is ready for this)
- User authentication
- Data export (PDF / CSV)
- Shared gig lists
