use suika::{
    server::{
        middleware::{
            combine_middlewares, favicon_middleware, logger_middleware, static_file_middleware,
        },
        router::Router,
        Server,
    },
    templates::{TemplateEngine, TemplateValue},
};

use std::{collections::HashMap, sync::Arc};

pub struct BlogPost {
    pub title: String,
    pub content: String,
}

fn get_blog_posts() -> Vec<BlogPost> {
    vec![
        BlogPost {
            title: "First Post".to_string(),
            content: "This is the content of the first post.".to_string(),
        },
        BlogPost {
            title: "Second Post".to_string(),
            content: "This is the content of the second post.".to_string(),
        },
    ]
}

fn main() {
    let server = Server::new();
    let mut router = Router::new();

    let template_engine = Arc::new({
        let mut engine = TemplateEngine::new();

        engine
            .load_templates_from_directory("templates")
            .expect("Failed to load templates from directory");

        engine
    });

    router.get("/", move |_req, res, _next| {
        let template_engine = Arc::clone(&template_engine);
        async move {
            let blog_posts = get_blog_posts();
            let mut context = HashMap::new();

            context.insert(
                "posts".to_string(),
                TemplateValue::Array(
                    blog_posts
                        .iter()
                        .map(|post| {
                            let mut post_map = HashMap::new();
                            post_map.insert(
                                "title".to_string(),
                                TemplateValue::String(post.title.clone()),
                            );
                            post_map.insert(
                                "content".to_string(),
                                TemplateValue::String(post.content.clone()),
                            );
                            TemplateValue::Object(post_map)
                        })
                        .collect(),
                ),
            );

            match template_engine.render("home.html", &context) {
                Ok(rendered) => res.body(rendered),
                Err(e) => {
                    res.set_status(500);
                    res.body(format!("Template rendering error: {}", e));
                }
            }
            Ok(())
        }
    });

    let router = Arc::new(router);

    let combined_middleware = combine_middlewares(vec![
        Arc::new(favicon_middleware("public/favicon.ico")),
        Arc::new(static_file_middleware("/public", "public", 3600)),
        Arc::new(logger_middleware),
        Arc::new(move |req, res, next| {
            let router = Arc::clone(&router);
            Box::pin(async move { router.handle(req, res, next).await })
        }),
    ]);

    server.use_middleware(move |req, res, next| combined_middleware(req, res, next));
    server.listen("127.0.0.1:7878");
}
