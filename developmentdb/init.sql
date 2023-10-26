CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    assigned UUID[] DEFAULT ARRAY[]::UUID[],
    description TEXT,
    importance INTEGER CHECK (importance >= 0 AND importance <= 2)
);

-- Columns table
CREATE TABLE IF NOT EXISTS columns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_ids UUID[] DEFAULT ARRAY[]::UUID[],
    name TEXT NOT NULL
);

-- Seed data with predefined UUIDs
-- Users
INSERT INTO users (id, name) VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User1'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User2'), 
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User3'), 
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User4');

-- Tasks with user assignments
INSERT INTO tasks (id, name, assigned, description, importance) VALUES 
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task1', ARRAY['a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description1', 1), 
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task2', ARRAY['b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description2', 2),
('010ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task3', ARRAY['d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description3', 0);

-- Columns with task assignments
INSERT INTO columns (id, task_ids, name) VALUES 
('020ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, ARRAY['e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Column1'), 
('030ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, ARRAY['010ebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Column2');
