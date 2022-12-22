class CreateTaskDto {
  subject;
  description;
  due_date;
  priority;

  constructor({ subject, description, due_date, priority }) {
    this.subject = subject;
    this.description = description;
    this.due_date = due_date;
    this.priority = priority;
  }
}

module.exports = CreateTaskDto;
