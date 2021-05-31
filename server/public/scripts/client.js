console.log('js');

$( document ).ready( function(){
    console.log( 'JQ' );
    
  getTasks();
//click listeners
$('#submitBtn').on('click', handleSubmit);

});//end document ready

function handleSubmit() {
  console.log('Submit button clicked');
  let task = {
  task: $('#addTaskIn').val(),
  date: $('#addDateIn').val(),
  complete: false
  };
  submitTask(task);
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

    $('#taskTable').append(`
      <tr>
        <td>${task.task}</td>
        <td>${task.date}</td>
        <td>${task.complete}</td>
        <td><button class="completeBtn" data-id="${task.id}" data-complete="${task.complete}">Task Completed</button></td>
        <td><button class="deleteBtn" data-id="${task.id}">Delete</button></td>
      </tr>
    `)
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
