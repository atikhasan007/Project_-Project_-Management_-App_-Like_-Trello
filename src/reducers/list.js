/** 
 * 
 * 
 * lists = [
 * { id , title , boardId, tasks: ['task 1', task 2]},
 * { id , title , boardId, tasks: ['task 1', task 2]},
 * { id , title , boardId, tasks: ['task 1', task 2]},
 * { id , title , boardId, tasks: ['task 1', task 2]},
 * 
 * ]
 * 
 * 
 *  **/

export const listReducer = (lists = [], action) => {
    switch (action.type) {
      case "CREATE_LIST": {
        const newList = {
          id: action.payload.id,
          title: action.payload.title,
          boardId: action.payload.boardId,
          tasks: [],
        };
  
        return [...lists, newList];
      }
  
      case "UPDATE_LIST_NAME": {
        return lists.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item
        );
      }
  
      case "CHANGE_BOARD_ID": {
        return lists.map((item) =>
          item.id === action.payload.id
            ? { ...item, boardId: action.payload.boardId }
            : item
        );
      }
  
      case "REMOVE_LIST": {
        return lists.filter((item) => item.id !== action.payload);
      }
  
      case "ADD_TASK_ID_TO_A_LIST": {
        return lists.map((item) =>
          item.id === action.payload.id
            ? { ...item, tasks: [...item.tasks, action.payload.taskId] }
            : item
        );
      }
  
      case "REMOVE_TASK_ID_FROM_A_LIST": {
        return lists.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                tasks: item.tasks.filter(
                  (taskId) => taskId !== action.payload.taskId
                ),
              }
            : item
        );
      }
  
      default: {
        return lists;
      }
    }
  };
  