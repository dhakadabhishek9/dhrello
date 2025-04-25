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

      {loading ? (
        <Loader />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='kanban-board'>
            {Object.entries(columns).map(([columnId, column]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='kanban-column'
                  >
                    <h2 className='kanban-column-title'>
                      {getColumnIcon(columnId)}
                      {column.title}
                      <span className='task-count'>{column.tasks.length}</span>
                    </h2>

                    <div className='task-container'>
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
