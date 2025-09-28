import React, { type FormEvent } from "react";
import { useState } from "react";
import type { TTodo } from "../types/todo";

const Todo = () => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [input, setInput] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // console.log("동작함");
        const text = input.trim(); // 입력한 텍스트 앞에 공백이 있을경우 잘라내서 text에 저장

        if (text) {
            // 입력값이 null이 아니라면 새로운 객체를 만든다
            const newTodo: TTodo = {
                id: Date.now(),
                text: text,
            };
            // 이전 todos를 콜백함수가 매개변수로 받는다
            // 그리고 [이전 todos의 인자들 모두 가져온것, 새로 추가된 todo] <- 새로운 배열을 반환한다
            // 근데 그럼 배열이니까 기존 배열에 append를 하면 안되나?
            // 배열에 **append**를 사용하면 안 된다.
            // 불변성(Immutability) 규칙
            // React에서는 상태(state)를 직접 수정하면 안 된다는 중요한 규칙이 있다. append 같은 메서드는 기존 배열 자체를 수정한다. React는 상태 변화를 감지할 때 이전 상태와 현재 상태를 비교해서 다른 점이 있을 때만 UI를 다시 렌더링하는데, append를 쓰면 배열의 주소 값은 그대로라서 React가 변화를 알아채지 못한다.
            // 그래서 ...prevTodos처럼 기존 배열의 내용을 복사해서 새로운 배열을 만든 다음 그곳에 newTodo를 추가하는 방식을 쓰는 거다. 이렇게 해야 React가 새로운 배열의 주소를 인식하고 변경된 내용을 바탕으로 화면을 업데이트한다.
            setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
            setInput("");
        }
    };

    // 할일 섹션에서 각 리스트 요소에 "완료" 버튼이 눌렸을때, 그걸 완료섹션으로 넘겨줘야 함.
    const handleCompleteTodos = (todo: TTodo) => {
        // 매개변수로 갖고 온 todo제외하고 나머지 배열을 담은 새로운 배열 생성해야함.
        // 즉 "todo"를  리스트에서 빼기 작업
        setTodos((prevs) => prevs.filter((prev) => prev.id !== todo.id));
        // 여기서 "todo"를 "완료" 리스트에 추가하는 작업
        setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
    };

    const deleteTodos = (todo: TTodo) => {
        // doneTodos 배열에서 선택한 요소를 삭제 해야함.
        setDoneTodos((prevDoneTodos) =>
            // 삭제할 요소와 id가 다른 것들만 살려서 새로운 배열 생성
            prevDoneTodos.filter((prevDoneTodo) => prevDoneTodo.id !== todo.id)
        );
    };

    return (
        <div className="todo-container">
            <h1 className="todo_container__header">Judy Todo</h1>
            <form className="todo-container__form" onSubmit={handleSubmit}>
                <input
                    value={input}
                    onChange={(e): void => setInput(e.target.value)}
                    type="text"
                    className="todo-container__intput"
                    placeholder="할일 입력"
                    required
                />
                <button type="submit" className="todo-container__button">
                    할 일 추가
                </button>
            </form>

            <div className="render-container">
                <div className="render-container__section">
                    <h2 className="render-container__title">할일</h2>
                    <ul id="todo-list" className="render-container__list">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="render-container__item"
                            >
                                <span className="render-container__item-text">
                                    {todo.text}
                                </span>
                                <button
                                    onClick={() => {
                                        handleCompleteTodos(todo);
                                    }}
                                    style={{
                                        backgroundColor: "#28a745",
                                    }}
                                    className="render-container__item-button"
                                >
                                    완료
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* ----------------------------------------------------------------------- */}
                <div className="render-container__section">
                    <h2 className="render-container__title">완료</h2>
                    <ul id="todo-list" className="render-container__list">
                        {doneTodos.map((todo) => (
                            <li
                                key={todo.id}
                                className="render-container__item"
                            >
                                <span className="render-container__item-text">
                                    {todo.text}
                                </span>
                                <button
                                    onClick={() => {
                                        deleteTodos(todo);
                                    }}
                                    style={{
                                        backgroundColor: "#dc3545",
                                    }}
                                    className="render-container__item-button"
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Todo;
