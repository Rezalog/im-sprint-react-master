function Todo({ todos, completeTodo, removeTodo }) {
  return (
    <div className='wrapper-todo'>
      {todos.map((todo) => {
        /* TODO: line-through를 해주는 표현식을 todoClass 변수에 담습니다. */
        let todoClass = 'todo-row';

        return (
          <div className={todoClass} key={todo.id}>
            <div onClick={''}>{todo.text}</div>
            <div className='icons'>
              <i className='fas fa-times delete-icon' onClick={''}></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
