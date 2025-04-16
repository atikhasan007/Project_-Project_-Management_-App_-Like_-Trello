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



export const listReducer = (lists = [], action ) => {
    switch(action.type){
        case "CREATE_lIST" : {
          const newList =  {
                id: action.payload.id,
                title : action.payload.title,
                boardId : action.payload.boardId,
                tasks : [],
            }

            return [...lists, newList];
        }
        case "UPDATE_LIST_NAME" : {
            const updatedLists = lists.map((item)=>{
                if(item.id === action.payload.id){
                    return {
                        ...item,
                        title : action.payload.title
                    }
                }
                return item;
            })

            return updatedLists;
        }
        case "CHANGE_BOARD_ID" : {
            const updatedLists = lists.map((item)=>{
                if(item.id === action.payload.id){
                    return {
                        ...item,
                        boardId : action.payload.boardId,
                    }
                }
                return item
            })
            return updatedLists;
        }
        case "REMOVE_LIST" : {
            return lists.filter((item)=> item.id !== action.payload.id);

        }

        case "ADD_TASK_ID_TO_A_LIST" : {
            const updateLists = lists.map((item)=>{
                if(item.id === action.payload.id){
                    return {
                        ...item,
                        tasks : [ ...item.tasks, action.payload.taskId]
                    }
                }
                return item;
            })
            return updateLists;
        }
        case "REMOVE_TASK_ID_FROM_A_LIST" : {
            const updatedLists = lists.map((item)=>{
                if(item.id === action.payload.id){
                    return {
                        ...item,
                        tasks : item.tasks.filter((taskId)=> taskId !== action.payload.taskId)
                    }
                }
                return item;
            })
            return updatedLists;

        }
        default : {
            return lists
        }
    }

}