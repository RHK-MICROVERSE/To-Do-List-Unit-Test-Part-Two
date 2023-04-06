const tasksEditUpdateCompleted = require('./editUpdateCompleteTask.js');
const { tasksList, tasksAddRemove } = require('../UnitTestPartOne/addAndRemove.js');

describe('test update todo list description by index number', () => {
  tasksAddRemove.addTask('task-1');
  test('todo description as the index number in param should be updated', () => {
    expect(tasksEditUpdateCompleted.editTaskDescription(0, 'edited')).toEqual(tasksList.description);
  });
});

describe('test update todo isCompleted by index number', () => {
  test('todo isCompleted as the index number in param should be changes', () => {
    expect(tasksEditUpdateCompleted.updateComplete(0)).toEqual(tasksList.isCompleted);
  });
});

describe('delete todo list were isCompleted status is true', () => {
  test('todo list should only shown todo list with isCompleted status is false', () => {
    expect(tasksEditUpdateCompleted.removeAllCompleted()).toEqual(tasksList.length);
  });
});
