use std::sync::{Arc, RwLock};
use suika::json::JsonValue;

#[derive(Debug, Clone)]
pub struct Todo {
    pub id: usize,
    pub title: String,
    pub slug: String,
    pub content: String,
}

impl From<Todo> for JsonValue {
    fn from(todo: Todo) -> Self {
        JsonValue::Object(vec![
            ("id".to_string(), JsonValue::Number(todo.id as f64)),
            ("title".to_string(), JsonValue::String(todo.title)),
            ("slug".to_string(), JsonValue::String(todo.slug)),
            ("content".to_string(), JsonValue::String(todo.content)),
        ])
    }
}

pub struct TodoStore {
    todos: Arc<RwLock<Vec<Todo>>>,
    next_id: Arc<RwLock<usize>>,
}

impl TodoStore {
    pub fn new() -> Self {
        Self {
            todos: Arc::new(RwLock::new(Vec::new())),
            next_id: Arc::new(RwLock::new(1)),
        }
    }

    pub fn add_todo<T: Into<String>, U: Into<String>>(&self, title: T, content: U) -> Todo {
        let mut todos = self.todos.write().unwrap();
        let mut next_id = self.next_id.write().unwrap();

        let title: String = title.into();
        let todo = Todo {
            id: *next_id,
            title: title.clone(),
            slug: Self::generate_slug(&title),
            content: content.into(),
        };

        todos.push(todo.clone());
        *next_id += 1;

        todo
    }

    pub fn remove_todo(&self, id: usize) -> bool {
        let mut todos = self.todos.write().unwrap();
        if let Some(pos) = todos.iter().position(|todo| todo.id == id) {
            todos.remove(pos);
            true
        } else {
            false
        }
    }

    pub fn to_json(&self) -> JsonValue {
        let todos = self.todos.read().unwrap();
        JsonValue::Array(
            todos
                .iter()
                .map(|todo| JsonValue::from(todo.clone()))
                .collect(),
        )
    }

    fn generate_slug(title: &str) -> String {
        title.to_lowercase().replace(" ", "-")
    }
}
