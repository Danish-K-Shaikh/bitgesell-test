const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

const itemsRouter = require('../src/routes/items');

const DATA_PATH = path.join(__dirname, 'mockdata.json');
let app;

beforeEach(() => {
  app = express();
  app.use(express.json());
  // Patch DATA_PATH for router
  itemsRouter.DATA_PATH = DATA_PATH;
  app.use('/api/items', itemsRouter);
});

describe('Items API', () => {
  const mockData = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Carrot' },
  ];

  beforeEach(() => {
    fs.promises.readFile.mockResolvedValue(JSON.stringify(mockData));
    fs.promises.writeFile.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/items returns all items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(3);
  });

  test('GET /api/items with limit', async () => {
    const res = await request(app).get('/api/items?limit=2');
    expect(res.body.length).toBe(2);
  });

  test('GET /api/items with search query', async () => {
    const res = await request(app).get('/api/items?q=ban');
    expect(res.body).toEqual([{ id: 2, name: 'Banana' }]);
  });

  test('GET /api/items/:id returns item', async () => {
    const res = await request(app).get('/api/items/1');
    expect(res.body).toEqual({ id: 1, name: 'Apple' });
  });

  test('GET /api/items/:id returns 404 for missing item', async () => {
    const res = await request(app).get('/api/items/999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Item not found' });
  });

  test('POST /api/items creates item', async () => {
    const newItem = { name: 'Date' };
    const res = await request(app).post('/api/items').send(newItem);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Date');
    expect(res.body.id).toBeDefined();
    expect(fs.promises.writeFile).toHaveBeenCalled();
  });
});
