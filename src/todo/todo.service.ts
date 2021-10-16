import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../todo-list/todo.entity';
import { TodoRepository } from '../todo-list/todo.repository';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  public async createTodo(createProductDto: CreateTodoDTO): Promise<Todo> {
    return await this.todoRepository.createTodo(createProductDto);
  }

  public async getTodo(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }
}
