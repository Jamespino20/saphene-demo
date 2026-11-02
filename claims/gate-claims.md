- The sync service exposes a health check endpoint.
  category: srs | srsClause: 3.1 | requirementType: operational | priority: mandatory
  evidence: healthCheck

- User sessions use JWT tokens scoped by tenant_id.
  category: srs | srsClause: 9.1 | requirementType: security | priority: mandatory
  evidence: jwt, tenant_id

- The offline sync queue retries failed pushes automatically.
  category: srs | srsClause: 6.1 | requirementType: functional | priority: mandatory
  evidence: retrySyncQueue
