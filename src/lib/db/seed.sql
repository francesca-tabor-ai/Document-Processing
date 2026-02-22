-- OptiFlowAI seed data (idempotent: safe to run multiple times)
-- Uses fixed UUIDs for predictable references.

-- Users
INSERT INTO users (id, email, name, role)
VALUES
  ('a0000001-0000-4000-8000-000000000001', 'admin@optiflow.demo', 'Alex Admin', 'Admin'),
  ('a0000001-0000-4000-8000-000000000002', 'reviewer@optiflow.demo', 'Robin Reviewer', 'Reviewer'),
  ('a0000001-0000-4000-8000-000000000003', 'analyst@optiflow.demo', 'Sam Analyst', 'Analyst'),
  ('a0000001-0000-4000-8000-000000000004', 'viewer@optiflow.demo', 'Val Viewer', 'Viewer')
ON CONFLICT (id) DO NOTHING;

-- Teams
INSERT INTO teams (id, name)
VALUES
  ('b0000001-0000-4000-8000-000000000001', 'Legal & Compliance'),
  ('b0000001-0000-4000-8000-000000000002', 'Finance')
ON CONFLICT (id) DO NOTHING;

-- Permissions (user_id, team_id, scope)
INSERT INTO permissions (user_id, team_id, scope)
VALUES
  ('a0000001-0000-4000-8000-000000000001', 'b0000001-0000-4000-8000-000000000001', 'documents:read'),
  ('a0000001-0000-4000-8000-000000000001', 'b0000001-0000-4000-8000-000000000001', 'documents:write'),
  ('a0000001-0000-4000-8000-000000000001', 'b0000001-0000-4000-8000-000000000002', 'documents:read'),
  ('a0000001-0000-4000-8000-000000000002', 'b0000001-0000-4000-8000-000000000001', 'documents:read'),
  ('a0000001-0000-4000-8000-000000000002', 'b0000001-0000-4000-8000-000000000001', 'documents:review'),
  ('a0000001-0000-4000-8000-000000000003', 'b0000001-0000-4000-8000-000000000001', 'documents:read'),
  ('a0000001-0000-4000-8000-000000000003', 'b0000001-0000-4000-8000-000000000002', 'documents:read'),
  ('a0000001-0000-4000-8000-000000000004', 'b0000001-0000-4000-8000-000000000001', 'documents:read')
ON CONFLICT (user_id, team_id, scope) DO NOTHING;

-- Sample document (owner: Alex Admin)
INSERT INTO documents (id, name, file_type, s3_key, size_bytes, owner_id, status)
VALUES
  ('c0000001-0000-4000-8000-000000000001', 'NDA_Template_2024.pdf', 'application/pdf', 'uploads/nda-template-2024.pdf', 245760, 'a0000001-0000-4000-8000-000000000001', 'processed'),
  ('c0000001-0000-4000-8000-000000000002', 'Q3_Financial_Summary.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'uploads/q3-financial-summary.xlsx', 89120, 'a0000001-0000-4000-8000-000000000001', 'uploaded')
ON CONFLICT (id) DO NOTHING;

-- Classifications for first document
INSERT INTO document_classifications (id, document_id, classification_type, confidence)
VALUES
  ('e1000001-0000-4000-8000-000000000001', 'c0000001-0000-4000-8000-000000000001', 'document_type', 0.98),
  ('e1000001-0000-4000-8000-000000000002', 'c0000001-0000-4000-8000-000000000001', 'sensitivity', 0.92)
ON CONFLICT (id) DO NOTHING;

-- Summaries for first document
INSERT INTO document_summaries (id, document_id, summary_type, content)
VALUES
  ('e2000001-0000-4000-8000-000000000001', 'c0000001-0000-4000-8000-000000000001', 'brief', 'Standard mutual NDA template covering confidentiality, term, and return of materials. No unusual clauses.'),
  ('e2000001-0000-4000-8000-000000000002', 'c0000001-0000-4000-8000-000000000001', 'key_terms', 'Term: 2 years. Governing law: Delaware. Liability cap: standard. No non-compete.')
ON CONFLICT (id) DO NOTHING;

-- Extracted data for first document
INSERT INTO extracted_data (id, document_id, field_name, field_value, confidence)
VALUES
  ('e3000001-0000-4000-8000-000000000001', 'c0000001-0000-4000-8000-000000000001', 'document_title', 'Mutual Non-Disclosure Agreement', 0.95),
  ('e3000001-0000-4000-8000-000000000002', 'c0000001-0000-4000-8000-000000000001', 'effective_date', '2024-01-15', 0.88),
  ('e3000001-0000-4000-8000-000000000003', 'c0000001-0000-4000-8000-000000000001', 'party_count', '2', 0.99)
ON CONFLICT (id) DO NOTHING;

-- Audit log entries
INSERT INTO audit_logs (id, user_id, action, resource_type, resource_id, payload)
VALUES
  ('e4000001-0000-4000-8000-000000000001', 'a0000001-0000-4000-8000-000000000001', 'document.uploaded', 'document', 'c0000001-0000-4000-8000-000000000001', '{"filename": "NDA_Template_2024.pdf", "size": 245760}'),
  ('e4000001-0000-4000-8000-000000000002', 'a0000001-0000-4000-8000-000000000001', 'document.processed', 'document', 'c0000001-0000-4000-8000-000000000001', '{"classification_count": 2, "summary_types": ["brief", "key_terms"]}'),
  ('e4000001-0000-4000-8000-000000000003', 'a0000001-0000-4000-8000-000000000002', 'document.reviewed', 'document', 'c0000001-0000-4000-8000-000000000001', '{"outcome": "approved", "comment": "Standard NDA, no changes needed."}')
ON CONFLICT (id) DO NOTHING;

-- Workflow definition
INSERT INTO workflows (id, name, definition)
VALUES
  (
    'd0000001-0000-4000-8000-000000000001',
    'Standard document review',
    '{"steps": [{"id": "classify", "type": "classification"}, {"id": "summarize", "type": "summarization"}, {"id": "extract", "type": "extraction"}, {"id": "review", "type": "human_review", "assignRole": "Reviewer"}]}'
  )
ON CONFLICT (id) DO NOTHING;

-- Workflow execution (completed for first document)
INSERT INTO workflow_executions (id, workflow_id, document_id, status, completed_at)
VALUES
  ('e5000001-0000-4000-8000-000000000001', 'd0000001-0000-4000-8000-000000000001', 'c0000001-0000-4000-8000-000000000001', 'completed', now() - interval '1 hour')
ON CONFLICT (id) DO NOTHING;
