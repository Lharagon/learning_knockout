/* Module for ToDo List application */
var ToDoList = function () {

  /* add members here */
  // the task
  var task = {
      name: ko.observable(),
      description: ko.observable(),
      priority: ko.observable()
  };

  // array of tasks
  var tasks = ko.observableArray();

  var addTask = function() {
      tasks.push({name: task.name(),
                  description: task.description(),
                  priority: task.priority(),
                  status: ko.observable('new')
      });
      clearTask();
  }

  var deleteTask = function(task) {
      console.log("Deleting task with name: " + task.name);
      // remove task from array
      tasks.remove(task);
  }

  var completeTask = function(task) {
      console.log("Completing task with name: " + task.name);
      // set status of task to complete
      task.status('complete');
  }

  var clearTask = function() {
      task.name(null);
      task.description(null);
      task.priority("1");
  };

  var sortByPriority = function() {
      console.log("Sorting tasks by priority");
      tasks.sort(
          function(left, right) {
              return left.priority == right.priority ?
              0
              :
              (left.priority < right.priority ? -1 : 1)
          }
      )
  };

  var sortByName = function() {
      console.log("Sorting tasks by name");
      tasks.sort(
          function(left, right) {
              return left.name == right.name ?
              0
              :
              (left.name < right.name ? -1 : 1)
          }
      )
  }

  var numOfCompletedTasks = ko.pureComputed(function() {
      var completedTasks = ko.utils.arrayFilter(tasks(), function(task) {
          return task.status() == 'complete';
      });

      return completedTasks.length;

  })

  var init = function () {
    /* add code to initialize this module */
    ko.applyBindings(ToDoList);
  };

  /* execute the init function when the DOM is ready */
  $(init);

  return {
    /* add members that will be exposed publicly */
    tasks: tasks,
    task: task,
    addTask: addTask,
    deleteTask: deleteTask,
    completeTask: completeTask,
    sortByPriority: sortByPriority,
    sortByName: sortByName,
    numOfCompletedTasks: numOfCompletedTasks
  };
}();
