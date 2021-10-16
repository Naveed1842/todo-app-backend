import { Body, Controller, Get, Post } from '@nestjs/common';
import { Todo } from '../todo-list/todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post('create')
  public async createTodo(@Body() createTodoDto: CreateTodoDTO): Promise<Todo> {
    const todo = await this.todoService.createTodo(createTodoDto);
    return todo;
  }

  @Get('all')
  public async getTodo(): Promise<Todo[]> {
    const todoLists = await this.todoService.getTodo();
    return todoLists;
  }
}
