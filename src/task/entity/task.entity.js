class TaskEntity {
  id;
  subject;
  description;
  due_date;
  priority;
  status;

  toJSON() {
    return {
      id: this.id,
      subject: this.subject,
      description: this.description,
      due_date: this.due_date,
      priority: this.priority,
      status: this.status,
    };
  }

  fromJSON({ id, subject, description, due_date, priority, status }) {
    this.id = id;
    this.subject = subject;
    this.description = description;
    this.due_date = due_date;
    this.priority = priority;
    this.status = status;
  }
}

module.exports = TaskEntity;
