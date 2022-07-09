import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { resq$ } from 'resq';
import Todos from '../page/Todos';
import App from '../App';

describe('메뉴에 Todos 라는 항목이 존재해야 합니다', () => {
  const container = document.createElement('div');

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('Todos 메뉴는 `/todos` 주소로 이동할 수 있어야 합니다', () => {
    render(<App />, { container });
    expect(container.querySelector('ul > li > a[href="/todos"]').href).toBeDefined();
  });
});

describe('페이지 영역이 존재하며, 메뉴 선택에 따라 페이지가 바뀌어야 합니다', () => {
  const container = document.createElement('div');

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('`#page` 영역에 라우팅에 따른 페이지 분기를 구현해야 합니다', () => {
    render(<App />, { container });
    const switchComponent = resq$('Switch', container);
    expect(switchComponent.children).toBeDefined();
  });

  it('`/todos` 주소로 이동하면 <Todos> 페이지가 보여야 합니다', () => {
    render(<App />, { container });
    fireEvent.click(container.querySelector("a[href='/todos']"));

    expect(container.querySelector('.todo-app')).toBeDefined();
    expect(container.querySelector('#list')).toBeNull();
    expect(container.querySelector('#current-image')).toBeNull();
  });
});

describe('Todos 페이지에 TodoForm과 Todo 컴포넌트가 존재해야 합니다.', () => {
  const container = document.createElement('div');

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('TodoForm 컴포넌트가 존재하는지 체크합니다.', () => {
    render(<Todos />);
    const todoForm = document.querySelector('#todoForm');
    expect(todoForm.tagName).toBe('FORM');
  });

  it('Todo 컴포넌트가 존재하는지 체크합니다.', () => {
    render(<Todos />);
    const todo = document.querySelector('.wrapper-todo');
    expect(todo.tagName).toBe('DIV');
  });
});

describe('Todo를 입력하면 새로운 Todo가 생성되어야 합니다.', () => {
  afterEach(() => {
    cleanup();
  });

  test('Todo를 작성할 수 있는 input.todo-input 엘리먼트 체크합니다.', () => {
    const { queryAllByRole } = render(<Todos />);
    const textboxes = queryAllByRole('textbox');
    const input = textboxes.find((textbox) => textbox.tagName === 'INPUT' && textbox.classList.contains('todo-input'));
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('text');
    expect(input).toHaveClass('todo-input', { exact: true });
  });

  test('Todo를 작성 후 등록시키는 button.todo-button 엘리먼트 체크합니다.', () => {
    const { container } = render(<Todos />);
    const submitButton = container.querySelector('.todo-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Add todo');
  });

  test('input 엘리먼트 내에 onChange 이벤트 핸들러 존재 여부 체크합니다.', () => {
    const { container } = render(<Todos />);
    const { node, props } = resq$('input', container);

    expect(node).toHaveClass('todo-input');
    expect(props.onChange).toBeTruthy();
  });

  test('input 엘리먼트에 Todo를 입력하고, button.todo-button을 클릭하면 새로운 Todo가 추가됩니다.', async () => {
    const { container, findByText } = render(<Todos />);
    const form = container.querySelector('form.todo-form');
    const input = form.querySelector('input');

    fireEvent.change(input, { target: { value: 'codestates' } });
    fireEvent.submit(form);
    await findByText(/codestates/i);

    const todoWrapper = container.querySelector('div.wrapper-todo');

    expect(todoWrapper.children.length).toBe(1);
    expect(todoWrapper.outerHTML.includes('codestates')).toBe(true);
  });
});

describe('Todo를 삭제하면 해당 Todo가 완전히 제거되어야 합니다.', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  afterEach(() => {
    cleanup();
  });

  test('Todo를 삭제할 수 있는 아이콘이 존재해야 합니다.', async () => {
    const { container, findByText } = render(<Todos />);
    const form = container.querySelector('form.todo-form');
    const input = form.querySelector('input');

    fireEvent.change(input, { target: { value: 'codestates' } });
    fireEvent.submit(form);
    await findByText(/codestates/i);

    const todoWrapper = container.querySelector('div.wrapper-todo');
    const deleteIcon = container.querySelector('.wrapper-todo > .todo-row > .icons > .delete-icon');

    expect(todoWrapper.children.length).toBe(1);
    expect(deleteIcon).toBeDefined();
  });

  test('생성된 Todo가 정상적으로 삭제 되어야 합니다.', async () => {
    const { container, findByText } = render(<Todos />);
    const form = container.querySelector('form.todo-form');
    const input = form.querySelector('input');

    fireEvent.change(input, { target: { value: 'codestates' } });
    fireEvent.submit(form);
    await findByText(/codestates/i);

    const todoWrapper = container.querySelector('div.wrapper-todo');
    const deleteButton = container.querySelector('.delete-icon');
    fireEvent.click(deleteButton);

    expect(todoWrapper.children.length).toBe(0);
  });

  test('삭제된 Todo가 남아있지 않아야 합니다.', async () => {
    const { container, findByText } = render(<Todos />);
    const form = container.querySelector('form.todo-form');
    const input = form.querySelector('input');

    fireEvent.change(input, { target: { value: 'codestates' } });
    fireEvent.submit(form);
    await findByText(/codestates/i);

    const todoWrapper = container.querySelector('div.wrapper-todo');
    const deleteButton = container.querySelector('.delete-icon');
    fireEvent.click(deleteButton);

    expect(todoWrapper.classList.contains('delete-icon')).toBe(false);
  });
});

describe('생성된 Todo를 누르면 line-through가 되며 체크되어야 합니다.', () => {
  afterEach(() => {
    cleanup();
  });

  test('생성된 Todo를 클릭을 하면 line-through 가 되어야 합니다. (todo.css에서 .complete 속성 내역 참고)', async () => {
    const { container, findByText } = render(<Todos />);
    const form = container.querySelector('form.todo-form');
    const input = form.querySelector('input');

    fireEvent.change(input, { target: { value: 'codestates' } });
    fireEvent.submit(form);
    await findByText(/codestates/i);

    const todoRow = container.querySelector('.wrapper-todo > div');
    const todoRowText = container.querySelector('.wrapper-todo > div > div');

    fireEvent.click(todoRowText);

    expect(todoRow.classList.contains('complete')).toBe(true);
  });

  test('todo의 text 외의 부분을 클릭하면 line-through가 되지 않아야 합니다.', async () => {
    const { container, findByText } = render(<Todos />);
    const form = container.querySelector('form.todo-form');
    const input = form.querySelector('input');

    fireEvent.change(input, { target: { value: 'codestates' } });
    fireEvent.submit(form);
    await findByText(/codestates/i);

    const todoRow = container.querySelector('.wrapper-todo > div');

    fireEvent.click(todoRow);

    expect(todoRow.classList.contains('complete')).toBe(false);
  });
});
