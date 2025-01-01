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

/// Represents a blog post with a title and content.
pub struct BlogPost {
    pub title: String,
    pub content: String,
}

/// Returns a list of blog posts.
/// This is a placeholder for fetching posts from a database or another data source.
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
    // Create a new server instance.
    let server = Server::new();
    let mut router = Router::new();

    // Initialize the template engine and load templates from the "templates" directory.
    let template_engine = Arc::new({
        let mut engine = TemplateEngine::new();

        engine
            .load_templates_from_directory("templates")
            .expect("Failed to load templates from directory");

        engine
    });

    // Define the route for the home page.
    router.get("/", move |_req, res, _next| {
        let template_engine = Arc::clone(&template_engine);
        async move {
            // Get the list of blog posts.
            let blog_posts = get_blog_posts();
            let mut context = HashMap::new();

            // Prepare the context for the template.
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

            // Render the "home.html" template with the context.
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

    // Wrap the router in an Arc for shared ownership.
    let router = Arc::new(router);

    // Combine multiple middlewares into a single middleware.
    let combined_middleware = combine_middlewares(vec![
        Arc::new(favicon_middleware("public/favicon.ico")),
        Arc::new(static_file_middleware("/public", "public", 3600)),
        Arc::new(logger_middleware),
        Arc::new(move |req, res, next| {
            let router = Arc::clone(&router);
            Box::pin(async move { router.handle(req, res, next).await })
        }),
    ]);

    // Use the combined middleware in the server.
    server.use_middleware(move |req, res, next| combined_middleware(req, res, next));

    // Start the server and listen on the specified address.
    server.listen("127.0.0.1:7878");
}
