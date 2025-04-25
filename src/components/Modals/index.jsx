import { X } from "lucide-react";

const CreateModal = ({ handleCreate, setShowModal, newTask, setNewTask }) => {
  return (
    // Modal overlay that dims the background
    <div className='modal-overlay'>
      <div className='modal-content'>

        <div className='modal-header'>
          <h3>Create New Task</h3>
          <button
            className='close-button'
            onClick={() => {
              setNewTask('');
              setShowModal(false);
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div className='modal-body'>
          <div className='form-group'>
            <label htmlFor='taskInput'>Task Description</label>
            <textarea
              id='taskInput'
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder='What needs to be done?'
              autoFocus // Automatically focus on the input when modal opens
            />
          </div>

          <div className='form-buttons'>
            <button
              className='cancel-btn'
              onClick={() => {
                // Clear the input and close the modal when Cancel is clicked
                setNewTask('');
                setShowModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className='submit-btn'
              onClick={handleCreate}
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
