/* TODO: TodoForm, Todo 컴포넌트를 불러옵니다. */
import TodoForm from '../component/TodoForm';

function Todos() {
  /* TODO: 리스트를 담을 state를 생성합니다. */

  const addTodo = () => {
    /* TODO: Todo를 생성할 메소드를 만듭니다. */
  };

  const removeTodo = () => {
    /* TODO: Todo를 삭제할 메소드를 만듭니다. */
  };

  const completeTodo = () => {
    /* TODO: Todo를 체크해 Line-through를 하는 메소드를 만듭니다. */
  };

  return (
    <div>
      <div className='todo-app'>
        <h1>To Do List</h1>
        <h2>오늘은 무슨 일을 계획하나요?</h2>
        <TodoForm />
        {/* TODO: TodoForm 컴포넌트를 연결합니다. */}
        {/* TODO: Todo 컴포넌트를 연결한 뒤, 생성한 메소드를 prop으로 보냅니다. */}
      </div>
    </div>
  );
}

export default Todos;
