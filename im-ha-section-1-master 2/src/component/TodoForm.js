import { useState } from 'react';

function TodoForm({ onSubmit }) {
  /* TODO: input을 변수로 하는 state값을 생성합니다. */

  const handleChange = (e) => {
    /* TODO: input 내의 value가 변경되는 메소드를 작성합니다. */
  };

  const handleSubmit = (e) => {
    /* TODO: Todo를 입력해 전송하는 메서드를 작성합니다. */
  };

  return (
    <form id='todoForm' className='todo-form' onSubmit={''}>
      <input type='text' placeholder='Add a todo' value={''} name='todoInput' className='todo-input' onChange={''} />
      <button className='todo-button'>Add todo</button>
    </form>
  );
}

export default TodoForm;
