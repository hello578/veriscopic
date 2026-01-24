

//lib/legal/drift-scope.t

export const DRIFT_SCOPE_V1 = {
  legal_documents: {
    fields: ['content_hash', 'version', 'jurisdiction'],
    severity: 'material',
  },

  ai_systems: {
    fields: [
      'purpose',
      'data_categories',
      'lifecycle_status',
      'system_owner',
    ],
    severity: 'material',
  },

  governance: {
    fields: [
      'ownership_model',
      'admin_count',
    ],
    severity: 'material',
  },

  acceptance_state: {
    fields: ['content_hash'],
    severity: 'material',
  },
} as const
