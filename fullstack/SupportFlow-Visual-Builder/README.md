# SupportFlow Visual Builder

A visual, no-code editor that lets non-technical support managers build, test, and maintain chatbot conversation flows without touching a spreadsheet.

## Overview

Customer support flows are often configured in spreadsheets, which makes changes error-prone, hard to visualize, and risky to ship. SupportFlow Visual Builder replaces spreadsheet editing with a dedicated visual workflow that managers can understand at a glance and update confidently.

With a drag-and-drop canvas and an instant test-drive preview, support managers can iterate on conversation logic, validate configuration mistakes early, and reduce broken bot experiences—without needing a developer each time the flow changes.

## External Resources

- **Live Demo**: [https://amalitechsupportflow.netlify.app/]
- **Design System (PDF)**: [https://drive.google.com/file/d/181cH-CYEfVf8zv1nE6xxcPLUsmwC7Lih/view]
- **Repository**: [https://github.com/kabuyegabbyprince/AmaliTech-DEG-Project-based-challenges]

## Features

### Core Features
- Visual flowchart rendering of conversation nodes from JSON data
- Hand-built SVG connector lines between parent and child nodes (no diagramming library used)
- Click-to-edit node text with instant live updates
- Preview/Test-Drive mode: experience the bot exactly as a real customer would, with a Restart option at any end of conversation

### Extended Features
- Drag-and-drop node repositioning directly on the canvas
- Add and delete nodes/options to build or prune flows without a developer
- Export the current flow back to a JSON file, so work can be saved and re-imported later
- Flow Validator: automatically detects and flags "dead-end" nodes (questions with no configured answers) before they reach real customers

## Tech Stack

- React 19 + Vite
- Plain CSS (no Tailwind, no component libraries)
- No external state management library — React Context + useReducer
- No backend/database — flow data is loaded from a local JSON file and managed entirely in memory during the session

## System Flow Architecture

### Application Data Flow
```
flow_data.json → FlowContext → App Component → (Toolbar, Canvas, PreviewRunner, EditPanel, ValidatorBadge)
```

### State Management Flow
```
User Action → Component Event Handler → Context Action Function → Reducer → State Update → UI Update
```

### Preview Mode Navigation Flow
```
Start Node → Display Question + Options → User Selects Option → goToNode(nextId) → Display Next Node → Repeat until End Node → Show Restart Button → resetPreview()
```

## Architecture Notes

SupportFlow uses a simple, deliberate rendering approach:
- **Node rendering:** each node is positioned absolutely using `position.x/y` coordinates from the JSON model
- **Connector rendering:** connectors are drawn as SVG lines/paths computed from the source/target node positions
- **State:** A single `FlowContext` holds all app state (nodes, current mode, selected node, and preview position)

## The Wildcard Feature: Flow Validator

The Flow Validator scans all nodes and flags any `question` node that has **no configured answer options**. This prevents customer journeys from getting stuck with no way to proceed and catches configuration mistakes before they reach real customers.

After starting the dev server, open the local Vite URL shown in your terminal.

## Project Structure

```text
src/
├── context/FlowContext.jsx      # global state (nodes, mode, selection)
├── components/Canvas.jsx        # renders the node graph
├── components/NodeCard.jsx     # single node UI (selection + dragging)
├── components/ConnectorLayer.jsx  # SVG lines between nodes
├── components/EditPanel.jsx     # edit form for selected node
├── components/PreviewRunner.jsx # chat-style test mode
├── components/ValidatorBadge.jsx # dead-end warning banner
├── components/Toolbar.jsx      # mode toggle + actions
└── utils/graphHelpers.js       # pure functions for edges/dead-ends
```

## Known Limitations & Future Improvements

- No persistent backend/database — flows reset on refresh unless exported and re-imported
- No undo/redo history
- No multi-user collaboration
- Future improvement: analytics to understand which conversation paths real customers use most often
- Add database and use express to implement backend if necessary

## Author

Built by Kabuye Gaby Prince — Full-stack developer








