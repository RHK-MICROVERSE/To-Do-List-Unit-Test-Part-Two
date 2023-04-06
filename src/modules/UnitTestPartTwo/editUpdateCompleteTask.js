let { tasksList } = require('../UnitTestPartOne/addAndRemove.js');

const tasksEditUpdateCompleted = {
  existingTasks: () => tasksList,
  editTaskDescription: (index, taskStatement) => {
    tasksList = tasksList.map((task, i) => {
      task.index = task.index || 1;
      task.description = (i === index - 1) ? taskStatement : task.description;
      task.completed = task.completed || false;
      return tasksList;
    });
  },
  updateComplete: (index) => {
    tasksList = tasksList.map((task, j) => {
      task.index = task.index || 1;
      task.completed = (j === index - 1) ? !task.completed : task.completed;
      task.description = task.description || '';
      return tasksList;
    });
  },
  removeAllCompleted: () => {
    tasksList = tasksList.filter((task) => !task.completed);
    return tasksList.length;
  },
};

module.exports = tasksEditUpdateCompleted;