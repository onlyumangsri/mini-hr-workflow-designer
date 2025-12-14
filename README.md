# Mini HR Workflow Designer

A professional visual workflow designer for HR processes built with Next.js and React Flow.

## 🚀 Features

- **Visual Workflow Designer**: Drag-and-drop interface for creating HR workflows
- **Professional Node Types**: Start, Task, Approval, Automated, and End nodes with icons and metrics
- **Metrics Dashboard**: Comprehensive analytics with performance overview and automation coverage
- **Workflow Simulation**: Test workflows with detailed execution logs
- **Export/Import**: Save and load workflows as JSON files
- **Responsive Design**: Works on desktop and tablet devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19
- **Workflow Engine**: React Flow 12
- **Icons**: Lucide React
- **Styling**: CSS3 with custom components
- **State Management**: React Hooks

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mini-hr-workflow-designer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### Creating Workflows
1. Drag nodes from the left sidebar onto the canvas
2. Connect nodes by dragging from connection points
3. Click nodes to configure their properties
4. Use the metrics dashboard to monitor workflow statistics

### Node Types
- **Start Node**: Workflow initiation point
- **Task Node**: Manual tasks requiring human input
- **Approval Node**: Authorization checkpoints
- **Automated Node**: System-automated actions
- **End Node**: Workflow completion point

### Simulation
1. Ensure your workflow has Start and End nodes
2. Click "Run Simulation" in the header
3. View execution logs in the modal dialog

## 📁 Project Structure

```
mini-hr-workflow-designer/
├── components/
│   ├── NodeForms/          # Node configuration forms
│   ├── FlowCanvas.jsx      # Main workflow canvas
│   ├── MetricsDashboard.jsx # Analytics dashboard
│   ├── TabbedSidebar.jsx   # Right sidebar with tabs
│   ├── WorkflowHeader.jsx  # Top navigation bar
│   └── SimulationModal.jsx # Simulation results modal
├── hooks/
│   ├── useSimulateWorkflow.js
│   └── useFetchAutomations.js
├── pages/
│   ├── api/                # API endpoints
│   ├── _app.js
│   └── index.js           # Main application page
├── styles/
│   └── globals.css        # Global styles
└── data/
    └── automations.json   # Mock automation data
```

## 🎨 Features Overview

### Professional Node Design
- Color-coded node types with icons
- Dynamic badges showing metrics
- Hover effects and selection states
- Responsive sizing based on content

### Metrics Dashboard
- Performance overview with search
- Automation coverage percentage
- Workflow progress tracking
- Flow objectives with expandable cards

### Smooth Workflow Connections
- Curved dotted edges
- Hover and selection effects
- Professional arrow markers
- Smooth animations

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Build
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📞 Support

For questions or issues, please open a GitHub issue or contact the development team.

---

Built with ❤️ using Next.js and React Flow