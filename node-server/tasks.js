const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

function showTasks() {
  tasks.forEach((task, index) => {
    const taskStatus = task.completed ? chalk.green('Completada') : chalk.red('Pendiente');
    console.log(`${index + 1}. [${taskStatus}] ${task.description}`);
  });
}

function addTask(description) {
  tasks.push({ description, completed: false });
  console.log(chalk.blue('Tarea agregada exitosamente.'));
}

function deleteTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    console.log(chalk.blue('Tarea eliminada exitosamente.'));
  } else {
    console.log(chalk.red('Índice de tarea no válido.'));
  }
}

function completeTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    console.log(chalk.blue('Tarea completada exitosamente.'));
  } else {
    console.log(chalk.red('Índice de tarea no válido.'));
  }
}

rl.question('Bienvenido a la lista de tareas. ¿Qué acción deseas realizar? (add/delete/complete/exit): ', (action) => {
  switch (action) {
    case 'add':
      rl.question('Ingresa la descripción de la tarea: ', (description) => {
        addTask(description);
        showTasks();
        rl.close();
      });
      break;

    case 'delete':
      showTasks();
      rl.question('Ingresa el índice de la tarea que deseas eliminar: ', (index) => {
        deleteTask(index - 1);
        showTasks();
        rl.close();
      });
      break;

    case 'complete':
      showTasks();
      rl.question('Ingresa el índice de la tarea que deseas completar: ', (index) => {
        completeTask(index - 1);
        showTasks();
        rl.close();
      });
      break;

    case 'exit':
      rl.close();
      break;

    default:
      console.log(chalk.red('Acción no válida.'));
      rl.close();
      break;
  }
});

rl.on('close', () => {
  console.log(chalk.blue('Hasta luego.'));
});