# Simple Blog Example

This example demonstrates a simple Rust web application using the Suika web
stack. The application sets up a basic server that serves a homepage displaying
a list of blog posts. It leverages the Suika template engine and various
middlewares to handle requests and render HTML templates.

**Note:** Suika is under active development and not intended for production use.
The API is subject to change and may lack comprehensive testing and
documentation.

I will update this with more content as the framework grows

## Description

The main features of this example include:

1. **BlogPost Struct**: A simple struct representing a blog post with a title
   and content.
2. **get_blog_posts Function**: A function that returns a list of blog posts.
   This is a placeholder for fetching posts from a database or another data
   source.
3. **Template Engine**: The `TemplateEngine` is initialized and configured to
   load templates from the `templates` directory.
4. **Router Configuration**: The router is configured with a single route `/`
   that renders the homepage using the `home.html` template.
5. **Middleware**: The application uses several middlewares:
   - **Favicon Middleware**: Serves the favicon from the `public` directory.
   - **Static File Middleware**: Serves static files from the `public`
     directory.
   - **Logger Middleware**: Logs requests and responses.
6. **Server Initialization**: The server is configured to listen on
   `127.0.0.1:7878`.

![Screenshot 2025-01-01 at 22.55.29](public/Screenshot%202025-01-01%20at%2022.55.29.png)
