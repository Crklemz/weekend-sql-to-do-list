console.log('js');

$( document ).ready( function(){
    console.log( 'JQ' );
    
  getTasks();
//click listeners
$('#submitBtn').on('click', handleSubmit);
$('#taskTable').on('click', '.completeBtn', handleCompleteClick);
$('#taskTable').on('click', '.deleteBtn', deleteTaskHandler);


});//end document ready

function handleSubmit() {
  console.log('Submit button clicked');
  let task = {
  task: $('#addTaskIn').val(),
  date: $('#addDateIn').val(),
  complete: false
  };
  submitTask(task);
  //empty inputs
  $('#addTaskIn').val('');
  $('#addDateIn').val('');
}//end handleSubmit

// adds a task to the database
function submitTask(newTask) {
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: newTask,
    }).then(function(response) {
      console.log('Response from server.', response);
      getTasks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add task');
    });
}//end submitTask

function renderDOM(taskArray) {
  console.log('in renderDOM');
  //clear table before printing current array
  $('#taskTable').empty();

  //for loop to append tasks to DOM along with complete and delete buttons
  for(let i = 0; i < taskArray.length; i++) {
    let task = taskArray[i];

    task.date = task.date.slice(0,10);

    $('#taskTable').append(`
      <tr class="taskRow">
        <td>${task.task}</td>
        <td>${task.date}</td>
        <td>${task.complete}</td>
        <td><button class="completeBtn" data-id="${task.id}" data-complete="${task.complete}">Task Completed</button></td>
        <td><button class="deleteBtn" data-id="${task.id}">Delete</button></td>
      </tr>
    `)
    if(`${task.complete}` === 'true') {
      $(".taskRow").addClass("completed");
    }
  }//end for loop
}//end renderDOM

//get the tasks from server
function getTasks() {
  console.log('in get tasks');
  //ajax call to get data from server
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then(function (response) {
    console.log(response);
    renderDOM(response); //runs function to print tasks to DOM
  }).catch(function (error) {
    console.log('error in GET on client.js', error);
  });
}//end getTasks

function handleCompleteClick(){

  if ($(this).data('complete') === false) {

    completedTask($(this).data('id'), 'true');
  } else {
    completedTask($(this).data('id'), 'false');
  }
};//end handleCompleteClick

function completedTask(taskId, status){
  console.log(`in completedTask status is ${status}`);
  
  $.ajax({
    method: "PUT",
    url: `/tasks/${taskId}`,
    data: {
      complete: `${status}`
    }
  })
  .then(response => {
    console.log('task completed');
    getTasks();
  })
  .catch(err => {
    console.log(err);
  });
}//end completedTask

function deleteTaskHandler() {
  deleteTask($(this).data("id"))
}//deleteTaskHandler

function deleteTask(taskId) {
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskId}`
  }).then(response => {
    console.log(`deleted task with id of ${taskId}`);
    getTasks();
  }).catch(err => {
    alert('there was a problem deleting that task', err);
  });
}//end deleteTask

