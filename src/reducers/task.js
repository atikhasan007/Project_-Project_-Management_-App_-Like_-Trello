/**
 * 
 * tasks = [
 * {id, title, boardId, listId},
 * {id, title, boardId, listId},
 * {id, title, boardId, listId},
 * ]
 * 
 **/

export const taskReducer = (tasks = [], action) => {
  switch (action.type) {

    case "CREATE_TASK": {
      const newTask = {
        id: action.payload.id,
        title: action.payload.title,
        listId: action.payload.listId,
        boardId: action.payload.boardId,
      };
      return [...tasks, newTask];
    }

    case "UPDATE_TASK_TITLE": {
      return tasks.map((item) =>
        item.id === action.payload.id
          ? { ...item, title: action.payload.title }
          : item
      );
    }

    case "REMOVE_TASK": {
      return tasks.filter((task) => task.id !== action.payload);
    }

    case "CHANGE_LIST_ID_OF_A_TASK": {
      return tasks.map((item) =>
        item.id === action.payload.id
          ? { ...item, listId: action.payload.listId }
          : item
      );
    }

    case "CHANGE_BOARD_ID_OF_A_TASK": {
      return tasks.map((item) =>
        item.id === action.payload.id
          ? { ...item, boardId: action.payload.boardId }
          : item
      );
    }

    default: {
      return tasks;
    }
  }
};
