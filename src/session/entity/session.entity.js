class Session {
  id;
  user_id;
  status;
  last_active_at;
  expire_at;
  abandon_at;
  created_at;
  updated_at;

  toJSON() {
    return {
      id: this.id,
      user_id: this.user_id,
      status: this.status,
      last_active_at: this.last_active_at,
      expire_at: this.expire_at,
      abandon_at: this.abandon_at,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  fromJSON({
    id,
    user_id,
    status,
    last_active_at,
    expire_at,
    abandon_at,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.status = status;
    this.last_active_at = last_active_at;
    this.expire_at = expire_at;
    this.abandon_at = abandon_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
