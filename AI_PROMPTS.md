# AI Prompts Used

## Prompt 1: Creating the Task Management App

I used Cursor AI as a development assistant and provided this prompt:

"Create a responsive React Task Management App using JavaScript.

Requirements:

* Use React functional components and hooks.
* Create a single-page application.
* Add a heading 'Task Management App'.
* Create a form with Task Title, Due Date, and Priority (High, Medium, Low).
* Validate that Task Title and Due Date are required.
* Add an 'Add Task' button.
* Display all tasks below the form.
* Each task should have Complete and Delete buttons.
* Completed tasks should appear with a line-through style.
* Make the UI responsive.
* After generating the code, review your own solution and suggest improvements."

## AI Workflow

I used a fresh AI chat session for this project. The AI first explored the project structure, implemented the React application, and then reviewed the generated solution by suggesting possible improvements such as adding localStorage persistence, component splitting, filtering, and testing.

## Manual Testing

After AI generated the application, I manually tested the main features:
- Adding a new task
- Completing and undoing tasks
- Deleting tasks
- Checking responsive layout behavior