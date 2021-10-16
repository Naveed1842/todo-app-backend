import { CreateTodoDTO } from '../todo/dto/create-todo.dto';
import { Repository, EntityRepository } from 'typeorm';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  public async createTodo(createTodoDto: CreateTodoDTO): Promise<Todo> {
    const { name, description, status } = createTodoDto;
    const todo = new Todo();
    todo.name = name;
    todo.description = description;
    todo.status = status;
    await todo.save();
    return todo;
  }
}
