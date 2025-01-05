mod todos;
use crate::todos::TodoStore;

use std::{collections::HashMap, sync::Arc};

use suika::{
    middleware::{
        CorsMiddleware, FaviconMiddleware, LoggerMiddleware, StaticFileMiddleware,
        WasmFileMiddleware,
    },
    server::{HttpError, Router, Server},
    templates::{TemplateEngine, TemplateValue},
};

fn main() {
    let mut server = Server::new("127.0.0.1:8080");
    let mut router = Router::new("/");
    let todo_store = TodoStore::new();

    let template_engine = {
        let mut engine = TemplateEngine::new();

        engine
            .load_templates_from_directory("templates")
            .expect("Failed to load templates from directory");

        engine
    };

    todo_store.add_todo(
        "First Todo".to_string(),
        "This is the content of the first todo.".to_string(),
    );

    todo_store.add_todo(
        "Second Todo".to_string(),
        "This is the content of the second todo.".to_string(),
    );

    router.get(r"/$", move |req, res| {
        Box::pin(async move {
            let todos = req
                .module::<TodoStore>("todo_store")
                .ok_or_else(|| {
                    let msg = "Error retrieving todo store".to_string();
                    eprintln!("{}", msg);
                    HttpError::InternalServerError(msg)
                })
                .map(|store| store.get_todos())?;

            let mut context = HashMap::new();

            context.insert(
                "page_title".to_string(),
                TemplateValue::String("Todos".to_string()),
            );

            context.insert(
                "todos".to_string(),
                TemplateValue::Array(
                    todos
                        .iter()
                        .map(|todo| {
                            let mut todo_map = HashMap::new();
                            todo_map.insert(
                                "id".to_string(),
                                TemplateValue::String(todo.id.to_string()),
                            );
                            todo_map.insert(
                                "title".to_string(),
                                TemplateValue::String(todo.title.clone()),
                            );
                            todo_map.insert(
                                "slug".to_string(),
                                TemplateValue::String(todo.slug.clone()),
                            );
                            todo_map.insert(
                                "content".to_string(),
                                TemplateValue::String(todo.content.clone()),
                            );
                            TemplateValue::Object(todo_map)
                        })
                        .collect(),
                ),
            );

            res.set_status(200).await;
            res.render_template("index.html", &context).await?;

            Ok(())
        })
    });

    router.post("/add", move |req, res| {
        Box::pin(async move {
            if let Some(form_data) = req.form_data() {
                let title = form_data.get("title").unwrap_or(&String::new()).to_string();
                let content = form_data
                    .get("content")
                    .unwrap_or(&String::new())
                    .to_string();

                if !title.is_empty() && !content.is_empty() {
                    if let Some(todo_store) = req.module::<TodoStore>("todo_store") {
                        let todo = todo_store.add_todo(title, content);

                        let response_message = format!(
                            "Todo added successfully: id={}, title={}, slug={}, content={}\n",
                            todo.id, todo.title, todo.slug, todo.content
                        );
                        res.set_status(200).await;
                        res.body(response_message).await;
                    } else {
                        res.set_status(500).await;
                        res.body("Internal server error: Todo store not found!\n".to_string())
                            .await;
                    }
                } else {
                    res.set_status(400).await;
                    res.body("Title and content cannot be empty!\n".to_string())
                        .await;
                }
            } else {
                res.set_status(400).await;
                res.body("Invalid form data received!\n".to_string()).await;
            }
            Ok(())
        })
    });

    router.delete("/remove", move |req, res| {
        Box::pin(async move {
            if let Some(form_data) = req.form_data() {
                let id_str = form_data.get("id").unwrap_or(&String::new()).to_string();
                if let Ok(id) = id_str.parse::<usize>() {
                    if let Some(todo_store) = req.module::<TodoStore>("todo_store") {
                        if todo_store.remove_todo(id) {
                            res.set_status(200).await;
                            res.body("Todo removed successfully".to_string()).await;
                        } else {
                            res.set_status(404).await;
                            res.body("Todo not found!\n".to_string()).await;
                        }
                    } else {
                        res.set_status(500).await;
                        res.body("Internal server error: Todo store not found!\n".to_string())
                            .await;
                    }
                } else {
                    res.set_status(400).await;
                    res.body("Invalid ID received!\n".to_string()).await;
                }
            } else {
                res.set_status(400).await;
                res.body("Invalid form data received!\n".to_string()).await;
            }
            Ok(())
        })
    });

    server.use_middleware(Arc::new(CorsMiddleware));
    server.use_middleware(Arc::new(LoggerMiddleware));
    server.use_middleware(Arc::new(WasmFileMiddleware::new("/wasm", 86400)));

    server.use_middleware(Arc::new(FaviconMiddleware::new("public/favicon.ico")));

    server.use_middleware(Arc::new(StaticFileMiddleware::new(
        "/public", "public", 3600,
    )));

    server.use_middleware(Arc::new(router));
    server.use_templates(template_engine);
    server.use_module("todo_store", todo_store);
    server.run(None);
}
