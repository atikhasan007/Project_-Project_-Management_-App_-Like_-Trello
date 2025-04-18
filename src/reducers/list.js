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

      case "SORT_TASK_IDS_IN_A_LIST": {
        const { draggableId, source, destination } = action.payload;
      
        return lists.map((list) => {
          // Case 1: Moving inside the same list
          if (source.droppableId === destination.droppableId && list.id === source.droppableId) {
            const copyOfTasks = [...list.tasks];
            copyOfTasks.splice(source.index, 1);
            copyOfTasks.splice(destination.index, 0, draggableId);
            return { ...list, tasks: copyOfTasks };
          }
      
          // Case 2: Remove task from source list
          if (source.droppableId === list.id) {
            return {
              ...list,
              tasks: list.tasks.filter((taskId) => taskId !== draggableId),
            };
          }
      
          // Case 3: Add task to destination list
          if (destination.droppableId === list.id) {
            return {
              ...list,
              tasks: [
                ...list.tasks.slice(0, destination.index),
                draggableId,
                ...list.tasks.slice(destination.index),
              ],
            };
          }
      
          return list;
        });
      }
      
      default: {
        return lists;
      }
    }
  };
  