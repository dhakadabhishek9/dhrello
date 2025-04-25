import useApp from "./useApp";
import "./App.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateModal from "./components/Modals";
import {
  Clipboard,
  CheckCircle,
  Trash2,
  AlertCircle,
  PlusCircle,
} from "lucide-react";
import Loader from "./components/Loader";

function App() {
  // Destructuring values and functions from the custom hook
  const {
    loading,
    onDragEnd,
    columns,
    showModal,
    setShowModal,
    newTask,
    setNewTask,
    handleCreate,
  } = useApp();

  // Returns icon badge for each column based on its ID
  const getColumnIcon = (columnId) => {
    switch (columnId) {
      case "todo":
        return (
          <div className='status-badge todo-badge'>
            <Clipboard size={14} />
          </div>
        );
      case "done":
        return (
          <div className='status-badge done-badge'>
            <CheckCircle size={14} />
          </div>
        );
      case "delete":
        return (
          <div className='status-badge delete-badge'>
            <Trash2 size={14} />
          </div>
        );
      default:
        return null;
    }
  };

  // Component shown when a column has no tasks
  const renderEmptyColumn = () => (
    <div className='empty-column'>
      <AlertCircle />
      <p>No tasks available</p>
    </div>
  );

  return (
    <div className='app-container'>
      <div className='header-section'>
        <h1 className='app-title'>Dhrello</h1>
        <button className='create-btn' onClick={() => setShowModal(true)}>
          <PlusCircle size={18} />
          Create Task
        </button>
      </div>

      {/* Show loader if app is in loading state, otherwise show the Kanban board */}
      {loading ? (
        <Loader />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='kanban-board'>
            {/* Mapping through each column (e.g., To Do, Done, Delete) */}
            {Object.entries(columns).map(([columnId, column]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='kanban-column'
                  >
                    {/* Column title with icon and task count */}
                    <h2 className='kanban-column-title'>
                      {getColumnIcon(columnId)}
                      {column.title}
                      <span className='task-count'>{column.tasks.length}</span>
                    </h2>

                    <div className='task-container'>
                      {/* Render each task if available, else show the empty column message */}
                      {column.tasks.length > 0
                        ? column.tasks.map((task, index) => (
                            <Draggable
                              key={task.todo}
                              draggableId={task.todo}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    cursor: snapshot.isDragging ? "grabbing" : "grab",
                                  }}
                                  className={`kanban-task ${
                                    snapshot.isDragging ? "dragging" : ""
                                  } ${
                                    columnId === "delete"
                                      ? "delete-col"
                                      : columnId === "done"
                                      ? "done-col"
                                      : ""
                                  }`}
                                >
                                  {task.todo}
                                </div>
                              )}
                            </Draggable>
                          ))
                        : renderEmptyColumn()}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}

      {/* Modal for creating a new task */}
      {showModal && (
        <CreateModal
          setShowModal={setShowModal}
          newTask={newTask}
          setNewTask={setNewTask}
          handleCreate={handleCreate}
        />
      )}
    </div>
  );
}

export default App;
