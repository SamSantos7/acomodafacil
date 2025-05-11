-- Tabela de usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  photo TEXT,
  provider TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de acomodações
CREATE TABLE accommodations (
  id SERIAL PRIMARY KEY,
  name TEXT,
  city TEXT,
  country TEXT,
  description TEXT,
  price DECIMAL,
  images TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de reservas
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  accommodation_id INTEGER REFERENCES accommodations(id),
  start_date DATE,
  end_date DATE,
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de uploads
CREATE TABLE uploads (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  file_url TEXT,
  file_type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
); 