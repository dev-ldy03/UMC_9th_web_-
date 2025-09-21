// 1. HTML 요소를 dome요소를 통해서 갖고 와야 한다.  (핸드북 javaScript편 참고)
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 2. 할 일이 어떻게 생긴 것인지 type을 정의
type Todo = {
    id : number;
    text : string;
}

let todos: Todo[]= []; // 할 일 저장된 배열
let doneTasks : Todo[] = []; // 완료한 일 저장된 배열

// - 할 일 목록 렌더링 하는 함수를 정의
const renderTasks = ():void =>{
    // 기존의 todo, done 리스트 내용을 모두 비움
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    
    // 아직 완료하지 않은 할 일들을 순회
    // forEach(callback)는 배열안에 요소들을 한씩 꺼내서 콜백함수에 전달해주는 메서드
    todos.forEach((todo):void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    /*
    <ul id="todo-list">
        <li>공부하기</li>
    </ul>
    이렇게 html에 들어가게 되는 것.
    */

    doneTasks.forEach((todo):void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });


};

// 3. 할 일 텍스트 입력 처리 함수(공백 잘라주기 등 예외 처리)
const getTodoText = ():string =>{
    return todoInput.value.trim();
};

// 4. 할 일 추가 처리 함수
const addTodo = (text:string): void =>{
    todos.push({id: Date.now(), text :text});
    todoInput.value = '';
    renderTasks();
};
// 5. 할 일 상태 변경 (완료로 이동)
const completeTodo = (todo : Todo):void =>{
    todos = todos.filter((t):Boolean => t.id !== todo.id); 
    // filter(true)가 되면 그 요소 빼고 나머지 렌더링 시켜준다
    doneTasks.push(todo);
    renderTasks();
};

// 6. 완료된 항목에서 할 일 삭제 함수
const deleteTodo = (todo: Todo):void=>{
    doneTasks = doneTasks.filter((t):boolean => t.id !== todo.id)
    renderTasks();
};
// 7. 할 일 아이템 생성 함수(완료 여부에 따라 버튼 텍스트나 색상 설정)
// <ul id = "todo-list" class="render-container_list">
//                 <li class="render-container_item-text">
//                     <p class="render-container_item-text">123</p>
//                      <button class="render-container_item-button">삭제</button>
//                 </li>
//             </ul>

const createTodoElement = (todo : Todo, isDone : boolean):HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container_item');
    li.textContent = todo.text;
    
    const button = document.createElement('button');
    button.classList.add('render-container_item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
    }else {
        button.textContent= '완료';
        button.style.backgroundColor = '#28a745';
    }

    button.addEventListener('click', ():void =>{
        if(isDone){
            deleteTodo(todo);

        }else{ 
            completeTodo(todo);
        }
    });

   
    li.appendChild(button);
    return li;
};







// 8. 폼 제출 이벤트 리스너 : 할 일 추가 버튼 누르면 텍스트 받는 함수를 통해서, 텍스트를 넣어주는 함수 적용
todoForm.addEventListener('submit', (event:Event):void =>{
    event.preventDefault();
    const text = getTodoText(); // 공백이 제거된 텍스트를 갖고온다.
    if(text){ // 만약 갖고온것에 텍스트가 존재한다면 투두 리스트에 추가하기.
        addTodo(text);
    }
});

renderTasks();
