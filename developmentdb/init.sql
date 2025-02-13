-- Enable extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table with new mandatory column "company"
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT NOT NULL DEFAULT 'demo'
);

-- Tasks table with new mandatory column "company"
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    assigned UUID[] DEFAULT ARRAY[]::UUID[],
    description TEXT,
    importance INTEGER CHECK (importance >= 0 AND importance <= 2),
    company TEXT NOT NULL DEFAULT 'demo'
);

-- Columns table with new mandatory column "company"
CREATE TABLE IF NOT EXISTS columns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_ids UUID[] DEFAULT ARRAY[]::UUID[],
    name TEXT NOT NULL,
    company TEXT NOT NULL DEFAULT 'demo'
);

-- Clear existing data from tables
TRUNCATE TABLE users, tasks, columns RESTART IDENTITY CASCADE;

-- Seed data with predefined UUIDs

-- Users
INSERT INTO users (id, name, company) VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User1', 'demo'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User2', 'demo'), 
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User3', 'demo'), 
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User4', 'demo'),
('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User5', 'demo'),
('f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'User6', 'demo'),
('95e53e16-da0b-45b0-ad8b-d1afc91c473c'::UUID, 'User7', 'demo'),
('9b7b88d3-bc6b-481a-936a-0e56575063db'::UUID, 'User8', 'demo');

-- Tasks with user assignments
INSERT INTO tasks (id, name, assigned, description, importance, company) VALUES 
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task1', ARRAY['a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description1', 1, 'demo'), 
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task2', ARRAY['b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description2', 2, 'demo'),
('010ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task3', ARRAY['d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description3', 0, 'demo'),
('021ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task4', ARRAY['e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Description4', 2, 'demo'),
('031ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Task5', ARRAY['f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '95e53e16-da0b-45b0-ad8b-d1afc91c473c']::UUID[], 'Description5', 1, 'demo');

-- Columns with task assignments
INSERT INTO columns (id, task_ids, name, company) VALUES 
('020ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, ARRAY['e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Column1', 'demo'), 
('030ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, ARRAY['010ebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Column2', 'demo'),
('040ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, ARRAY['021ebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Column3', 'demo'),
('050ebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, ARRAY['031ebc99-9c0b-4ef8-bb6d-6bb9bd380a11']::UUID[], 'Column4', 'demo');
