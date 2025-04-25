import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTicketsStart, deleteTicketStart, getAllTicketsStart, updateTicketStart } from "./store/redux-slices/tickets"

const useApp = () => {
    const dispatch = useDispatch()
    const [newTask, setNewTask] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { loading, allTickets } = useSelector(state => state.tickets)

     // Fetch all tickets when the component using this hook mounts
    useEffect(() => {
        dispatch(getAllTicketsStart({ userId: 13 }))
    }, []);

    //Cols values
    const [columns, setColumns] = useState({});

    // Set up the initial structure of columns based on fetched tickets
    useEffect(() => {
        if (allTickets?.todos?.length) {
            setColumns({
                todo: {
                    id: "todo",
                    title: "To Do",
                    tasks: allTickets?.todos?.filter(task => !task.completed)
                },
                done: {
                    id: "done",
                    title: "Done",
                    tasks: allTickets?.todos?.filter(task => task.completed)
                },
                delete: {
                    id: "delete",
                    title: "Delete",
                    tasks: []
                }
            })
        }
    }, [allTickets?.todos])


    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceCol = columns[source.droppableId];
        const destCol = columns[destination.droppableId];
        const sourceTasks = [...sourceCol.tasks];
        const destTasks = [...destCol.tasks];
        const [movedTask] = sourceTasks.splice(source.index, 1);

         // Task moved within the same column
        if (source.droppableId === destination.droppableId) {
            sourceTasks.splice(destination.index, 0, movedTask);
            setColumns({
                ...columns,
                [source.droppableId]: { ...sourceCol, tasks: sourceTasks },
            });
        } else {
            // If dropped in "delete" column, dispatch delete action
            if (destCol?.id === 'delete') {
                dispatch(deleteTicketStart({ id: movedTask?.id }))
            } else {
                // Otherwise, toggle completion status and update ticket
                dispatch(updateTicketStart({ data: JSON.stringify({ completed: !movedTask?.completed }), id: 13 }))
            }
            destTasks.splice(destination.index, 0, movedTask);
            setColumns({
                ...columns,
                [source.droppableId]: { ...sourceCol, tasks: sourceTasks },
                [destination.droppableId]: { ...destCol, tasks: destTasks },
            });
        }
    };

    // Handles creating a new task
    const handleCreate = () => {
        if (newTask.trim()) {
            dispatch(addTicketsStart({
                setColumns: setColumns,
                data: JSON.stringify({
                    "todo": newTask?.trim(),
                    "completed": false,
                    "userId": 13
                })
            }))
            setNewTask('');
            setShowModal(false);
        }
    };

    return {
        loading,
        onDragEnd,
        columns,
        showModal,
        setShowModal,
        newTask,
        setNewTask,
        handleCreate
    }
}

export default useApp