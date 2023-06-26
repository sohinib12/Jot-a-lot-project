# Jot-a-lot

Jot-a-lot is a note-taking app, inspired by Evernote


## Features
- Notes
- Notebooks
- Scratchpad
- Integration with ChatGPT

## Technologies Used
- Flask: Backend framework for building web applications.
- React: Frontend library for building user interfaces.
- Redux: State management library for React.
- SQLAlchemy: Object-relational mapper for working with databases.


## 🏠 Homepage
- https://jot-a-lot.onrender.com

## Demo
- add Gif here when complete

## Local Installation
1. Clone the repository

HTTPS:
```bash
git clone https://github.com/sohinib12/Jot-a-lot-project.git
```
SSH:
```bash
git clone git@github.com:sohinib12/Jot-a-lot-project.git
```

2. Install the dependencies
```bash
pipenv install -r requirements.txt
```

3. Create a .env file based on the example with proper settings for your development environment
```bash
SECRET_KEY= <your secret key>
DATABASE_URL=sqlite:///dev.db
SCHEMA=flask_schema
```

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

```bash
pipenv shell
```

```bash
flask db upgrade
```

```bash
flask seed all
```

```bash
flask run
```

5. Change into the react-app directory

```bash
cd react-app
```

6. Install the dependencies
```bash
npm install
```

7. Start the application
```bash
npm start
```

5. Navigate to the application in your browser


## 📝 Documentation

- [Database Schema](https://github.com/sohinib12/Jot-a-lot-project/wiki/DB-SCHEMA)


## ✏️ Authors
- 👤 [sohinib12](https://github.com/sohinib12)

