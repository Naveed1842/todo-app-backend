import { Test, TestingModule } from '@nestjs/testing';
import { TodoRepository } from '../todo-list/todo.repository';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let todoService;
  let todoRepository;
  const mockTodoRepository = () => ({
    createTodo: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: TodoRepository,
          useFactory: mockTodoRepository,
        },
      ],
    }).compile();
    todoService = await module.get<TodoService>(TodoService);
    todoRepository = await module.get<TodoRepository>(TodoRepository);
  });

  describe('createTodo', () => {
    it('should save a todo in the database', async () => {
      todoRepository.createTodo.mockResolvedValue('someTodo');
      expect(todoRepository.createTodo).not.toHaveBeenCalled();
      const createTodoDto = {
        name: 'first todo',
        description: 'first todo description',
        status: 'complete',
      };
      const result = await todoService.createTodo(createTodoDto);
      expect(todoRepository.createTodo).toHaveBeenCalledWith(createTodoDto);
      expect(result).toEqual('someTodo');
    });
  });

  describe('getTodo', () => {
    it('should get all todo', async () => {
      todoRepository.find.mockResolvedValue('todo');
      expect(todoRepository.find).not.toHaveBeenCalled();
      const result = await todoService.getTodo();
      expect(todoRepository.find).toHaveBeenCalled();
      expect(result).toEqual('todo');
    });
  });
});