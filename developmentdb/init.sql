-- Enable extension for UUID generation
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

-- Clear existing data from tables
TRUNCATE TABLE users, tasks, columns RESTART IDENTITY CASCADE;

-- Seed data with predefined UUIDs
-- Users
INSERT INTO users (id, name) VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User1'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User2'), 
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User3'), 
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User4'),
('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User5'),
('f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User6'),
('95e53e16-da0b-45b0-ad8b-d1afc91c473c'::UUID, 'User7'),
('9b7b88d3-bc6b-481a-936a-0e56575063db'::UUID, 'User8');

-- Tasks with user assignments
INSERT INTO tasks (id, name, assigned, description, importance) VALUES 
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task1', ARRAY['a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description1', 1), 
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task2', ARRAY['b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description2', 2),
('010ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task3', ARRAY['d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description3', 0),
('021ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task4', ARRAY['e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description4', 2),
('031ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task5', ARRAY['f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '95e53e16-da0b-45b0-ad8b-d1afc91c473c']::UUID[], 'Description5', 1),
('041ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task6', ARRAY['a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description6', 1),
('051ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task7', ARRAY['b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description7', 2),
('061ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task8', ARRAY['c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description8', 0),
('071ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task9', ARRAY['d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description9', 1),
('081ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task10', ARRAY['e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description10', 2);

-- Columns with task assignments
INSERT INTO columns (id, task_ids, name) VALUES 
('020ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, ARRAY['e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '041ebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Column1'), 
('030ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, ARRAY['010ebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '051ebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '061ebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Column2'),
('040ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, ARRAY['021ebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '071ebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Column3'),
('050ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, ARRAY['031ebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '081ebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Column4');
