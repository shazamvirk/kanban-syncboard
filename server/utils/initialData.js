module.exports = {
  columns: {
    'col-todo': {
      id: 'col-todo',
      title: 'To Do',
      cardIds: ['card-1', 'card-2']
    },
    'col-in-progress': {
      id: 'col-in-progress',
      title: 'In Progress',
      cardIds: ['card-3']
    },
    'col-done': {
      id: 'col-done',
      title: 'Done',
      cardIds: ['card-4']
    }
  },
  cards: {
    'card-1': {
      title: 'Design Wireframes',
      description: 'Create high-fidelity mockups for board canvas.',
      priority: 'high'
    },
    'card-2': {
      title: 'Set Up Socket.io',
      description: 'Establish WebSocket room broadcasting for live updates.',
      priority: 'medium'
    },
    'card-3': {
      title: 'Configure Tailwind CSS',
      description: 'Style dark-themed Kanban columns and draggable cards.',
      priority: 'low'
    },
    'card-4': {
      title: 'Project Setup',
      description: 'Initialize Vite React client and Express server repository.',
      priority: 'medium'
    }
  }
};